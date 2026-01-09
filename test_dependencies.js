// Тестовый файл для проверки основных зависимостей
console.log('Проверка основных зависимостей...');

try {
    // Проверяем основные зависимости
    const express = require('express');
    console.log('✓ Express загружен успешно');
    
    const jwt = require('jsonwebtoken');
    console.log('✓ JsonWebToken загружен успешно');
    
    const bcrypt = require('bcrypt');
    console.log('✓ Bcrypt загружен успешно');
    
    const pg = require('pg');
    console.log('✓ PostgreSQL (pg) загружен успешно');
    
    // Создаем простое приложение Express для тестирования
    const app = express();
    const PORT = 3001;
    
    app.get('/', (req, res) => {
        res.send('Виртуальная галерея искусств запущена успешно!');
    });
    
    // Проверяем работу сервера
    const server = app.listen(PORT, () => {
        console.log(`Тестовый сервер запущен на порту ${PORT}`);
        console.log(`Откройте http://localhost:${PORT} в браузере для проверки`);
        
        // Автоматически закрываем сервер через 5 секунд
        setTimeout(() => {
            console.log('Тест завершен. Сервер остановлен.');
            server.close();
        }, 5000);
    });
    
} catch (error) {
    console.error('✗ Ошибка при загрузке зависимостей:', error.message);
}