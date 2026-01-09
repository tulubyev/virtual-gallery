// Отладочная версия сервера
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

// Импортируем маршруты
const authRoutes = require('./src/backend/routes/authRoutes');
const artworkRoutes = require('./src/backend/routes/artworkRoutes');
const galleryRoutes = require('./src/backend/routes/galleryRoutes');
const userRoutes = require('./src/backend/routes/userRoutes');
const aiRoutes = require('./src/backend/routes/aiRoutes');
const iotRoutes = require('./src/backend/routes/iotRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
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
app.use('/assets', express.static(path.join(__dirname, './src/frontend/assets')));

console.log('Статические файлы настроены');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/iot', iotRoutes);

console.log('Маршруты загружены');

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/frontend/index.html'));
});

console.log('Главная страница настроена');

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Виртуальная галерея доступна по адресу http://localhost:${PORT}`);
});

module.exports = server;