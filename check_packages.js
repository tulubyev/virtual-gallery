// Проверка установленных пакетов
const fs = require('fs');
const path = require('path');

// Проверяем, существует ли директория node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');

if (fs.existsSync(nodeModulesPath)) {
    console.log('Директория node_modules существует');
    
    // Проверяем наличие конкретных пакетов
    const packagesToCheck = [
        'express',
        'three',
        'react',
        'react-dom',
        '@tensorflow/tfjs-node',
        'socket.io',
        'pg',
        'redis',
        'dotenv',
        'bcrypt',
        'jsonwebtoken'
    ];
    
    console.log('\nПроверка наличия пакетов:');
    packagesToCheck.forEach(pkg => {
        const pkgPath = path.join(nodeModulesPath, pkg);
        const exists = fs.existsSync(pkgPath);
        console.log(`${pkg}: ${exists ? '✓' : '✗'}`);
    });
} else {
    console.log('Директория node_modules не найдена. Запустите npm install для установки зависимостей.');
}