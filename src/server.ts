import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

import { getJwtSecret } from './config/jwt';
import {
    authRoutes,
    artworkRoutes,
    galleryRoutes,
    userRoutes,
    aiRoutes,
    userManagementRoutes,
    artworkUploadRoutes
} from './routes';

// Без секрета сервер не должен стартовать
getJwtSecret();

const app: Application = express();
const server = http.createServer(app);

// За Traefik: корректные req.ip и протокол
app.set('trust proxy', 1);

// В проде фронтенд отдаётся с того же домена; CORS_ORIGIN нужен только для разработки
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : false;

const io: Server = new Server(server, {
    cors: { origin: corsOrigin, methods: ['GET', 'POST'] }
});

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Healthcheck (Docker / Traefik)
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// API
app.use('/api/auth', authRoutes);
// Загрузка — раньше artworkRoutes, иначе '/:id' перехватывает '/submissions-for-review'
app.use('/api/artworks', artworkUploadRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin/users', userManagementRoutes);

// Собранный фронтенд (Vite) + SPA-фолбэк: /admin, /curator и т.д. обрабатывает React Router
const publicDir = process.env.PUBLIC_DIR || path.join(__dirname, '../public');
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get(/^\/(?!api\/|socket\.io\/)[^.]*$/, (req: Request, res: Response) => {
        res.sendFile(path.join(publicDir, 'index.html'));
    });
}

// Ошибки middleware (например, multer) — JSON вместо HTML-страницы
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    res.status(err.status || 400).json({ error: err.message || 'Request failed' });
});

io.on('connection', (socket) => {
    console.log('Пользователь подключен:', socket.id);

    socket.on('disconnect', () => {
        console.log('Пользователь отключен:', socket.id);
    });

    socket.on('navigate', (data) => {
        socket.broadcast.emit('userNavigate', data);
    });

    socket.on('artworkInteraction', (data) => {
        socket.broadcast.emit('artworkInteractionBroadcast', data);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

export { app, server };
