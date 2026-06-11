// src/frontend/src/services/api.ts
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:5000/api';

// Avoid firing the session-expired handler more than once per expiry event
let sessionExpiredHandled = false;

// Auth-only endpoints that legitimately return 401 without meaning "session expired"
const AUTH_ONLY_PATHS = ['/auth/login', '/auth/register'];

function isAuthOnlyPath(url: string): boolean {
  return AUTH_ONLY_PATHS.some(p => url.includes(p));
}

function handleSessionExpired(): void {
  if (sessionExpiredHandled) return;
  sessionExpiredHandled = true;
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  toast.error('Your session has expired, please log in again', { duration: 4000 });
  setTimeout(() => {
    sessionExpiredHandled = false;
    window.location.href = '/login';
  }, 1500);
}

/**
 * Drop-in replacement for `fetch` that:
 *  - Automatically attaches the Authorization header when a token is present
 *  - Intercepts 401 responses and shows the session-expired toast + redirect
 *    (skipped for auth-only endpoints like /auth/login and /auth/register)
 */
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('authToken');
  const headers = new Headers(init.headers);
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    const requestUrl =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.href
        : (input as Request).url;

    if (!isAuthOnlyPath(requestUrl)) {
      handleSessionExpired();
    }
  }

  return response;
}

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
      const requestUrl: string = error.config?.url ?? '';
      if (!isAuthOnlyPath(requestUrl)) {
        handleSessionExpired();
      }
    }
    return Promise.reject(error);
  }
);

export default api;