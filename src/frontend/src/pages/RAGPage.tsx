import React, { useState, useRef, useCallback, useEffect } from 'react';

interface RecentDoc {
  name: string;
  daysAgo: string;
}

const CATEGORIES = [
  { value: 'auto',     label: 'Автоопределение (AI)' },
  { value: 'history',  label: 'История искусства' },
  { value: 'technique',label: 'Техники и материалы' },
  { value: 'artist',   label: 'Биографии художников' },
  { value: 'period',   label: 'Периоды и стили' },
];

const INITIAL_RECENT: RecentDoc[] = [
  { name: 'Импрессионизм_история.pdf', daysAgo: '2 дня назад' },
  { name: 'Техники_масляной_живописи.pdf', daysAgo: '5 дней назад' },
];

const RAGPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('auto');
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recentDocs, setRecentDocs] = useState<RecentDoc[]>(INITIAL_RECENT);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/ai/health')
      .then(r => r.json())
      .then(data => { if (data.status !== 'connected') setAiUnavailable(true); })
      .catch(() => setAiUnavailable(true));
  }, []);

  function showToast(type: 'success' | 'error' | 'warning', text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }

  const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50 MB

  function handleFileSelect(file: File) {
    if (file.type !== 'application/pdf') {
      showToast('error', 'Пожалуйста, выберите PDF файл');
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      showToast('error', `Файл слишком большой (${(file.size / 1024 / 1024).toFixed(1)} МБ). Максимум — 50 МБ.`);
      return;
    }
    setSelectedFile(file);
  }

  function clearSelection() {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  async function processPdf() {
    if (!selectedFile) {
      showToast('warning', 'Пожалуйста, выберите PDF файл');
      return;
    }
    setProcessing(true);
    setUploadProgress(0);
    try {
      const documentId = 'doc_' + Date.now();

      const formData = new FormData();
      formData.append('pdf', selectedFile);
      formData.append('documentId', documentId);
      formData.append('category', category);

      const data = await new Promise<Record<string, string>>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/ai/process-pdf');

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          try { resolve(JSON.parse(xhr.responseText)); }
          catch { resolve({ __status: String(xhr.status) }); }
        };
        xhr.onerror = () => reject(new Error('network'));
        xhr.send(formData);
      });

      if (!data.__status || Number(data.__status) < 400) {
        showToast('success', 'Документ успешно отправлен на обработку! ID: ' + documentId);
        setRecentDocs(prev => [{ name: selectedFile.name, daysAgo: 'Только что' }, ...prev.slice(0, 4)]);
        clearSelection();
      } else {
        const hint = data.hint ? ' Подсказка: ' + data.hint : '';
        showToast('error', 'Ошибка: ' + (data.error || 'Неизвестная ошибка') + hint);
      }
    } catch {
      showToast('warning', 'AI/ML сервис недоступен. В демо-режиме документы не обрабатываются.');
    } finally {
      setProcessing(false);
      setUploadProgress(0);
    }
  }

  const toastColors: Record<string, string> = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    warning: 'bg-amber-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-xl ${toastColors[toast.type]} transition-all`}>
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : '⚠'}</span>
          <p className="text-sm font-medium">{toast.text}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>☁</span>
              Управление знаниями
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">RAG</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Загрузка и индексация документов для базы знаний AI-ассистента
            </p>
          </div>

          {/* AI unavailable notice */}
          {aiUnavailable && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 text-amber-800">
              <span className="text-xl mt-0.5">⚠️</span>
              <div>
                <p className="font-semibold text-sm mb-1">AI/ML сервис недоступен</p>
                <p className="text-xs leading-relaxed">
                  Сервис обработки документов сейчас не работает. Загрузка и индексация PDF-файлов временно отключены.
                  Пожалуйста, убедитесь, что AI/ML сервис запущен, или попробуйте позже.
                </p>
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📄</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Обработка документов</h2>
            </div>

            <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-gray-100">
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${
                  selectedFile
                    ? 'border-green-400 bg-green-50'
                    : isDragging
                    ? 'border-green-400 bg-green-50 cursor-copy'
                    : 'border-gray-300 hover:border-green-400 cursor-pointer'
                }`}
              >
                {selectedFile ? (
                  <>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">✅</span>
                    </div>
                    <p className="text-green-700 font-medium mb-2">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      onClick={e => { e.stopPropagation(); clearSelection(); }}
                      className="mt-3 text-sm text-red-600 hover:text-red-700 underline"
                    >
                      Удалить
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">📎</span>
                    </div>
                    <p className="text-gray-600 mb-2">Перетащите PDF сюда</p>
                    <p className="text-sm text-gray-500">или нажмите для выбора файла</p>
                    <p className="text-xs text-gray-400 mt-2">PDF до 50MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={e => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
                />
              </div>

              {/* Category */}
              <div className="space-y-3 mb-6">
                <label className="block text-sm font-medium text-gray-700">Категория документа</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Upload progress bar */}
              {processing && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Загрузка файла…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              {processing && uploadProgress === 100 && (
                <div className="mb-4 text-xs text-gray-500 flex items-center gap-2">
                  <span className="animate-spin inline-block">⏳</span>
                  <span>Файл загружен. AI обрабатывает документ…</span>
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={processPdf}
                disabled={processing || !selectedFile}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{processing ? '⏳' : '✅'}</span>
                <span>{processing ? (uploadProgress < 100 ? `Загрузка ${uploadProgress}%…` : 'Обработка AI…') : 'Обработать документ'}</span>
              </button>

              {/* Recent Documents */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Недавние документы</h4>
                <div className="space-y-2">
                  {recentDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-green-600">📄</span>
                      <span className="text-sm text-gray-700 flex-1 truncate">{doc.name}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{doc.daysAgo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAGPage;
