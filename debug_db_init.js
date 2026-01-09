// Отладочная версия скрипта инициализации базы данных
const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Логирование в файл
const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync('db_init_debug.log', logEntry);
    console.log(message);
};

logMessage('Начало инициализации базы данных');

// Параметры подключения к базе данных
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'virtual_gallery_db',
    user: process.env.DB_USER || 'tulubyev',
    password: process.env.DB_PASSWORD || 'CrossBaikal6times!',
    ssl: {
        rejectUnauthorized: false // Required for many hosted PostgreSQL services
    }
};

logMessage(`Подключение к базе данных: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);

// Создаем пул подключений
const pool = new Pool(dbConfig);

// Читаем SQL-схему
const schemaPath = path.join(__dirname, 'src', 'database', 'schema.sql');
logMessage(`Чтение схемы из: ${schemaPath}`);

let schemaSQL;
try {
    schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    logMessage('Схема успешно прочитана');
} catch (err) {
    logMessage(`Ошибка чтения схемы: ${err.message}`);
    process.exit(1);
}

async function initializeDatabase() {
    let client;
    try {
        logMessage('Попытка подключения к базе данных...');
        client = await pool.connect();
        logMessage('Подключение к базе данных успешно установлено');
        
        // Начинаем транзакцию
        logMessage('Начало транзакции');
        await client.query('BEGIN');
        
        // Выполняем SQL-схему
        logMessage('Выполнение SQL-схемы...');
        await client.query(schemaSQL);
        logMessage('SQL-схема выполнена успешно');
        
        // Фиксируем транзакцию
        logMessage('Фиксация транзакции');
        await client.query('COMMIT');
        logMessage('Транзакция зафиксирована');
        
        logMessage('Инициализация базы данных завершена успешно!');
    } catch (err) {
        logMessage(`Ошибка инициализации базы данных: ${err.message}`);
        
        // Откатываем транзакцию в случае ошибки
        if (client) {
            try {
                logMessage('Откат транзакции');
                await client.query('ROLLBACK');
                logMessage('Транзакция откачена');
            } catch (rollbackErr) {
                logMessage(`Ошибка отката транзакции: ${rollbackErr.message}`);
            }
        }
        
        throw err;
    } finally {
        if (client) {
            client.release();
            logMessage('Клиентское подключение освобождено');
        }
        await pool.end();
        logMessage('Пул подключений закрыт');
    }
}

// Запускаем инициализацию
initializeDatabase()
    .then(() => {
        logMessage('Процесс инициализации завершен успешно');
        process.exit(0);
    })
    .catch((error) => {
        logMessage(`Процесс инициализации завершился с ошибкой: ${error.message}`);
        process.exit(1);
    });