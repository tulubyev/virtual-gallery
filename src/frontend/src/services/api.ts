// src/frontend/src/services/api.ts
import axios from 'axios';

const API_BASE_URL = '/api';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов для добавления токена аутентификации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или недействителен - очищаем данные пользователя
      localStorage.removeItem('authToken');
      // Можно добавить перенаправление на страницу входа
    }
    return Promise.reject(error);
  }
);

export default api;