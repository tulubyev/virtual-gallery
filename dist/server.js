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
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const jwt_1 = require("./config/jwt");
const routes_1 = require("./routes");
// Без секрета сервер не должен стартовать
(0, jwt_1.getJwtSecret)();
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
// За Traefik: корректные req.ip и протокол
app.set('trust proxy', 1);
// В проде фронтенд отдаётся с того же домена; CORS_ORIGIN нужен только для разработки
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : false;
const io = new socket_io_1.Server(server, {
    cors: { origin: corsOrigin, methods: ['GET', 'POST'] }
});
app.use((0, cors_1.default)({ origin: corsOrigin }));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Healthcheck (Docker / Traefik)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// API
app.use('/api/auth', routes_1.authRoutes);
// Загрузка — раньше artworkRoutes, иначе '/:id' перехватывает '/submissions-for-review'
app.use('/api/artworks', routes_1.artworkUploadRoutes);
app.use('/api/artworks', routes_1.artworkRoutes);
app.use('/api/galleries', routes_1.galleryRoutes);
app.use('/api/users', routes_1.userRoutes);
app.use('/api/ai', routes_1.aiRoutes);
app.use('/api/admin/users', routes_1.userManagementRoutes);
// Собранный фронтенд (Vite) + SPA-фолбэк: /admin, /curator и т.д. обрабатывает React Router
const publicDir = process.env.PUBLIC_DIR || path_1.default.join(__dirname, '../public');
if (fs_1.default.existsSync(publicDir)) {
    app.use(express_1.default.static(publicDir));
    app.get(/^\/(?!api\/|socket\.io\/)[^.]*$/, (req, res) => {
        res.sendFile(path_1.default.join(publicDir, 'index.html'));
    });
}
// Ошибки middleware (например, multer) — JSON вместо HTML-страницы
app.use((err, req, res, next) => {
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
//# sourceMappingURL=server.js.map