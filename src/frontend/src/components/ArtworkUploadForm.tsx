// src/frontend/src/components/ArtworkUploadForm.tsx
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { imageProcessingService } from '../services/imageProcessingService';
import { ArtworkUpload } from '../types';

const UploadContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UploadTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const UploadArea = styled.div<{ isDragOver: boolean }>`
  border: 2px dashed ${props => props.isDragOver ? '#3498db' : '#bdc3c7'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.isDragOver ? '#f8f9fa' : '#f8f9fa'};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: #3498db;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`;

const UploadButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 1.5rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background-color: #3498db;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${props =>
    props.type === 'success' ? '#d4edda' :
    props.type === 'error' ? '#f8d7da' : '#d1ecf1'
  };
  color: ${props =>
    props.type === 'success' ? '#155724' :
    props.type === 'error' ? '#721c24' : '#0c5460'
  };
`;

const CacheInfo = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ArtworkUploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [processedFiles, setProcessedFiles] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [userId, setUserId] = useState<number>(1); // В реальной системе это будет ID текущего пользователя
  const [uploadMethod, setUploadMethod] = useState<'drag' | 'archive' | 'url'>('drag');
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [cacheInfo, setCacheInfo] = useState(imageProcessingService.getCacheInfo());

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обновляем информацию о кэше каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCacheInfo(imageProcessingService.getCacheInfo());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    let errorMessage = '';

    for (const file of selectedFiles) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        // Проверяем, может быть это архив
        if (uploadMethod === 'archive' && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
          validFiles.push(file);
        } else {
          errorMessage = 'Пожалуйста, выберите изображения или ZIP-архив с изображениями';
          break;
        }
      } else {
        // Проверяем размер файла (максимум 10MB)
        if (file.size > 10 * 1024 * 1024) {
          errorMessage = 'Размер файла не должен превышать 10MB';
          break;
        }
        validFiles.push(file);
      }
    }

    if (errorMessage) {
      setStatusMessage({ type: 'error', message: errorMessage });
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
    setStatusMessage(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setUrls(prev => [...prev, urlInput]);
      setUrlInput('');
      setStatusMessage({ type: 'info', message: `Добавлена ссылка: ${urlInput}` });
    }
  };

  const handleUpload = async () => {
    if (files.length === 0 && urls.length === 0) {
      setStatusMessage({ type: 'error', message: 'Пожалуйста, добавьте изображения или ссылки для загрузки' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setProcessedFiles(0);

    // Подсчитываем общее количество файлов
    let total = files.length;
    if (uploadMethod === 'archive') {
      // Если загружается архив, нужно будет извлечь из него файлы
      total = 1; // временно, будет обновлено после извлечения
    }
    setTotalFiles(total);

    setStatusMessage({ type: 'info', message: 'Загрузка изображений...' });

    try {
      // Загружаем файлы по одному или извлекаем из архива
      if (uploadMethod === 'archive' && files.length > 0) {
        // Обработка архива
        for (const file of files) {
          if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
            // В реальной системе здесь будет извлечение файлов из архива
            // Пока просто эмулируем процесс
            setStatusMessage({ type: 'info', message: `Извлечение файлов из архива ${file.name}...` });

            // Эмуляция извлечения файлов из архива
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Предположим, что из архива извлеклось 5 файлов
            const extractedFilesCount = 5;
            setTotalFiles(extractedFilesCount);

            // Загружаем извлеченные файлы
            for (let i = 0; i < extractedFilesCount; i++) {
              setProcessedFiles(prev => prev + 1);
              const progress = Math.round(((i + 1) / extractedFilesCount) * 100);
              setUploadProgress(progress);

              // Эмуляция загрузки файла
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          }
        }
      } else {
        // Загрузка обычных файлов
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Обновляем прогресс
          setProcessedFiles(i + 1);
          const progress = Math.round(((i + 1) / files.length) * 100);
          setUploadProgress(progress);

          setStatusMessage({
            type: 'info',
            message: `Загрузка файла ${i + 1} из ${files.length}: ${file.name}`
          });

          // Загружаем изображение
          const uploadResult = await imageProcessingService.uploadImage(file, userId);

          // Эмуляция задержки
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      // Загрузка по URL
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        setProcessedFiles(prev => prev + 1);
        const totalItems = files.length + urls.length;
        const progress = Math.round(((files.length + i + 1) / totalItems) * 100);
        setUploadProgress(progress);

        setStatusMessage({
          type: 'info',
          message: `Загрузка по ссылке ${i + 1} из ${urls.length}: ${url}`
        });

        // В реальной системе здесь будет загрузка изображения по URL
        // Пока эмулируем процесс
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setStatusMessage({
        type: 'success',
        message: `Все файлы успешно загружены! Обработано: ${files.length} файлов, ${urls.length} ссылок.`
      });

      // Автоматически запускаем ИИ-анализ
      setStatusMessage({ type: 'info', message: 'Запуск ИИ-анализа и генерации миниатюр...' });

      // Эмуляция анализа
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatusMessage({
        type: 'success',
        message: 'ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены.'
      });

      // Предлагаем сформировать NFT
      const createNFT = window.confirm('Хотите создать NFT для загруженных произведений?');
      if (createNFT) {
        setStatusMessage({ type: 'info', message: 'Создание NFT...' });

        // В реальной системе здесь будут вызовы для каждого загруженного произведения
        // Пока эмулируем процесс
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatusMessage({
          type: 'success',
          message: 'NFT успешно сформированы и готовы к размещению в блокчейне!'
        });
      }

      // Сбрасываем состояние
      setFiles([]);
      setUrls([]);
      setUploadProgress(0);
      setProcessedFiles(0);
      setTotalFiles(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
      setStatusMessage({
        type: 'error',
        message: `Ошибка при загрузке: ${(error as Error).message}`
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
  };

  const clearCache = () => {
    imageProcessingService.clearCache();
    setStatusMessage({ type: 'success', message: 'Кэш изображений очищен' });
  };

  return (
    <UploadContainer>
      <UploadTitle>Загрузка изображений экспонатов</UploadTitle>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            checked={uploadMethod === 'drag'}
            onChange={() => setUploadMethod('drag')}
          /> Загрузка файлов
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            checked={uploadMethod === 'archive'}
            onChange={() => setUploadMethod('archive')}
          /> Загрузка архива
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            checked={uploadMethod === 'url'}
            onChange={() => {
              setUploadMethod('url');
              setShowUrlInput(true);
            }}
          /> Загрузка по ссылке
        </label>
      </div>

      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Введите URL изображения"
            style={{
              width: '70%',
              padding: '0.5rem',
              marginRight: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Добавить
          </button>
        </form>
      )}

      <UploadArea
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={uploadMethod !== 'url' ? triggerFileSelect : undefined}
      >
        <UploadIcon>📁</UploadIcon>
        <UploadText>
          {uploadMethod === 'archive'
            ? 'Перетащите ZIP-архив с изображениями сюда или нажмите для выбора'
            : 'Перетащите изображения сюда или нажмите для выбора'}
        </UploadText>
        <UploadText><small>
          {uploadMethod === 'archive'
            ? 'Поддерживаемые форматы: ZIP (макс. 50MB)'
            : 'Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)'}
        </small></UploadText>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={uploadMethod === 'archive' ? '.zip,application/zip' : 'image/*'}
          multiple={uploadMethod !== 'archive'}
          style={{ display: 'none' }}
        />
      </UploadArea>

      {files.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Выбранные файлы:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {urls.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Ссылки для загрузки:</h4>
          <ul>
            {urls.map((url, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{url}</span>
                <button
                  onClick={() => removeUrl(index)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadProgress > 0 && (
        <>
          <ProgressBar>
            <ProgressFill width={uploadProgress} />
          </ProgressBar>
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#7f8c8d' }}>
            {processedFiles} из {totalFiles || files.length + urls.length} файлов обработано ({uploadProgress}%)
          </div>
        </>
      )}

      {statusMessage && (
        <StatusMessage type={statusMessage.type}>
          {statusMessage.message}
        </StatusMessage>
      )}

      <CacheInfo>
        <div>Кэш изображений: {(cacheInfo.size / 1024 / 1024).toFixed(2)} MB / {(cacheInfo.maxSize / 1024 / 1024).toFixed(0)} MB</div>
        <div>Количество закэшированных изображений: {cacheInfo.count}</div>
        <button
          onClick={clearCache}
          style={{
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Очистить кэш
        </button>
      </CacheInfo>

      <div style={{ textAlign: 'center' }}>
        <UploadButton
          onClick={handleUpload}
          disabled={(files.length === 0 && urls.length === 0) || isUploading}
        >
          {isUploading ? 'Загрузка...' : 'Загрузить и обработать'}
        </UploadButton>
      </div>
    </UploadContainer>
  );
};

export default ArtworkUploadForm;