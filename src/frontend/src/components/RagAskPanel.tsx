import React, { useRef, useState } from 'react';
import {
  askDocuments, outcomeNote, retrievalNote, sourceLabel, splitCitations, MAX_QUESTION,
  type RagAnswer, type RagSource,
} from '../lib/rag';

interface Turn { question: string; answer?: RagAnswer; error?: string }

const EXAMPLES = ['Кто основал супрематизм?', 'Чем отличается темпера от масла?', 'Какие работы Малевича есть в документах?'];

function SourceCard({ source, id }: { source: RagSource; id: string }) {
  return (
    <li id={id} className={`rounded-xl border p-3 text-sm scroll-mt-24 ${source.cited ? 'border-indigo-200 bg-indigo-50/60' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold shrink-0">{source.id}</span>
        <span className="font-medium text-gray-900">{sourceLabel(source)}</span>
        {source.license && <span className="text-xs text-gray-500">· {source.license}</span>}
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{source.content}</p>
    </li>
  );
}

function AnswerBody({ turn, turnIndex }: { turn: Turn; turnIndex: number }) {
  const { answer, error } = turn;
  if (error) return <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">{error}</p>;
  if (!answer) return <p className="text-sm text-gray-500 animate-pulse">Ищу в документах…</p>;

  const note = outcomeNote(answer.outcome);
  const degraded = retrievalNote(answer.retrieval);
  const cardId = (n: number) => `rag-${turnIndex}-source-${n}`;
  return (
    <div className="space-y-4">
      {note ? (
        <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${note.tone === 'warn' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
          {note.text}
        </p>
      ) : (
        <p className="text-gray-900 leading-relaxed whitespace-pre-line">
          {splitCitations(answer.answer).map((part, i) => part.type === 'text'
            ? <React.Fragment key={i}>{part.text}</React.Fragment>
            : answer.sources.some(s => s.id === part.id)
              ? <a key={i} href={`#${cardId(part.id)}`} className="mx-0.5 text-xs font-semibold text-indigo-700 hover:underline align-super" aria-label={`Источник ${part.id}`}>[{part.id}]</a>
              : <span key={i} className="text-xs text-gray-400 align-super">[{part.id}]</span>)}
        </p>
      )}
      {degraded && <p className="text-xs text-amber-700">{degraded}</p>}
      {answer.sources.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            {answer.outcome === 'answered' ? 'Источники' : 'Найденные места'}
          </h4>
          <ul className="space-y-2">{answer.sources.map(s => <SourceCard key={s.id} source={s} id={cardId(s.id)} />)}</ul>
        </div>
      )}
    </div>
  );
}

const RagAskPanel: React.FC<{ canUseCuratorMode: boolean }> = ({ canUseCuratorMode }) => {
  const [question, setQuestion] = useState('');
  const [curatorMode, setCuratorMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function ask(text: string) {
    const query = text.trim();
    if (query.length < 2 || busy) return;
    setBusy(true);
    setQuestion('');
    const index = turns.length;
    setTurns(prev => [...prev, { question: query }]);
    try {
      const answer = await askDocuments(query, { curatorMode: canUseCuratorMode && curatorMode });
      setTurns(prev => prev.map((t, i) => (i === index ? { ...t, answer } : t)));
    } catch (error) {
      setTurns(prev => prev.map((t, i) => (i === index ? { ...t, error: (error as Error).message } : t)));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div>
      <form
        onSubmit={e => { e.preventDefault(); void ask(question); }}
        className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 mb-6"
      >
        <label htmlFor="rag-question" className="sr-only">Вопрос по документам</label>
        <textarea
          id="rag-question"
          ref={inputRef}
          value={question}
          onChange={e => setQuestion(e.target.value.slice(0, MAX_QUESTION))}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); void ask(question); } }}
          rows={3}
          placeholder="Спросите о картинах, художниках, техниках — отвечу только по загруженным документам"
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{question.length}/{MAX_QUESTION}</span>
            {canUseCuratorMode && (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={curatorMode} onChange={e => setCuratorMode(e.target.checked)} />
                Развёрнуто (режим куратора)
              </label>
            )}
          </div>
          <button
            type="submit"
            disabled={busy || question.trim().length < 2}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? 'Ищу…' : 'Спросить'}
          </button>
        </div>
      </form>

      {turns.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-3 text-sm">Например:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLES.map(example => (
              <button key={example} type="button" onClick={() => void ask(example)} disabled={busy}
                className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700">
                {example}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ol className="space-y-6">
          {turns.map((turn, i) => (
            <li key={i} className="space-y-3">
              <p className="font-semibold text-gray-900">{turn.question}</p>
              <AnswerBody turn={turn} turnIndex={i} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RagAskPanel;
