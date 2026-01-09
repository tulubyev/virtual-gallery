// Backend server for Virtual Art Gallery
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

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

// Serve static files
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
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
    console.log(`Server running on port ${PORT}`);
    console.log(`Virtual Art Gallery accessible at http://localhost:${PORT}`);
});

module.exports = server;