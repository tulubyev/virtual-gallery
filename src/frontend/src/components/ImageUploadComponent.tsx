// src/frontend/src/components/ImageUploadComponent.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { imageProcessingService } from '../services';
import AnalysisProgress from './AnalysisProgress';

const UploadContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`;

const UploadArea = styled.div<{ isDragActive: boolean }>`
  border: 2px dashed ${({ isDragActive }) => isDragActive ? '#6200ee' : '#ddd'};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({ isDragActive }) => isDragActive ? 'rgba(98, 0, 238, 0.05)' : '#fafafa'};
  transition: all 0.3s ease;

  &:hover {
    border-color: #6200ee;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #666;
  margin: 0.5rem 0;
`;

const UploadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;


interface ImageUploadComponentProps {
  onUploadComplete: (upload: any) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработка drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Обработка drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Обработка выбора файлов
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Обработка файлов
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    
    // Проверяем типы файлов
    const validFiles = newFiles.filter(file => 
      file.type.startsWith('image/') && 
      (file.type === 'image/jpeg' || 
       file.type === 'image/png' || 
       file.type === 'image/webp' ||
       file.type === 'image/jpg')
    );
    
    if (validFiles.length !== newFiles.length) {
      alert('Поддерживаются только изображения форматов JPEG, PNG, WebP');
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      // Создаем превью
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // Удаление файла
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Загрузка файлов
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert('Пожалуйста, выберите изображения для загрузки');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // В реальной реализации здесь будет загрузка каждого файла
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Имитация процесса загрузки
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev === null) return 0;
            const newProgress = prev + 10;
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return newProgress;
          });
        }, 200);

        // Загрузка файла через сервис
        const uploadResult = await imageProcessingService.uploadImage(file, 1); // В реальной реализации userId будет из контекста
        
        // Запуск анализа изображения
        await imageProcessingService.analyzeImage(uploadResult.artwork_id || 1);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Вызов колбэка для обработки результата
        onUploadComplete(uploadResult);
      }

      // Сброс состояния после загрузки
      setTimeout(() => {
        setSelectedFiles([]);
        setPreviews([]);
        setUploadProgress(null);
        setUploading(false);
        alert('Изображения успешно загружены и отправлены на анализ');
      }, 1000);
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
      alert(error instanceof Error ? error.message : 'Ошибка при загрузке изображений');
      setUploading(false);
      setUploadProgress(null);
    }
  };

  // Обработка клика по области загрузки
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <UploadContainer>
      <h3>Загрузка изображений экспонатов</h3>
      
      <UploadArea 
        isDragActive={dragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <UploadIcon>📁</UploadIcon>
        <UploadText>Перетащите изображения сюда или нажмите для выбора</UploadText>
        <UploadText>Поддерживаются форматы: JPEG, PNG, WebP</UploadText>
        <UploadButton>Выбрать файлы</UploadButton>
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </UploadArea>
      
      {uploadProgress !== null && (
        <AnalysisProgress
          percentage={uploadProgress}
          status={uploadProgress < 100 ? "Загрузка..." : "Загрузка завершена"}
        />
      )}
      
      {previews.length > 0 && (
        <PreviewContainer>
          {previews.map((preview, index) => (
            <PreviewItem key={index}>
              <PreviewImage src={preview} alt={`Preview ${index}`} />
              <RemoveButton onClick={() => removeFile(index)}>×</RemoveButton>
            </PreviewItem>
          ))}
        </PreviewContainer>
      )}
      
      {selectedFiles.length > 0 && (
        <UploadButton 
          onClick={uploadFiles} 
          disabled={uploading}
          style={{ marginTop: '1rem' }}
        >
          {uploading ? 'Загрузка...' : `Загрузить ${selectedFiles.length} файл(ов)`}
        </UploadButton>
      )}
    </UploadContainer>
  );
};

export default ImageUploadComponent;