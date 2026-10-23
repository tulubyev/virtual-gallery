// lib/rag.ts — «вопросы по документам»: запросы к /api/ai/rag-query и базе знаний, разбор ответа с цитатами.
import { fetchWithAuth } from '../services/api';

export type Outcome = 'answered' | 'insufficient_evidence' | 'no_sources' | 'citations_failed';

export interface RagSource {
  id: number;
  document_id: string;
  title: string | null;
  page: number | null;
  license: string | null;
  cited: boolean;
  content: string;
}

export interface RagAnswer {
  query: string;
  outcome: Outcome;
  answer: string;
  insufficient_evidence: boolean;
  sources: RagSource[];
  retrieval: { dense: number; lexical: number; degraded: string[] };
  processing_time: number;
}

export interface KbDocument {
  document_id: string;
  title: string | null;
  access: 'public' | 'staff';
  license: string | null;
  pages_count: number | null;
  chunks_count: number;
  updated_at: string | null;
  category: string | null;
  summary: string | null;
}

export const STAFF_ROLES = ['admin', 'curator', 'staff'];
export const CURATOR_ROLES = ['admin', 'curator'];
export const MAX_QUESTION = 1000;
export const MAX_PDF_BYTES = 50 * 1024 * 1024;

/** Роль текущего пользователя из сохранённой сессии (её проверяет сервер при каждом запросе). */
export function currentRole(): string | null {
  try {
    const raw = localStorage.getItem('currentUser');
    const role = raw ? JSON.parse(raw)?.role : null;
    return typeof role === 'string' ? role : null;
  } catch {
    return null;
  }
}

export const isStaff = (role: string | null) => !!role && STAFF_ROLES.includes(role);
export const isCurator = (role: string | null) => !!role && CURATOR_ROLES.includes(role);

async function failure(res: Response, fallback: string): Promise<Error> {
  let body: any = null;
  try { body = await res.json(); } catch { /* тела нет */ }
  // Тексты лимитов и проверок приходят от нашего сервера; для сбоев ядра подробности не показываем
  if (res.status === 429 || res.status === 400 || res.status === 413 || res.status === 422) {
    const text = body?.error || (typeof body?.detail === 'string' ? body.detail : null);
    if (text) return new Error(text);
  }
  if (res.status === 401) return new Error('Войдите в аккаунт, чтобы продолжить.');
  if (res.status === 403) return new Error('Недостаточно прав для этого действия.');
  if (res.status === 503) return new Error('ИИ-сервис сейчас недоступен. Попробуйте позже.');
  return new Error(fallback);
}

export async function askDocuments(query: string, options: { curatorMode?: boolean; documentIds?: string[] } = {}): Promise<RagAnswer> {
  const res = await fetchWithAuth('/api/ai/rag-query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      mode: options.curatorMode ? 'curator' : 'public',
      filters: options.documentIds?.length ? { documentIds: options.documentIds } : undefined,
    }),
  });
  if (!res.ok) throw await failure(res, 'Не удалось получить ответ. Попробуйте ещё раз.');
  return res.json();
}

export async function loadDocuments(): Promise<KbDocument[]> {
  const res = await fetchWithAuth('/api/ai/rag/documents');
  if (!res.ok) throw await failure(res, 'Не удалось загрузить список документов.');
  const data = await res.json();
  return Array.isArray(data.documents) ? data.documents : [];
}

export interface UploadInput {
  file: File;
  title?: string;
  access: 'public' | 'staff';
  license?: string;
  category?: string;
}

/** Отправить PDF на индексацию. Возвращает идентификатор задачи для pollTask. */
export async function uploadDocument(input: UploadInput): Promise<{ taskId: string; documentId: string }> {
  const documentId = `doc_${Date.now()}`;
  const form = new FormData();
  form.append('pdf', input.file);
  form.append('documentId', documentId);
  form.append('access', input.access);
  if (input.title?.trim()) form.append('title', input.title.trim());
  if (input.license?.trim()) form.append('license', input.license.trim());
  if (input.category && input.category !== 'auto') form.append('category', input.category);
  const res = await fetchWithAuth('/api/ai/process-pdf', { method: 'POST', body: form });
  if (!res.ok) throw await failure(res, 'Не удалось загрузить документ.');
  const data = await res.json();
  if (!data.task_id) throw new Error('Сервер не вернул номер задачи.');
  return { taskId: data.task_id, documentId };
}

export async function deleteDocument(documentId: string): Promise<void> {
  const res = await fetchWithAuth(`/api/ai/rag/documents/${encodeURIComponent(documentId)}`, { method: 'DELETE' });
  if (!res.ok) throw await failure(res, 'Не удалось удалить документ.');
}

export interface TaskOutcome {
  status: 'completed' | 'failed' | 'timeout';
  error?: string;
}

/** Ждать завершения обработки PDF. Сбой сети при опросе не считается сбоем задачи — пробуем дальше до таймаута. */
export async function pollTask(
  taskId: string,
  options: { intervalMs?: number; maxMs?: number; sleep?: (ms: number) => Promise<void>; onProgress?: (percent: number, step: string | null) => void } = {},
): Promise<TaskOutcome> {
  const interval = options.intervalMs ?? 2000;
  const maxMs = options.maxMs ?? 10 * 60 * 1000;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>(r => setTimeout(r, ms)));
  for (let waited = 0; waited <= maxMs; waited += interval) {
    try {
      const res = await fetchWithAuth(`/api/ai/analysis/${encodeURIComponent(taskId)}?type=pdf`);
      if (res.ok) {
        const task = await res.json();
        options.onProgress?.(Number(task.progress) || 0, task.current_step ?? null);
        if (task.status === 'completed') return { status: 'completed' };
        if (task.status === 'failed') return { status: 'failed', error: typeof task.error === 'string' ? task.error : undefined };
      }
    } catch { /* повторим */ }
    await sleep(interval);
  }
  return { status: 'timeout' };
}

export type Part = { type: 'text'; text: string } | { type: 'cite'; id: number };

/** Разобрать ответ на текст и ссылки на источники: «… 1915 году. [1][2]» → текст, [1], [2]. */
export function splitCitations(answer: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
  for (const match of answer.matchAll(/\[(\d{1,2})\]/g)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ type: 'text', text: answer.slice(last, index) });
    parts.push({ type: 'cite', id: Number(match[1]) });
    last = index + match[0].length;
  }
  if (last < answer.length) parts.push({ type: 'text', text: answer.slice(last) });
  return parts;
}

export interface Note { tone: 'info' | 'warn'; text: string }

export function outcomeNote(outcome: Outcome): Note | null {
  switch (outcome) {
    case 'insufficient_evidence':
    case 'no_sources':
      return { tone: 'info', text: 'В доступных документах нет ответа на этот вопрос. Попробуйте переформулировать его или спросить о другом.' };
    case 'citations_failed':
      return { tone: 'warn', text: 'Ответ не удалось подтвердить текстом документов, поэтому он не показан. Ниже — места, где ответ может быть.' };
    default:
      return null;
  }
}

export function retrievalNote(retrieval: RagAnswer['retrieval'] | undefined): string | null {
  if (!retrieval?.degraded?.length) return null;
  return retrieval.degraded.includes('dense')
    ? 'Поиск по смыслу сейчас недоступен — использован поиск по словам, результаты могут быть менее точными.'
    : 'Поиск по словам сейчас недоступен — результаты могут быть менее полными.';
}

export function sourceLabel(source: Pick<RagSource, 'title' | 'document_id' | 'page'>): string {
  const name = source.title || source.document_id;
  return source.page != null ? `${name}, с. ${source.page}` : name;
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function pdfProblem(file: Pick<File, 'type' | 'size' | 'name'>): string | null {
  if (file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) return 'Выберите PDF-файл.';
  if (file.size > MAX_PDF_BYTES) return `Файл слишком большой (${(file.size / 1024 / 1024).toFixed(1)} МБ). Максимум — 50 МБ.`;
  return null;
}
