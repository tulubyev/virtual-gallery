import React, { useState, useRef, useCallback } from 'react';

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
  const [recentDocs, setRecentDocs] = useState<RecentDoc[]>(INITIAL_RECENT);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function showToast(type: 'success' | 'error' | 'warning', text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }

  function handleFileSelect(file: File) {
    if (file.type !== 'application/pdf') {
      showToast('error', 'Пожалуйста, выберите PDF файл');
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
    try {
      const documentId = 'doc_' + Date.now();

      const formData = new FormData();
      formData.append('pdf', selectedFile);
      formData.append('documentId', documentId);
      formData.append('category', category);

      const res = await fetch('/api/ai/process-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
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

              {/* Process Button */}
              <button
                onClick={processPdf}
                disabled={processing || !selectedFile}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{processing ? '⏳' : '✅'}</span>
                <span>{processing ? 'Обработка...' : 'Обработать документ'}</span>
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
