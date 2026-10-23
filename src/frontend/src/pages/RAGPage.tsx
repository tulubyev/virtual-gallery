import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../services/api';
import RagAskPanel from '../components/RagAskPanel';
import RagDocumentsPanel from '../components/RagDocumentsPanel';
import { currentRole, isCurator, isStaff } from '../lib/rag';

type Tab = 'ask' | 'documents';

const RAGPage: React.FC = () => {
  const role = currentRole();
  const staff = isStaff(role);
  const [tab, setTab] = useState<Tab>('ask');
  const [aiUnavailable, setAiUnavailable] = useState(false);

  useEffect(() => {
    fetchWithAuth('/api/ai/health')
      .then(r => r.json())
      .then(data => { if (data.status !== 'connected') setAiUnavailable(true); })
      .catch(() => setAiUnavailable(true));
  }, []);

  const tabs: Array<{ id: Tab; label: string }> = [{ id: 'ask', label: 'Спросить' }, ...(staff ? [{ id: 'documents' as Tab, label: 'Документы' }] : [])];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Вопросы по документам</h1>
          <p className="text-gray-600">
            Ответ собирается только из загруженных документов, с номерами источников. Если в документах ответа нет, так и скажу.
          </p>
        </header>

        {aiUnavailable && (
          <p role="status" className="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 text-sm mb-6">
            ИИ-сервис сейчас недоступен: вопросы и загрузка документов временно не работают.
          </p>
        )}

        {tabs.length > 1 && (
          <div role="tablist" className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 ${tab === t.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {tab === 'ask' || !staff
          ? <RagAskPanel canUseCuratorMode={staff} />
          : <RagDocumentsPanel canPublish={isCurator(role)} />}
      </div>
    </div>
  );
};

export default RAGPage;
