"use strict";
// src/backend/controllers/artworkUploadController.js
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AdmZip = require('adm-zip'); // Для работы с ZIP-архивами
const sharp = require('sharp'); // Для обработки изображений
const artworkAnalyzer = require('../../ai-ml/models/artworkAnalyzer'); // Используем ИИ-анализатор изображений
const s3Service = require('../../backend/services/s3Service'); // Сервис для работы с S3
// Временное хранилище для файлов перед загрузкой в S3
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Временная папка для файлов перед загрузкой в S3
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        // Генерируем уникальное имя файла
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});
// Ограничения на загружаемые файлы
const fileFilter = (req, file, cb) => {
    // Разрешаем изображения и ZIP-архивы
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
        cb(null, true);
    }
    else {
        cb(new Error('Неподдерживаемый тип файла. Разрешены изображения и ZIP-архивы.'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // Ограничение 50MB для архивов
    },
    fileFilter: fileFilter
});
const imageProcessor = require('../../backend/utils/imageProcessor');
// Создаем временную папку если она не существует
if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
}
const artworkUploadController = {
    // Загрузить изображение экспоната
    uploadArtwork: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        // Мидлвар для загрузки файла
        upload.single('image'),
        // Основная функция контроллера
        async (req, res) => {
            try {
                // Проверяем, был ли файл загружен
                if (!req.file) {
                    return res.status(400).json({ error: 'Файл изображения обязателен' });
                }
                // Получаем информацию о пользователе из токена
                const userId = req.userId;
                // Проверяем, является ли файл архивом
                if (req.file.mimetype === 'application/zip' || req.file.originalname.endsWith('.zip')) {
                    // Обрабатываем ZIP-архив
                    const extractDir = path.join('tmp', 'extracted', uuidv4());
                    const extractedImages = await imageProcessor.extractImagesFromArchive(req.file.path, extractDir);
                    // Загружаем каждый извлеченный файл в S3
                    const s3UploadResults = [];
                    for (const extractedImage of extractedImages) {
                        const s3Key = s3Service.generateS3Key(extractedImage.originalName, userId, 1, 'archive-extracted');
                        const uploadResult = await s3Service.uploadFile(extractedImage.extractedPath, s3Key, {
                            contentType: 'image/jpeg',
                            originalFilename: extractedImage.originalName
                        });
                        s3UploadResults.push(uploadResult);
                    }
                    // Возвращаем информацию о загруженных изображениях
                    res.status(201).json({
                        archive_filename: req.file.filename,
                        original_name: req.file.originalname,
                        size: req.file.size,
                        mime_type: req.file.mimetype,
                        upload_date: new Date(),
                        uploaded_by: userId,
                        extracted_images_count: extractedImages.length,
                        s3_upload_results: s3UploadResults,
                        status: 'archive_extracted_and_uploaded_to_s3',
                        message: `Архив успешно загружен, извлечено и загружено в S3 ${extractedImages.length} изображений.`
                    });
                }
                else {
                    // Загружаем файл в S3
                    const s3Key = s3Service.generateS3Key(req.file.originalname, userId, 1, 'artworks');
                    const s3UploadResult = await s3Service.uploadFile(req.file.path, s3Key, {
                        contentType: req.file.mimetype,
                        originalFilename: req.file.originalname
                    });
                    // Обрабатываем изображение (генерируем миниатюры, добавляем водяной знак)
                    const processedResult = await imageProcessor.processImage(req.file.path, userId, 1, // В реальной системе это будет ID экспоната из базы данных
                    'Виртуальная галерея', // Информация о владельце
                    'Неизвестный автор' // Информация об авторе
                    );
                    res.status(201).json({
                        upload_id: 1, // В реальной реализации это будет ID из базы данных
                        filename: req.file.filename,
                        original_name: req.file.originalname,
                        size: req.file.size,
                        mime_type: req.file.mimetype,
                        upload_date: new Date(),
                        uploaded_by: userId,
                        status: 'processed_and_uploaded_to_s3',
                        s3_url: s3UploadResult.url,
                        watermarked_path: processedResult.watermarkedImagePath,
                        thumbnails: processedResult.thumbnails,
                        message: 'Изображение успешно загружено в S3, обработано и водяной знак добавлен.'
                    });
                }
                // Удаляем временный файл
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении временного файла:', err);
                    }
                });
            }
            catch (error) {
                console.error('Ошибка при загрузке изображения:', error);
                // Удаляем временный файл в случае ошибки
                if (req.file && req.file.path) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error('Ошибка при удалении временного файла:', err);
                        }
                    });
                }
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Запустить ИИ-анализ загруженного изображения
    analyzeUploadedArtwork: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const { uploadId } = req.params;
                const userId = req.userId;
                // В реальной системе здесь нужно получить информацию о загрузке из базы данных
                // и проверить, что пользователь является владельцем загрузки
                // Запускаем ИИ-анализ изображения с помощью существующего анализатора
                // В реальной системе здесь будет вызов ИИ-модели для анализа изображения
                const imagePath = `uploads/artworks/${uploadId}.jpg`; // В реальной системе путь нужно получить из базы данных
                const analysisResult = await artworkAnalyzer.analyzeArtwork(imagePath);
                // В реальной системе результат анализа нужно сохранить в базу данных
                // и обновить статус загрузки на 'analyzed'
                res.json({
                    upload_id: uploadId,
                    analysis_result: analysisResult,
                    status: 'analyzed',
                    message: 'Анализ изображения завершен'
                });
            }
            catch (error) {
                console.error('Ошибка при анализе изображения:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Сгенерировать NFT для произведения искусства
    generateNFT: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const userId = req.userId;
                const { artworkId, ownerInfo } = req.body;
                // В реальной системе здесь нужно получить информацию о произведении искусства из базы данных
                // и проверить, что пользователь является владельцем или имеет права на создание NFT
                // Импортируем генератор NFT
                const nftGenerator = require('../../backend/utils/nftGenerator');
                // Заглушка для информации о произведении искусства
                // В реальной системе это будет получено из базы данных
                const artworkInfo = {
                    artwork_id: artworkId,
                    title: 'Пример произведения искусства',
                    description: 'Описание произведения искусства для NFT',
                    image_url: `https://virtual-gallery.com/uploads/artworks/${artworkId}.jpg`,
                    artist_name: 'Имя художника',
                    year_created: 2023,
                    medium: 'Цифровое искусство',
                    dimensions: '1920x1080',
                    style: 'Современное искусство'
                };
                // Генерируем NFT
                const nftResult = await nftGenerator.generateNFT(artworkInfo, ownerInfo);
                res.json({
                    ...nftResult,
                    message: 'NFT успешно сгенерирован и готов к размещению в блокчейне'
                });
            }
            catch (error) {
                console.error('Ошибка при генерации NFT:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Получить результаты ИИ-анализа
    getAnalysisResults: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const { uploadId } = req.params;
                const userId = req.userId;
                // В реальной системе здесь нужно получить результаты анализа из базы данных
                // и проверить, что пользователь является владельцем загрузки
                // Возвращаем заглушку с результатами анализа
                const analysisResult = {
                    tags: ['landscape', 'nature', 'trees', 'scenic'],
                    style: 'impressionism',
                    dominant_colors: ['#4A752C', '#8B4513', '#5F9EA0'],
                    composition_elements: ['rule_of_thirds', 'leading_lines'],
                    estimated_period: '1880-1920',
                    confidence: 0.85,
                    detected_objects: [
                        { name: 'tree', confidence: 0.92, bounding_box: { x: 100, y: 150, width: 200, height: 300 } },
                        { name: 'mountain', confidence: 0.87, bounding_box: { x: 50, y: 50, width: 400, height: 200 } }
                    ],
                    image_quality: {
                        brightness: 0.7,
                        contrast: 0.6,
                        sharpness: 0.8,
                        resolution: { width: 1920, height: 1080 },
                        compression_artifacts: 0.1
                    }
                };
                res.json({
                    upload_id: uploadId,
                    analysis_result: analysisResult,
                    status: 'analyzed',
                    created_at: new Date()
                });
            }
            catch (error) {
                console.error('Ошибка при получении результатов анализа:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Отправить экспонат на проверку куратору
    submitForReview: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const userId = req.userId;
                const artworkData = req.body;
                // В реальной системе здесь нужно:
                // 1. Проверить, что пользователь является владельцем загрузки
                // 2. Проверить, что все необходимые поля заполнены
                // 3. Создать запись в таблице artwork_submissions
                // 4. Обновить статус загрузки на 'review_pending'
                // Возвращаем заглушку
                const submission = {
                    submission_id: 1, // В реальной системе это будет ID из базы данных
                    artwork_upload: {
                        ...artworkData,
                        status: 'review_pending'
                    },
                    submitted_by: userId,
                    submitted_at: new Date(),
                    status: 'pending',
                    reviewer_notes: null
                };
                res.status(201).json(submission);
            }
            catch (error) {
                console.error('Ошибка при отправке экспоната на проверку:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Получить все загрузки пользователя
    getUserUploads: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const userId = req.userId;
                // В реальной системе здесь нужно получить список загрузок пользователя из базы данных
                // Возвращаем заглушку
                const uploads = [
                    {
                        upload_id: 1,
                        filename: 'sample_image.jpg',
                        original_name: 'beautiful_landscape.jpg',
                        size: 2048576, // размер в байтах
                        mime_type: 'image/jpeg',
                        upload_date: new Date(),
                        uploaded_by: userId,
                        status: 'published',
                        file_path: 'uploads/artworks/sample_image.jpg',
                        analysis_result: {
                            tags: ['landscape', 'nature'],
                            style: 'impressionism',
                            confidence: 0.85
                        }
                    },
                    {
                        upload_id: 2,
                        filename: 'another_image.png',
                        original_name: 'abstract_art.png',
                        size: 1536288, // размер в байтах
                        mime_type: 'image/png',
                        upload_date: new Date(),
                        uploaded_by: userId,
                        status: 'analyzed',
                        file_path: 'uploads/artworks/another_image.png',
                        analysis_result: {
                            tags: ['abstract', 'geometric'],
                            style: 'abstract',
                            confidence: 0.78
                        }
                    }
                ];
                res.json(uploads);
            }
            catch (error) {
                console.error('Ошибка при получении загрузок пользователя:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Получить все материалы на проверке (только для кураторов и администраторов)
    getSubmissionsForReview: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const userId = req.userId;
                const userRole = req.role; // Роль пользователя из токена
                // Проверяем, имеет ли пользователь права на проверку материалов
                if (userRole !== 'curator' && userRole !== 'admin') {
                    return res.status(403).json({ error: 'Недостаточно прав для доступа к материалам на проверке' });
                }
                // В реальной системе здесь нужно получить список материалов на проверке из базы данных
                // Возвращаем заглушку
                const submissions = [
                    {
                        submission_id: 1,
                        artwork_upload: {
                            upload_id: 5,
                            filename: 'new_artwork.jpg',
                            original_name: 'sunset_over_mountains.jpg',
                            size: 3072864,
                            mime_type: 'image/jpeg',
                            upload_date: new Date(),
                            uploaded_by: 3, // ID другого пользователя
                            status: 'review_pending',
                            file_path: 'uploads/artworks/new_artwork.jpg'
                        },
                        submitted_by: 3,
                        submitted_at: new Date(),
                        status: 'pending',
                        reviewer_notes: null
                    },
                    {
                        submission_id: 2,
                        artwork_upload: {
                            upload_id: 7,
                            filename: 'portrait.jpg',
                            original_name: 'old_master_portrait.jpg',
                            size: 2560720,
                            mime_type: 'image/jpeg',
                            upload_date: new Date(),
                            uploaded_by: 5, // ID другого пользователя
                            status: 'review_pending',
                            file_path: 'uploads/artworks/portrait.jpg'
                        },
                        submitted_by: 5,
                        submitted_at: new Date(),
                        status: 'pending',
                        reviewer_notes: null
                    }
                ];
                res.json(submissions);
            }
            catch (error) {
                console.error('Ошибка при получении материалов на проверке:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Одобрить экспонат (только для кураторов и администраторов)
    approveSubmission: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const { submissionId } = req.params;
                const userId = req.userId;
                const userRole = req.role; // Роль пользователя из токена
                const artworkData = req.body; // Дополнительные данные для создания экспоната
                // Проверяем, имеет ли пользователь права на одобрение материалов
                if (userRole !== 'curator' && userRole !== 'admin') {
                    return res.status(403).json({ error: 'Недостаточно прав для одобрения материала' });
                }
                // В реальной системе здесь нужно:
                // 1. Проверить, что заявка существует и находится на проверке
                // 2. Создать запись в таблице artworks с данными из загрузки и дополнительными данными
                // 3. Обновить статус заявки на 'approved'
                // 4. Обновить статус загрузки на 'published'
                res.json({
                    submission_id: submissionId,
                    status: 'approved',
                    artwork_id: 100, // ID созданного экспоната
                    message: 'Материал одобрен и добавлен в галерею'
                });
            }
            catch (error) {
                console.error('Ошибка при одобрении материала:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Отклонить экспонат (только для кураторов и администраторов)
    rejectSubmission: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const { submissionId } = req.params;
                const userId = req.userId;
                const userRole = req.role; // Роль пользователя из токена
                const { reason } = req.body; // Причина отклонения
                // Проверяем, имеет ли пользователь права на отклонение материалов
                if (userRole !== 'curator' && userRole !== 'admin') {
                    return res.status(403).json({ error: 'Недостаточно прав для отклонения материала' });
                }
                // В реальной системе здесь нужно:
                // 1. Проверить, что заявка существует и находится на проверке
                // 2. Обновить статус заявки на 'rejected' с указанием причины
                // 3. Обновить статус загрузки на 'rejected'
                res.json({
                    submission_id: submissionId,
                    status: 'rejected',
                    reason: reason,
                    message: 'Материал отклонен'
                });
            }
            catch (error) {
                console.error('Ошибка при отклонении материала:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ],
    // Запросить повторный анализ изображения
    reanalyzeImage: [
        // Мидлвар для аутентификации
        require('../../middleware/auth').authenticateToken,
        async (req, res) => {
            try {
                const { uploadId } = req.params;
                const userId = req.userId;
                // В реальной системе здесь нужно:
                // 1. Проверить, что пользователь является владельцем загрузки
                // 2. Проверить, что загрузка существует и имеет статус 'analyzed' или 'published'
                // 3. Запустить повторный ИИ-анализ изображения
                // 4. Обновить результаты анализа в базе данных
                // Запускаем ИИ-анализ изображения с помощью существующего анализатора
                const imagePath = `uploads/artworks/${uploadId}.jpg`; // В реальной системе путь нужно получить из базы данных
                const analysisResult = await artworkAnalyzer.analyzeArtwork(imagePath);
                res.json({
                    upload_id: uploadId,
                    analysis_result: analysisResult,
                    status: 'analyzed',
                    message: 'Повторный анализ изображения завершен'
                });
            }
            catch (error) {
                console.error('Ошибка при повторном анализе изображения:', error);
                res.status(500).json({ error: error.message });
            }
        }
    ]
};
module.exports = artworkUploadController;
//# sourceMappingURL=artworkUploadController.js.map