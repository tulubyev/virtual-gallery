// src/frontend/src/services/api.ts
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = '/api';

// Avoid firing the session-expired handler more than once per expiry event
let sessionExpiredHandled = false;

/**
 * Endpoints that can legitimately return 401 without meaning the user's
 * session has expired.  Adding a path here prevents the session-expired
 * toast + redirect from firing for that request.
 *
 *  /auth/login    — bad credentials on a fresh login; user never had a session
 *  /auth/register — new-account creation; no session exists yet
 *  /auth/refresh  — the refresh token itself was invalid/expired; the caller
 *                   handles this case and should decide what to show the user
 */
const AUTH_ONLY_PATHS = ['/auth/login', '/auth/register', '/auth/refresh'];

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

// --- Silent token refresh state ---
let isRefreshing = false;
let refreshSubscribers: Array<{ resolve: (token: string) => void; reject: (err: Error) => void }> = [];

function subscribeTokenRefresh(resolve: (token: string) => void, reject: (err: Error) => void): void {
  refreshSubscribers.push({ resolve, reject });
}

function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach(sub => sub.resolve(token));
  refreshSubscribers = [];
}

function onRefreshFailed(err: Error): void {
  refreshSubscribers.forEach(sub => sub.reject(err));
  refreshSubscribers = [];
}

/**
 * Attempt to get a new JWT using the current one.
 * Returns the new token on success, or null on failure.
 */
export async function tryRefreshToken(): Promise<string | null> {
  const currentToken = localStorage.getItem('authToken');
  if (!currentToken) return null;
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { headers: { Authorization: `Bearer ${currentToken}` } }
    );
    const { token } = response.data;
    if (token) {
      localStorage.setItem('authToken', token);
      return token;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Drop-in replacement for `fetch` that:
 *  - Automatically attaches the Authorization header when a token is present
 *  - Silently refreshes the token on 401 and retries once
 *  - Shows the session-expired toast + redirect only if refresh also fails
 *    (skipped entirely for auth-only endpoints like /auth/login)
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
      // Try silent refresh, then retry the original request once
      const newToken = await tryRefreshToken();
      if (newToken) {
        const retryHeaders = new Headers(init.headers);
        retryHeaders.set('Authorization', `Bearer ${newToken}`);
        return fetch(input, { ...init, headers: retryHeaders });
      }
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

// Перехватчик ответов — silently refresh on 401, retry, then show session-expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl: string = error.config?.url ?? '';

    if (error.response?.status === 401 && !isAuthOnlyPath(requestUrl)) {
      const originalRequest = error.config;

      // Only attempt refresh once per request
      if (!originalRequest._retry) {
        if (isRefreshing) {
          // Another refresh is in flight — queue this request to retry when done
          return new Promise<any>((resolve, reject) => {
            subscribeTokenRefresh(
              (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              (err: Error) => reject(err)
            );
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const newToken = await tryRefreshToken();
        isRefreshing = false;

        if (newToken) {
          onTokenRefreshed(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          const sessionErr = new Error('Session expired');
          onRefreshFailed(sessionErr);
          handleSessionExpired();
          return Promise.reject(sessionErr);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
