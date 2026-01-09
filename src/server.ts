import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

// Импортируем маршруты
import { authRoutes } from './routes/authRoutes';
import { artworkRoutes } from './routes/artworkRoutes';
import { galleryRoutes } from './routes/galleryRoutes';
import { userRoutes } from './routes/userRoutes';
import { aiRoutes } from './routes/aiRoutes';
import { userManagementRoutes } from './routes/userManagementRoutes';
import artworkUploadRoutes from './routes/artworkUploadRoutes';

const app: Application = express();
const server = http.createServer(app);
const io: Server = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

console.log('Middleware загружены');

// Serve static files
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

console.log('Статические файлы настроены');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin/users', userManagementRoutes);
app.use('/api/artworks', artworkUploadRoutes);

// Serve frontend
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve admin panel
app.get('/admin', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Serve curator panel
app.get('/curator', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/curator.html'));
});

// Serve staff panel
app.get('/staff', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/staff.html'));
});

// Serve tour guide panel
app.get('/tour-guide', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/tour-guide.html'));
});

// Serve auction participant panel
app.get('/auction-participant', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/auction-participant.html'));
});

console.log('Маршруты загружены');

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Пользователь подключен:', socket.id);

    socket.on('disconnect', () => {
        console.log('Пользователь отключен:', socket.id);
    });

    // Handle gallery navigation events
    socket.on('navigate', (data) => {
        socket.broadcast.emit('userNavigate', data);
    });

    // Handle artwork interaction events
    socket.on('artworkInteraction', (data) => {
        socket.broadcast.emit('artworkInteractionBroadcast', data);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Виртуальная галерея доступна по адресу http://localhost:${PORT}`);
});

export { app, server };