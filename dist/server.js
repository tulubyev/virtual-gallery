"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const authRoutes_1 = require("./routes/authRoutes");
const artworkRoutes_1 = require("./routes/artworkRoutes");
const galleryRoutes_1 = require("./routes/galleryRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const aiRoutes_1 = require("./routes/aiRoutes");
const userManagementRoutes_1 = require("./routes/userManagementRoutes");
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
console.log('Middleware загружены');
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, '../public/assets')));
console.log('Статические файлы настроены');
app.use('/api/auth', authRoutes_1.authRoutes);
app.use('/api/artworks', artworkRoutes_1.artworkRoutes);
app.use('/api/galleries', galleryRoutes_1.galleryRoutes);
app.use('/api/users', userRoutes_1.userRoutes);
app.use('/api/ai', aiRoutes_1.aiRoutes);
app.use('/api/admin/users', userManagementRoutes_1.userManagementRoutes);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/admin.html'));
});
app.get('/curator', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/curator.html'));
});
app.get('/staff', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/staff.html'));
});
app.get('/tour-guide', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/tour-guide.html'));
});
app.get('/auction-participant', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/auction-participant.html'));
});
console.log('Маршруты загружены');
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
    console.log(`Виртуальная галерея доступна по адресу http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map