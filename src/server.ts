import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import 'dotenv/config';

// Импортируем сервисы и контроллеры
import { container } from './container';
import { ControllerFactory } from './controllers';
import { IArtworkService } from './types/artwork';
import { IGalleryService } from './types/gallery';
import { IUserService } from './types/user';
import { ILogger } from './types/interfaces';
import { AiController } from './controllers/AiController';
import { IoTController } from './controllers/IoTController';

// Импортируем маршруты
import { createAuthRoutes } from './routes/authRoutes';
import { createArtworkRoutes } from './routes/artworkRoutes';
import { createGalleryRoutes } from './routes/galleryRoutes';
import { createUserRoutes } from './routes/userRoutes';
import { createAiRoutes } from './routes/aiRoutes';
import { createUserManagementRoutes } from './routes/userManagementRoutes';
import { createArtworkUploadRoutes } from './routes/artworkUploadRoutes';
import { createIotRoutes } from './routes/iotRoutes';

// Импортируем миддлвары безопасности
import { xssProtection, limiter, sanitizeInput, csrfProtection, generateCsrfToken } from './middleware/security';

// Импортируем типы для Socket.IO
import {
  TypedServer,
  TypedSocket,
  NavigationData,
  ArtworkInteractionData,
  UserPositionUpdate,
  GalleryChatMessage
} from './types/socket-events';

// Получаем сервисы из контейнера
const artworkService = container.get<IArtworkService>('artworkService');
const galleryService = container.get<IGalleryService>('galleryService');
const userService = container.get<IUserService>('userService');
const logger = container.get<ILogger>('logger');

// Создаем фабрику контроллеров
const controllerFactory = new ControllerFactory(
  artworkService,
  galleryService,
  userService,
  logger
);

// Создаем контроллеры
const artworkController = controllerFactory.createArtworkController();
const galleryController = controllerFactory.createGalleryController();
const userController = controllerFactory.createUserController();
const authController = controllerFactory.createAuthController();
// Create AI controller instance
const aiController = container.get<AiController>('aiController');

// Create IoT controller instance
const iotController = new IoTController(logger);

const app: Application = express();
const server = http.createServer(app);
const io: TypedServer = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 часа
}));
app.use(xssProtection); // Защита от XSS
app.use(limiter); // Ограничение количества запросов
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput); // Очистка входных данных
app.use(generateCsrfToken); // Генерация CSRF токена
app.use(csrfProtection); // Защита от CSRF

console.log('Middleware загружены');

// Инициализация сервисов
(async () => {
  try {
    await artworkService.initialize();
    await galleryService.initialize();
    await userService.initialize();
    console.log('Сервисы инициализированы');
  } catch (error) {
    console.error('Ошибка при инициализации сервисов:', error);
  }
})();

// Инициализация сервиса рекомендаций
(async () => {
  try {
    const aiController = container.get('aiController') as any;
    await aiController.initializeRecommendationService();
  } catch (error) {
    console.error('Ошибка при инициализации сервиса рекомендаций:', error);
  }
})();

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../../src/frontend/dist')));

console.log('Статические файлы настроены');

// Routes
app.use('/api/auth', createAuthRoutes(authController));
app.use('/api/artworks', createArtworkRoutes(artworkController));
app.use('/api/galleries', createGalleryRoutes(galleryController));
app.use('/api/users', createUserRoutes(userController));
app.use('/api/ai', createAiRoutes(aiController));
app.use('/api/admin/users', createUserManagementRoutes(userController));
app.use('/api/artworks/upload', createArtworkUploadRoutes(artworkController));
app.use('/api/iot', createIotRoutes(iotController));

// Health check endpoint (must be defined before catch-all route)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        message: 'Виртуальная галерея искусств API',
        timestamp: new Date().toISOString()
    });
});

// Serve React app for all other non-API routes (catch-all should be last)
app.get(/^(?!\/api).*$/, (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../src/frontend/dist/index.html'));
});

console.log('Маршруты загружены');

// Socket.IO connection handling
io.on('connection', (socket: TypedSocket) => {
    console.log('Пользователь подключен:', socket.id);

    // Пример установки данных сокета (в реальном приложении это будет происходить при аутентификации)
    socket.data = {
        userId: socket.id,
        username: `User_${socket.id.substring(0, 8)}`,
        role: 'visitor',
        lastSeen: new Date()
    };

    socket.on('disconnect', () => {
        console.log('Пользователь отключен:', socket.id);
    });

    // Handle gallery navigation events
    socket.on('navigate', (data: NavigationData) => {
        // Валидация данных навигации
        if (!data.userId || !data.position) {
            console.error('Некорректные данные навигации:', data);
            return;
        }

        // Отправляем обновленные данные всем остальным пользователям
        socket.broadcast.emit('userNavigate', data);
    });

    // Handle artwork interaction events
    socket.on('artworkInteraction', (data: ArtworkInteractionData) => {
        // Валидация данных взаимодействия
        if (!data.userId || !data.artworkId || !data.interactionType) {
            console.error('Некорректные данные взаимодействия с экспонатом:', data);
            return;
        }

        // Отправляем данные взаимодействия всем остальным пользователям
        socket.broadcast.emit('artworkInteractionBroadcast', data);
    });

    // Обработка обновления позиции пользователя
    socket.on('updatePosition', (data: UserPositionUpdate) => {
        if (!data.userId || !data.position || !data.roomId) {
            console.error('Некорректные данные обновления позиции:', data);
            return;
        }

        // Отправляем обновленную позицию всем пользователям в той же комнате
        socket.to(data.roomId).emit('userPositionUpdate', data);
    });

    // Обработка сообщений чата
    socket.on('sendChatMessage', (data: GalleryChatMessage) => {
        if (!data.userId || !data.message || !data.roomId) {
            console.error('Некорректные данные сообщения чата:', data);
            return;
        }

        // Добавляем отметку времени
        data.timestamp = new Date();

        // Отправляем сообщение всем пользователям в той же комнате
        socket.to(data.roomId).emit('newChatMessage', data);
    });

    // Обработка данных от IoT устройств
    socket.on('sendIoTData', (data: any) => {
        // В реальной системе здесь будет валидация и обработка данных от IoT устройств
        console.log('Получены данные от IoT устройства:', data);

        // Транслируем данные всем заинтересованным клиентам
        socket.broadcast.emit('iotFeedback', data);
    });
});

export { app, server };

// Запуск сервера только если файл запускается напрямую, а не импортируется
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
        console.log(`Виртуальная галерея доступна по адресу http://localhost:${PORT}`);
    });
}

