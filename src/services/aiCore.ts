// Клиент Python-ядра ИИ (AI_CORE_URL) для служебных запросов из Express.
// Ядро закрыто внутренним токеном (X-Internal-Token); наружу ошибки сети и тексты ядра не отдаются.

export interface CoreResponse {
  status: number;
  data: any;
}

export class AiCoreUnavailable extends Error {}

const TIMEOUT_MS = 30000;

export async function callAiCore(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: object,
  headers: Record<string, string> = {},
  timeoutMs: number = TIMEOUT_MS,           // генерация с проверкой цитат идёт дольше обычного запроса
): Promise<CoreResponse> {
  const base = process.env.AI_CORE_URL || 'http://localhost:8001';
  const token = process.env.INTERNAL_API_TOKEN || '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${base}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'X-Internal-Token': token } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const isJson = (response.headers.get('content-type') || '').includes('application/json');
    return { status: response.status, data: isJson ? await response.json() : null };
  } catch {
    throw new AiCoreUnavailable('AI core unavailable');
  } finally {
    clearTimeout(timer);
  }
}
