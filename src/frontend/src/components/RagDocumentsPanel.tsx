import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  deleteDocument, formatDate, loadDocuments, pdfProblem, pollTask, uploadDocument,
  type KbDocument,
} from '../lib/rag';

const CATEGORIES = [
  { value: 'auto', label: 'Определить автоматически' },
  { value: 'history', label: 'История искусства' },
  { value: 'technique', label: 'Техники и материалы' },
  { value: 'artist', label: 'Биографии художников' },
  { value: 'period', label: 'Периоды и стили' },
];

type Notice = { tone: 'ok' | 'error' | 'info'; text: string };
const NOTICE_STYLE: Record<Notice['tone'], string> = {
  ok: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-gray-50 border-gray-200 text-gray-700',
};

const RagDocumentsPanel: React.FC<{ canPublish: boolean }> = ({ canPublish }) => {
  const [documents, setDocuments] = useState<KbDocument[] | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [license, setLicense] = useState('');
  const [category, setCategory] = useState('auto');
  const [access, setAccess] = useState<'public' | 'staff'>('staff');
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    try {
      setDocuments(await loadDocuments());
      setListError(null);
    } catch (error) {
      setListError((error as Error).message);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  function choose(selected: File | undefined) {
    if (!selected) return;
    const problem = pdfProblem(selected);
    if (problem) { setNotice({ tone: 'error', text: problem }); return; }
    setNotice(null);
    setFile(selected);
    if (!title) setTitle(selected.name.replace(/\.pdf$/i, ''));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || busy) return;
    setBusy(true);
    setNotice(null);
    setStep('Загрузка файла…');
    try {
      const { taskId } = await uploadDocument({ file, title, access: canPublish ? access : 'staff', license, category });
      const outcome = await pollTask(taskId, { onProgress: (percent, current) => setStep(`${current || 'Обработка'} (${percent}%)`) });
      if (outcome.status === 'completed') {
        setNotice({ tone: 'ok', text: 'Документ проиндексирован — по нему уже можно задавать вопросы.' });
        setFile(null); setTitle(''); setLicense('');
        if (fileInput.current) fileInput.current.value = '';
      } else if (outcome.status === 'failed') {
        setNotice({ tone: 'error', text: `Не удалось обработать документ${outcome.error ? `: ${outcome.error}` : '.'}` });
      } else {
        setNotice({ tone: 'info', text: 'Обработка занимает больше обычного. Список документов обновится, когда она закончится.' });
      }
      await refresh();
    } catch (error) {
      setNotice({ tone: 'error', text: (error as Error).message });
    } finally {
      setBusy(false);
      setStep(null);
    }
  }

  async function remove(doc: KbDocument) {
    if (!window.confirm(`Удалить «${doc.title || doc.document_id}» из базы знаний? Вопросы по нему станут невозможны.`)) return;
    try {
      await deleteDocument(doc.document_id);
      await refresh();
    } catch (error) {
      setNotice({ tone: 'error', text: (error as Error).message });
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Добавить документ</h2>
        <div
          onClick={() => !busy && fileInput.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); choose(e.dataTransfer.files?.[0]); }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400"
        >
          <p className="text-gray-700">{file ? `${file.name} — ${(file.size / 1024 / 1024).toFixed(2)} МБ` : 'Перетащите PDF сюда или нажмите, чтобы выбрать (до 50 МБ)'}</p>
          <input ref={fileInput} type="file" accept="application/pdf,.pdf" className="hidden" onChange={e => choose(e.target.files?.[0])} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm text-gray-700">Название
            <input value={title} onChange={e => setTitle(e.target.value)} maxLength={300} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" />
          </label>
          <label className="text-sm text-gray-700">Лицензия / происхождение
            <input value={license} onChange={e => setLicense(e.target.value)} maxLength={300} placeholder="например, CC0 или «издание музея»" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" />
          </label>
          <label className="text-sm text-gray-700">Категория
            <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white">
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </label>
          <label className="text-sm text-gray-700">Кто увидит документ
            <select value={canPublish ? access : 'staff'} onChange={e => setAccess(e.target.value as 'public' | 'staff')} disabled={!canPublish}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white disabled:bg-gray-50">
              <option value="staff">Только сотрудники</option>
              <option value="public">Все посетители</option>
            </select>
            {!canPublish && <span className="block text-xs text-gray-500 mt-1">Открыть документ посетителям может куратор или администратор.</span>}
          </label>
        </div>
        {access === 'public' && canPublish && (
          <p className="text-xs text-amber-700">Убедитесь, что у вас есть права на публикацию текста: фрагменты будут показываться посетителям.</p>
        )}
        {notice && <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${NOTICE_STYLE[notice.tone]}`}>{notice.text}</p>}
        <button type="submit" disabled={!file || busy} className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {busy ? step || 'Обработка…' : 'Загрузить и проиндексировать'}
        </button>
      </form>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">База знаний</h2>
        {listError ? (
          <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
            {listError} <button type="button" onClick={() => void refresh()} className="underline ml-2">Повторить</button>
          </p>
        ) : documents === null ? (
          <p className="text-sm text-gray-500">Загрузка…</p>
        ) : documents.length === 0 ? (
          <p className="text-sm text-gray-500">Документов пока нет. Загрузите первый PDF — после обработки по нему можно будет задавать вопросы.</p>
        ) : (
          <ul className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100">
            {documents.map(doc => (
              <li key={doc.document_id} className="flex items-start gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{doc.title || doc.document_id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {doc.pages_count ?? '?'} стр. · {doc.chunks_count} фрагментов · обновлён {formatDate(doc.updated_at)}
                    {doc.license ? ` · ${doc.license}` : ''}
                  </p>
                  {doc.summary && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{doc.summary}</p>}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${doc.access === 'public' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {doc.access === 'public' ? 'Для всех' : 'Только сотрудники'}
                </span>
                {canPublish && (
                  <button type="button" onClick={() => void remove(doc)} className="text-xs text-red-600 hover:underline">Удалить</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RagDocumentsPanel;
