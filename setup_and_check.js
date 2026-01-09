// Скрипт для установки и проверки зависимостей
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Проверка и установка зависимостей...');

// Проверяем, существует ли директория node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');

if (!fs.existsSync(nodeModulesPath)) {
    console.log('Директория node_modules не найдена. Попытка установки зависимостей...');
    
    // Команда для установки зависимостей
    const installCmd = 'npm install';
    
    exec(installCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка при установке зависимостей: ${error.message}`);
            return;
        }
        
        if (stderr) {
            console.warn(`Предупреждения при установке: ${stderr}`);
        }
        
        console.log('Зависимости установлены. Проверка модулей...');
        checkModules();
    });
} else {
    console.log('Директория node_modules найдена. Проверка модулей...');
    checkModules();
}

function checkModules() {
    try {
        // Проверяем наличие модулей
        require('pg');
        console.log('✓ pg модуль установлен');
    } catch (e) {
        console.log('✗ pg модуль не установлен');
    }
    
    try {
        require('dotenv');
        console.log('✓ dotenv модуль установлен');
    } catch (e) {
        console.log('✗ dotenv модуль не установлен');
    }
    
    try {
        require('express');
        console.log('✓ express модуль установлен');
    } catch (e) {
        console.log('✗ express модуль не установлен');
    }
    
    console.log('Проверка завершена.');
}