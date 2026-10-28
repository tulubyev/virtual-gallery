import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as cards from '../lib/artworkCards';
import {
  BLOCKS, BLOCK_LABEL, Block, CardApiError, CardArtwork, CardStatus, DATING_LABEL, FRAGMENT_STATUS_HINT, FRAGMENT_STATUS_LABEL, Fragment, FullCard,
  Language, PASSPORT_FIELDS, PassportForm, QueueItem, STATUS_LABEL, STATUS_TONE, SourceForm, emptySourceForm, errorText, groupFragments,
  hiddenFromVisitors, passportChanges, passportToForm, sourceFromForm, sourceLine, transitionLabel,
} from '../lib/artworkCards';
import { Badge, Notice, Shell } from '../components/torgi/Shell';

type Flash = { tone: 'good' | 'error' | 'warn'; text: string } | null;

const field = 'mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white';
const primary = 'bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed';
const ghost = 'px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50';
const danger = 'px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-sm hover:bg-red-50 disabled:opacity-50';

// ── Очередь ────────────────────────────────────────────────────────────────────────────────────

const Queue: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<CardStatus | ''>('needs_review');
  const [items, setItems] = useState<QueueItem[] | null>(null);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState('');

  useEffect(() => {
    let alive = true;
    setItems(null); setError('');
    cards.queue(status).then(r => { if (alive) setItems(r.cards); }).catch(e => { if (alive) setError(errorText(e)); });
    return () => { alive = false; };
  }, [status]);

  return (
    <Shell title="Карточки произведений" subtitle="Паспорт, описание и источники. ИИ готовит черновик, утверждает куратор.">
      <div className="flex flex-wrap items-end gap-3 mb-5">
        <label className="text-sm text-gray-700">Статус
          <select value={status} onChange={e => setStatus(e.target.value as CardStatus | '')} className={`${field} w-56`}>
            <option value="">Все</option>
            {(Object.keys(STATUS_LABEL) as CardStatus[]).map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </label>
        <form className="flex items-end gap-2" onSubmit={e => { e.preventDefault(); if (/^\d+$/.test(openId)) navigate(`/cards/${openId}`); }}>
          <label className="text-sm text-gray-700">Открыть по номеру произведения
            <input value={openId} onChange={e => setOpenId(e.target.value)} inputMode="numeric" className={`${field} w-40`} placeholder="№" /></label>
          <button type="submit" className={ghost} disabled={!/^\d+$/.test(openId)}>Открыть</button>
        </form>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      {!error && items === null && <p className="text-gray-500">Загружаю…</p>}
      {items && items.length === 0 && <Notice tone="info">В этом статусе карточек нет.</Notice>}
      {items && items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {items.map(c => (
            <Link key={c.artwork_id} to={`/cards/${c.artwork_id}`} className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-gray-50">
              <span className="text-gray-400 w-12">№ {c.artwork_id}</span>
              <span className="flex-1 min-w-[12rem]"><span className="font-medium">{c.title}</span><span className="text-gray-500"> — {c.artist_name}</span></span>
              <Badge tone={STATUS_TONE[c.card_status]}>{STATUS_LABEL[c.card_status]}</Badge>
              <span className="text-sm text-gray-500">фрагментов: {c.fragments}</span>
              {c.pending > 0 && <Badge tone="amber">не проверено: {c.pending}</Badge>}
              {c.ai_inferred > 0 && <Badge tone="red">без источника: {c.ai_inferred}</Badge>}
            </Link>
          ))}
        </div>
      )}
    </Shell>
  );
};

// ── Паспорт ────────────────────────────────────────────────────────────────────────────────────

const LABELS: Record<string, string> = {
  title_en: 'Название (английский)', medium_en: 'Материал и техника (английский)', attribution_note: 'Атрибуция (примечание)', attribution_note_en: 'Атрибуция (английский)',
  inventory_number: 'Инвентарный номер', dating_text: 'Датировка (как в источнике)', year_from: 'Год с', year_to: 'Год по', dating_certainty: 'Достоверность даты',
  provenance: 'Происхождение', inscriptions: 'Надписи', image_rights_holder: 'Правообладатель изображения', image_rights_note: 'Условия использования изображения',
};

const Passport: React.FC<{ artwork: CardArtwork; onSaved: (a: CardArtwork, note: string) => void; setFlash: (f: Flash) => void }> = ({ artwork, onSaved, setFlash }) => {
  const [form, setForm] = useState<PassportForm>(passportToForm(artwork));
  const [busy, setBusy] = useState(false);
  useEffect(() => setForm(passportToForm(artwork)), [artwork]);
  const set = (k: keyof PassportForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });
  const long = new Set(['provenance', 'inscriptions']);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { changes, error } = passportChanges(form, artwork);
    if (error) { setFlash({ tone: 'error', text: error }); return; }
    if (!changes || Object.keys(changes).length === 0) { setFlash({ tone: 'warn', text: 'Изменений нет.' }); return; }
    setBusy(true);
    try {
      const r = await cards.savePassport(artwork.artwork_id, changes);
      onSaved(r.artwork, 'Паспорт сохранён.');
    } catch (err) { setFlash({ tone: 'error', text: errorText(err) }); } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <h2 className="text-lg font-semibold">Паспорт</h2>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div><dt className="inline text-gray-500">Название: </dt><dd className="inline">{artwork.title}</dd></div>
        <div><dt className="inline text-gray-500">Автор: </dt><dd className="inline">{artwork.artist_name}</dd></div>
        <div><dt className="inline text-gray-500">Год: </dt><dd className="inline">{artwork.year_created ?? '—'}</dd></div>
        <div><dt className="inline text-gray-500">Техника: </dt><dd className="inline">{artwork.medium ?? '—'}</dd></div>
        <div><dt className="inline text-gray-500">Размер: </dt><dd className="inline">{artwork.dimensions ?? '—'}</dd></div>
        <div className="text-gray-500">Основные поля правятся в разделе «Произведения».</div>
      </dl>
      <div className="grid sm:grid-cols-2 gap-4">
        {PASSPORT_FIELDS.map(k => k === 'dating_certainty' ? (
          <label key={k} className="text-sm text-gray-700">{LABELS[k]}
            <select value={form[k]} onChange={set(k)} className={field}>
              <option value="">Не указана</option>
              {Object.entries(DATING_LABEL).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
            </select>
          </label>
        ) : long.has(k) ? (
          <label key={k} className="text-sm text-gray-700 sm:col-span-2">{LABELS[k]}
            <textarea value={form[k]} onChange={set(k)} rows={3} maxLength={5000} className={field} /></label>
        ) : (
          <label key={k} className="text-sm text-gray-700">{LABELS[k]}
            <input value={form[k]} onChange={set(k)} inputMode={k.startsWith('year') ? 'numeric' : undefined} className={field} /></label>
        ))}
      </div>
      <p className="text-xs text-gray-500">Изображение показывается посетителям, только если указан правообладатель. Изменение утверждённой или опубликованной карточки возвращает её на проверку.</p>
      <button type="submit" disabled={busy} className={primary}>{busy ? 'Сохраняю…' : 'Сохранить паспорт'}</button>
    </form>
  );
};

// ── Фрагменты ──────────────────────────────────────────────────────────────────────────────────

const SourcesEditor: React.FC<{ value: SourceForm; onChange: (v: SourceForm) => void }> = ({ value, onChange }) => {
  const set = (k: keyof SourceForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [k]: e.target.value } as SourceForm);
  return (
    <div className="grid sm:grid-cols-3 gap-3 rounded-xl border border-gray-100 p-3">
      <label className="text-xs text-gray-600">Тип источника
        <select value={value.kind} onChange={set('kind')} className={field}>
          <option value="external">Внешний (издание, сайт)</option><option value="document">Документ базы знаний</option><option value="curator">Собрание / куратор</option>
        </select></label>
      <label className="text-xs text-gray-600">Название<input value={value.title} onChange={set('title')} className={field} /></label>
      <label className="text-xs text-gray-600">Адрес<input value={value.url} onChange={set('url')} placeholder="https://…" className={field} /></label>
      <label className="text-xs text-gray-600">Страница<input value={value.page} onChange={set('page')} className={field} /></label>
      <label className="text-xs text-gray-600">Лицензия<input value={value.license} onChange={set('license')} placeholder="CC0, CC BY…" className={field} /></label>
      {value.kind === 'document' && (
        <label className="text-xs text-gray-600">Доступ к документу
          <select value={value.access} onChange={set('access')} className={field}><option value="">—</option><option value="public">Публичный</option><option value="staff">Внутренний</option></select></label>
      )}
      <label className="text-xs text-gray-600 sm:col-span-3">Цитата (до 25 слов)<input value={value.quote} onChange={set('quote')} className={field} /></label>
    </div>
  );
};

const FragmentForm: React.FC<{
  initial?: Fragment; block: Block; language: Language; busy: boolean; onCancel?: () => void;
  onSubmit: (data: { text: string; status: string; confidence: string; sources?: object[] }) => void; setFlash: (f: Flash) => void;
}> = ({ initial, language, busy, onCancel, onSubmit, setFlash }) => {
  const [text, setText] = useState(initial?.text ?? '');
  const [status, setStatus] = useState<string>(initial?.status ?? 'catalogued');
  const [confidence, setConfidence] = useState<string>(initial?.confidence ?? 'established');
  const [source, setSource] = useState<SourceForm>(emptySourceForm());
  const [withSource, setWithSource] = useState(false);
  const locked = initial?.status === 'from_document';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    let sources: object[] | undefined;
    if (withSource) {
      const r = sourceFromForm(source);
      if (r.error) { setFlash({ tone: 'error', text: r.error }); return; }
      sources = [...(initial?.sources ?? []), r.source!];
    }
    onSubmit({ text: text.trim(), status, confidence, ...(sources ? { sources } : {}) });
    if (!initial) { setText(''); setWithSource(false); setSource(emptySourceForm()); }
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl bg-gray-50 p-3">
      <label className="text-sm text-gray-700 block">Текст ({language === 'ru' ? 'русский' : 'английский'})
        <textarea required value={text} onChange={e => setText(e.target.value)} rows={4} maxLength={5000} disabled={locked} className={field} /></label>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm text-gray-700">Происхождение текста
          <select value={status} onChange={e => setStatus(e.target.value)} disabled={locked} className={field}>
            {(['catalogued', 'visible', 'ai_inferred'] as const).map(s => <option key={s} value={s}>{FRAGMENT_STATUS_LABEL[s]}</option>)}
            {locked && <option value="from_document">{FRAGMENT_STATUS_LABEL.from_document}</option>}
          </select>
          <span className="text-xs text-gray-500">{FRAGMENT_STATUS_HINT[status as keyof typeof FRAGMENT_STATUS_HINT]}</span></label>
        <label className="text-sm text-gray-700">Уверенность
          <select value={confidence} onChange={e => setConfidence(e.target.value)} className={field}>
            <option value="established">Установлено</option><option value="uncertain">Предположительно (будет пометка для посетителей)</option></select></label>
      </div>
      {!locked && (
        <>
          <label className="text-sm text-gray-700 flex items-center gap-2"><input type="checkbox" checked={withSource} onChange={e => setWithSource(e.target.checked)} />
            Добавить источник{initial ? ' к существующим' : ''} (без источника фрагмент будет записан на вас)</label>
          {withSource && <SourcesEditor value={source} onChange={setSource} />}
        </>
      )}
      <div className="flex gap-2">
        <button type="submit" disabled={busy || !text.trim()} className={primary}>{initial ? 'Сохранить' : 'Добавить фрагмент'}</button>
        {onCancel && <button type="button" onClick={onCancel} className={ghost}>Отмена</button>}
      </div>
    </form>
  );
};

const FragmentItem: React.FC<{
  f: Fragment; isCurator: boolean; busy: boolean; setFlash: (f: Flash) => void;
  onSave: (f: Fragment, data: object) => void; onApprove: (f: Fragment) => void; onDelete: (f: Fragment) => void;
}> = ({ f, isCurator, busy, setFlash, onSave, onApprove, onDelete }) => {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return <FragmentForm initial={f} block={f.block} language={f.language} busy={busy} setFlash={setFlash} onCancel={() => setEditing(false)}
      onSubmit={data => { onSave(f, data); setEditing(false); }} />;
  }
  return (
    <div id={`fragment-${f.fragment_id}`} className="rounded-xl border border-gray-100 p-3 space-y-2">
      <p className="whitespace-pre-wrap">{f.text}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge tone={f.status === 'ai_inferred' ? 'red' : f.status === 'from_document' ? 'indigo' : 'gray'}>{FRAGMENT_STATUS_LABEL[f.status]}</Badge>
        {f.confidence === 'uncertain' && <Badge tone="amber">предположительно</Badge>}
        {f.approved_at ? <Badge tone="green">утверждён</Badge> : f.status !== 'ai_inferred' ? <Badge tone="amber">не проверен</Badge> : null}
        {hiddenFromVisitors(f) && <Badge tone="red">посетителям не показывается: внутренний документ</Badge>}
        <span className="text-gray-500">{f.sources.length ? `Источники: ${f.sources.map(sourceLine).join('; ')}` : 'Источников нет'}</span>
        <span className="text-gray-400">версия {f.version}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={ghost} onClick={() => setEditing(true)} disabled={busy}>Править</button>
        {isCurator && !f.approved_at && f.status !== 'ai_inferred' && <button type="button" className={ghost} onClick={() => onApprove(f)} disabled={busy}>Утвердить</button>}
        {isCurator && <button type="button" className={danger} onClick={() => { if (window.confirm('Удалить фрагмент?')) onDelete(f); }} disabled={busy}>Удалить</button>}
      </div>
    </div>
  );
};

// ── Карточка ───────────────────────────────────────────────────────────────────────────────────

const Editor: React.FC<{ id: number; isCurator: boolean }> = ({ id, isCurator }) => {
  const [card, setCard] = useState<FullCard | null>(null);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash>(null);
  const [problems, setProblems] = useState<cards.Problem[]>([]);
  const [lang, setLang] = useState<Language>('ru');
  const [busy, setBusy] = useState(false);
  const [approveAll, setApproveAll] = useState(true);

  const load = useCallback(async () => {
    try { const r = await cards.getCard(id); setCard(r.card); setProblems(r.card.problems); setError(''); }
    catch (e) { setError(errorText(e)); }
  }, [id]);
  useEffect(() => { setCard(null); setFlash(null); load(); }, [load]);

  const run = useCallback(async (work: () => Promise<{ warnings?: string[] } | void | unknown>, success: string) => {
    setBusy(true);
    try {
      const r = await work() as { warnings?: string[] } | undefined;
      const warnings = r && Array.isArray(r.warnings) ? r.warnings : [];
      setFlash(warnings.length ? { tone: 'warn', text: `${success} ${warnings.join(' ')}` } : { tone: 'good', text: success });
      await load();
    } catch (e) {
      setFlash({ tone: 'error', text: errorText(e) });
      if (e instanceof CardApiError && e.problems.length) setProblems(e.problems);
    } finally { setBusy(false); }
  }, [load]);

  if (error) return <Shell title={`Карточка № ${id}`} back={<Link to="/cards" className="text-indigo-600 hover:underline">← К очереди</Link>}><Notice tone="error">{error}</Notice></Shell>;
  if (!card) return <Shell title={`Карточка № ${id}`}><p className="text-gray-500">Загружаю…</p></Shell>;

  const a = card.artwork;
  const grouped = groupFragments(card.fragments, lang);
  const ruCount = card.fragments.filter(f => f.language === 'ru').length;
  const enCount = card.fragments.filter(f => f.language === 'en').length;
  const readonly = a.card_status === 'archived';

  return (
    <Shell
      title={a.title}
      back={<Link to="/cards" className="text-indigo-600 hover:underline">← К очереди карточек</Link>}
      subtitle={<span className="flex flex-wrap items-center gap-3">{a.artist_name}<Badge tone={STATUS_TONE[a.card_status]}>{STATUS_LABEL[a.card_status]}</Badge>
        <Link to={`/artworks/${a.artwork_id}`} className="text-sm text-indigo-600 hover:underline">Страница произведения</Link>
        {a.card_status === 'published' && <Link to={`/artworks/${a.artwork_id}/card`} className="text-sm text-indigo-600 hover:underline">Карточка для посетителей</Link>}</span>}
    >
      <div className="space-y-6">
        {flash && <Notice tone={flash.tone === 'warn' ? 'warn' : flash.tone}>{flash.text}</Notice>}

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-semibold">Состояние</h2>
          {card.allowed_transitions.length === 0
            ? <p className="text-sm text-gray-600">Для вашей роли в этом статусе переходов нет.</p>
            : (
              <div className="flex flex-wrap items-center gap-2">
                {card.allowed_transitions.map(to => (
                  <button key={to} type="button" disabled={busy} className={to === 'approved' || to === 'published' ? primary : ghost}
                    onClick={() => run(() => cards.changeStatus(id, to, to === 'approved' && approveAll), `Статус: ${STATUS_LABEL[to]}.`)}>
                    {transitionLabel(a.card_status, to)}
                  </button>
                ))}
                {card.allowed_transitions.includes('approved') && (
                  <label className="text-sm text-gray-700 flex items-center gap-2"><input type="checkbox" checked={approveAll} onChange={e => setApproveAll(e.target.checked)} />
                    утвердить сразу все непроверенные фрагменты</label>
                )}
              </div>
            )}
          {problems.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-amber-900">Что мешает утверждению и публикации:</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-900 list-disc pl-5">
                {problems.map((p, i) => (
                  <li key={i}>{p.message}{p.fragment_id ? <> — <a className="underline" href={`#fragment-${p.fragment_id}`}>к фрагменту</a></> : null}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-2">Фрагменты утверждает куратор: кнопка «Утвердить» у фрагмента или флажок выше.</p>
            </div>
          ) : <p className="text-sm text-green-700">Замечаний нет: карточка готова к утверждению и публикации.</p>}
          {a.card_reviewed_at && <p className="text-xs text-gray-500">Последнее утверждение: {new Date(a.card_reviewed_at).toLocaleString('ru-RU')}</p>}
        </section>

        <Passport artwork={a} setFlash={setFlash} onSaved={(art, note) => { setFlash({ tone: 'good', text: note }); setCard({ ...card, artwork: art }); load(); }} />

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold mr-auto">Текст карточки</h2>
            {(['ru', 'en'] as const).map(l => (
              <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
                className={`px-3 py-1.5 rounded-lg text-sm border ${lang === l ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                {l === 'ru' ? `Русский (${ruCount})` : `English (${enCount})`}
              </button>
            ))}
          </div>
          {lang === 'en' && <Notice tone="info">Английский текст — перевод утверждённого русского фрагмента с теми же источниками; утверждается отдельно. Если английских фрагментов нет, посетители видят русские поля паспорта.</Notice>}
          {BLOCKS.map(block => (
            <div key={block} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="font-semibold">{BLOCK_LABEL[block]}</h3>
              {grouped[block].length === 0 && <p className="text-sm text-gray-500">Фрагментов нет.</p>}
              {grouped[block].map(f => (
                <FragmentItem key={f.fragment_id} f={f} isCurator={isCurator} busy={busy} setFlash={setFlash}
                  onSave={(fr, data) => run(() => cards.updateFragment(id, fr.fragment_id, data), 'Фрагмент сохранён.')}
                  onApprove={fr => run(() => cards.approveFragment(id, fr.fragment_id), 'Фрагмент утверждён.')}
                  onDelete={fr => run(() => cards.deleteFragment(id, fr.fragment_id), 'Фрагмент удалён.')} />
              ))}
              {!readonly && (
                <details>
                  <summary className="cursor-pointer text-sm text-indigo-600">Добавить фрагмент</summary>
                  <div className="mt-3">
                    <FragmentForm block={block} language={lang} busy={busy} setFlash={setFlash}
                      onSubmit={data => run(() => cards.createFragment(id, { block, language: lang, position: grouped[block].length, ...data }), 'Фрагмент добавлен.')} />
                  </div>
                </details>
              )}
            </div>
          ))}
        </section>
      </div>
    </Shell>
  );
};

const CardsAdminPage: React.FC<{ role: string }> = ({ role }) => {
  const { id } = useParams();
  const numeric = id && /^\d+$/.test(id) ? Number(id) : null;
  if (id && numeric === null) return <Shell title="Карточка не найдена"><Link to="/cards" className="text-indigo-600 hover:underline">К очереди карточек</Link></Shell>;
  return numeric ? <Editor id={numeric} isCurator={role === 'curator' || role === 'admin'} /> : <Queue />;
};

export default CardsAdminPage;
