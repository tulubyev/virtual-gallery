import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AUCTION_STATUS, LOT_STATE, OUTCOME_TEXT, formatKop, formatMoment } from '../lib/bidding';
import * as admin from '../lib/biddingAdmin';
import { KIND_LABEL, REGISTRATION_STATUS, REJECT_REASON, moscowToIso } from '../lib/biddingAdmin';
import { Badge, Notice, Shell } from '../components/torgi/Shell';

type Flash = { tone: 'good' | 'error'; text: string } | null;

const field = 'mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white';
const primary = 'bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed';
const ghost = 'px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50';

function useAction(setFlash: (f: Flash) => void) {
  return useCallback(async (work: () => Promise<unknown>, success: string, after?: () => Promise<unknown> | void) => {
    try { await work(); setFlash({ tone: 'good', text: success }); await after?.(); } catch (e) { setFlash({ tone: 'error', text: (e as Error).message }); }
  }, [setFlash]);
}

// ── Новый аукцион ──────────────────────────────────────────────────────────────────────────────

const NewAuctionForm: React.FC<{ onCreated: (id: number) => void; setFlash: (f: Flash) => void }> = ({ onCreated, setFlash }) => {
  const [v, setV] = useState({ title: '', slug: '', description: '', notice_days: '30', bidding_opens_at: '', first_close_at: '', hard_close_at: '', registration_closes_at: '', min_bidders: '2' });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const opens = moscowToIso(v.bidding_opens_at), first = moscowToIso(v.first_close_at), hard = moscowToIso(v.hard_close_at);
    if (!opens || !first || !hard) { setFlash({ tone: 'error', text: 'Укажите даты открытия, закрытия первого лота и предельного закрытия.' }); return; }
    setBusy(true);
    try {
      const { auction_id } = await admin.createAuction({
        title: v.title.trim(), slug: v.slug.trim(), description: v.description.trim() || undefined, notice_days: Number(v.notice_days),
        bidding_opens_at: opens, first_close_at: first, hard_close_at: hard, min_bidders: Number(v.min_bidders),
        ...(v.registration_closes_at ? { registration_closes_at: moscowToIso(v.registration_closes_at) } : {}),
      });
      setFlash({ tone: 'good', text: 'Черновик создан. Добавьте лоты и объявите аукцион.' });
      onCreated(auction_id);
    } catch (err) { setFlash({ tone: 'error', text: (err as Error).message }); } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <h2 className="text-lg font-semibold">Новый аукцион</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-sm text-gray-700">Название<input required value={v.title} onChange={set('title')} className={field} /></label>
        <label className="text-sm text-gray-700">Адрес страницы (латиница, цифры, дефис)<input required value={v.slug} onChange={set('slug')} pattern="[a-z0-9][a-z0-9\-]{1,78}" placeholder="spring-2027" className={field} /></label>
        <label className="text-sm text-gray-700 sm:col-span-2">Описание<textarea value={v.description} onChange={set('description')} rows={2} className={field} /></label>
        <label className="text-sm text-gray-700">Открытие торгов (МСК)<input required type="datetime-local" value={v.bidding_opens_at} onChange={set('bidding_opens_at')} className={field} /></label>
        <label className="text-sm text-gray-700">Закрытие первого лота (МСК)<input required type="datetime-local" value={v.first_close_at} onChange={set('first_close_at')} className={field} /></label>
        <label className="text-sm text-gray-700">Предельное закрытие — после него продлений нет (МСК)<input required type="datetime-local" value={v.hard_close_at} onChange={set('hard_close_at')} className={field} /></label>
        <label className="text-sm text-gray-700">Приём заявок до (МСК, необязательно)<input type="datetime-local" value={v.registration_closes_at} onChange={set('registration_closes_at')} className={field} /></label>
        <label className="text-sm text-gray-700">Срок извещения, дней до открытия<input required type="number" min={0} max={365} value={v.notice_days} onChange={set('notice_days')} className={field} />
          <span className="text-xs text-gray-500">30 по ст. 448 ГК; другой срок — только по решению юриста.</span></label>
        <label className="text-sm text-gray-700">Минимум участников по лоту<input required type="number" min={1} max={100} value={v.min_bidders} onChange={set('min_bidders')} className={field} />
          <span className="text-xs text-gray-500">Если ставки сделал меньше участников, лот не продаётся (ст. 447 ГК).</span></label>
      </div>
      <button type="submit" disabled={busy} className={primary}>{busy ? 'Создаю…' : 'Создать черновик'}</button>
    </form>
  );
};

// ── Лоты ───────────────────────────────────────────────────────────────────────────────────────

const AddLotForm: React.FC<{ auctionId: number; onAdded: () => void; setFlash: (f: Flash) => void }> = ({ auctionId, onAdded, setFlash }) => {
  const [v, setV] = useState({ title: '', artist_name: '', artwork_id: '', start: '', reserve: '', low: '', high: '', seller: '' });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await admin.addLot(auctionId, {
        start_price_rub: v.start.replace(',', '.'),
        ...(v.title.trim() ? { title: v.title.trim() } : {}), ...(v.artist_name.trim() ? { artist_name: v.artist_name.trim() } : {}),
        ...(v.artwork_id ? { artwork_id: Number(v.artwork_id) } : {}), ...(v.reserve ? { reserve_rub: v.reserve.replace(',', '.') } : {}),
        ...(v.low ? { estimate_low_rub: v.low.replace(',', '.') } : {}), ...(v.high ? { estimate_high_rub: v.high.replace(',', '.') } : {}),
        ...(v.seller ? { seller_user_id: Number(v.seller) } : {}),
      });
      setFlash({ tone: 'good', text: 'Лот добавлен.' });
      setV({ title: '', artist_name: '', artwork_id: '', start: '', reserve: '', low: '', high: '', seller: '' });
      onAdded();
    } catch (err) { setFlash({ tone: 'error', text: (err as Error).message }); } finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
      <h4 className="font-medium">Добавить лот</h4>
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="text-sm text-gray-700">Номер произведения в каталоге<input value={v.artwork_id} onChange={set('artwork_id')} inputMode="numeric" className={field} placeholder="необязательно" /></label>
        <label className="text-sm text-gray-700">Название (если нет произведения)<input value={v.title} onChange={set('title')} className={field} /></label>
        <label className="text-sm text-gray-700">Автор<input value={v.artist_name} onChange={set('artist_name')} className={field} /></label>
        <label className="text-sm text-gray-700">Стартовая цена, ₽<input required value={v.start} onChange={set('start')} inputMode="decimal" className={field} /></label>
        <label className="text-sm text-gray-700">Резерв, ₽ (скрытый)<input value={v.reserve} onChange={set('reserve')} inputMode="decimal" className={field} /></label>
        <label className="text-sm text-gray-700">Номер пользователя-продавца<input value={v.seller} onChange={set('seller')} inputMode="numeric" className={field} /></label>
        <label className="text-sm text-gray-700">Оценка от, ₽<input value={v.low} onChange={set('low')} inputMode="decimal" className={field} /></label>
        <label className="text-sm text-gray-700">Оценка до, ₽<input value={v.high} onChange={set('high')} inputMode="decimal" className={field} /></label>
      </div>
      <button type="submit" disabled={busy || !v.start.trim()} className={primary}>{busy ? 'Добавляю…' : 'Добавить лот'}</button>
    </form>
  );
};

const LotBids: React.FC<{ lotId: number; lotOpen: boolean; onChanged: () => void; setFlash: (f: Flash) => void }> = ({ lotId, lotOpen, onChanged, setFlash }) => {
  const [bids, setBids] = useState<admin.AdminBid[] | null>(null);
  const [chain, setChain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const run = useAction(setFlash);
  const load = useCallback(() => admin.lotBids(lotId).then(d => setBids(d.bids)).catch(e => setError(e.message)), [lotId]);
  useEffect(() => { void load(); }, [load]);
  const annul = (bid: admin.AdminBid) => {
    const reason = window.prompt(`Причина аннулирования ставки № ${bid.bid_id} (${bid.username}, ${formatKop(bid.max_kop)}). Её увидит журнал, участник — нет:`);
    if (reason && reason.trim()) void run(() => admin.annulBid(bid.bid_id, reason.trim()), 'Ставка аннулирована, цена и лидер пересчитаны.', async () => { await load(); onChanged(); });
  };
  async function verify() {
    try {
      const r = await admin.verifyChain(lotId);
      setChain(r.ok ? `Журнал цел: проверено записей — ${r.checked}.` : `Журнал нарушен: первое расхождение — запись № ${r.first_bad_event}.`);
    } catch (e) { setChain((e as Error).message); }
  }
  if (error) return <Notice tone="error">{error}</Notice>;
  if (!bids) return <p className="text-sm text-gray-500">Загрузка…</p>;
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-3"><button type="button" onClick={verify} className={ghost}>Проверить журнал</button>{chain && <span className="text-sm">{chain}</span>}</div>
      {bids.length === 0 ? <p className="text-sm text-gray-500">Ставок не было.</p> : (
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead><tr className="text-left text-gray-500"><th className="py-1 pr-3">Время (МСК)</th><th className="pr-3">Участник</th><th className="pr-3">Максимум</th><th className="pr-3">Цена после</th><th className="pr-3">Итог</th><th className="pr-3">IP</th><th></th></tr></thead>
          <tbody>{bids.map(b => (
            <tr key={b.bid_id} className={`border-t border-gray-100 ${b.accepted && !b.annulled ? '' : 'text-gray-400'} ${b.annulled ? 'line-through' : ''}`}>
              <td className="py-1 pr-3">{new Date(b.created_at).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</td>
              <td className="pr-3">№{b.user_id} {b.username}</td><td className="pr-3">{formatKop(b.max_kop)}</td><td className="pr-3">{formatKop(b.price_after_kop)}</td>
              <td className="pr-3">{b.accepted ? (b.became_leader ? 'принята, лидер' : 'принята') : `отказ: ${REJECT_REASON[b.reject_reason ?? ''] ?? b.reject_reason}`}{b.extended_to ? ', продление' : ''}{b.annulled ? ` · аннулирована: ${b.annul_reason}` : ''}</td><td className="pr-3">{b.ip}</td>
              <td>{lotOpen && b.accepted && !b.annulled && <button type="button" className={`${ghost} text-red-700 no-underline`} onClick={() => annul(b)}>Аннулировать</button>}</td>
            </tr>))}</tbody>
        </table></div>
      )}
    </div>
  );
};

const LotsTable: React.FC<{ lots: admin.AdminLot[]; draft: boolean; onChanged: () => void; setFlash: (f: Flash) => void }> = ({ lots, onChanged, setFlash }) => {
  const [open, setOpen] = useState<number | null>(null);
  const run = useAction(setFlash);
  const settle = (lot: admin.AdminLot, to: 'paid' | 'defaulted' | 'handed_over' | 'settled') => {
    if (to === 'defaulted') {
      const reason = window.prompt(`Лот ${lot.lot_no} не оплачен. Причина (обязательно, попадёт в журнал):`);
      if (reason && reason.trim()) void run(() => admin.setLotSettlement(lot.lot_id, to, reason.trim()), 'Лот отмечен как неоплаченный.', onChanged);
      return;
    }
    const text = { paid: 'оплачен', handed_over: 'передан покупателю', settled: 'расчёты по нему завершены' }[to];
    if (window.confirm(`Отметить: лот ${lot.lot_no} — ${text}? Отметку нельзя отменить.`)) void run(() => admin.setLotSettlement(lot.lot_id, to), 'Отметка сохранена.', onChanged);
  };
  const withdraw = (lot: admin.AdminLot) => {
    const reason = window.prompt(`Причина снятия лота ${lot.lot_no} (обязательно):`);
    if (reason && reason.trim()) void run(() => admin.withdrawLot(lot.lot_id, reason.trim()), 'Лот снят с торгов.', onChanged);
  };
  if (lots.length === 0) return <p className="text-sm text-gray-500">Лотов пока нет.</p>;
  return (
    <ul className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100">
      {lots.map(l => (
        <li key={l.lot_id} className="p-4">
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-[12rem]">
              <p className="font-medium">№{l.lot_no}. {l.snapshot.title || 'Без названия'}{l.snapshot.artist_name ? `, ${l.snapshot.artist_name}` : ''}</p>
              <p className="text-xs text-gray-500">
                старт {formatKop(l.start_price_kop)}{l.reserve_kop !== null && <> · резерв {formatKop(l.reserve_kop)}</>} · ставок {l.bid_count}
                {l.bid_count > 0 && <> · цена {formatKop(l.current_price_kop)}</>}{l.ends_at && <> · конец {formatMoment(l.ends_at)}</>}
              </p>
            </div>
            <Badge tone={l.state === 'open' ? 'green' : ['withdrawn', 'defaulted'].includes(l.state) ? 'red' : 'gray'}>{admin.SETTLEMENT_LABEL[l.state] ?? (l.close_outcome ? OUTCOME_TEXT[l.close_outcome] : LOT_STATE[l.state] ?? l.state)}</Badge>
            <button type="button" onClick={() => setOpen(open === l.lot_id ? null : l.lot_id)} className={ghost}>Ставки</button>
            {['approved', 'open'].includes(l.state) && <button type="button" onClick={() => withdraw(l)} className={`${ghost} text-red-700`}>Снять</button>}
            {l.state === 'sold_awaiting_payment' && <>
              <button type="button" onClick={() => settle(l, 'paid')} className={ghost}>Оплачен</button>
              <button type="button" onClick={() => settle(l, 'defaulted')} className={`${ghost} text-red-700`}>Не оплачен</button>
            </>}
            {l.state === 'paid' && <button type="button" onClick={() => settle(l, 'handed_over')} className={ghost}>Передан покупателю</button>}
            {l.state === 'handed_over' && <button type="button" onClick={() => settle(l, 'settled')} className={ghost}>Расчёты завершены</button>}
          </div>
          {l.winner_user_id !== null && ['sold_awaiting_payment', 'paid', 'handed_over', 'settled', 'defaulted'].includes(l.state) && (
            <p className="mt-1 text-xs text-gray-600">Победитель: участник № {l.winner_pseudonym ?? '—'}, {l.winner_name ?? `пользователь ${l.winner_user_id}`}{l.winner_phone ? `, ${l.winner_phone}` : ''} · молоток {formatKop(l.hammer_kop)}</p>
          )}
          {open === l.lot_id && <LotBids lotId={l.lot_id} lotOpen={l.state === 'open'} onChanged={onChanged} setFlash={setFlash} />}
        </li>
      ))}
    </ul>
  );
};

// ── Участники ──────────────────────────────────────────────────────────────────────────────────

const Registrations: React.FC<{ auctionId: number; setFlash: (f: Flash) => void }> = ({ auctionId, setFlash }) => {
  const [rows, setRows] = useState<admin.AdminRegistration[] | null>(null);
  const [limits, setLimits] = useState<Record<number, string>>({});
  const run = useAction(setFlash);
  const load = useCallback(() => admin.registrations(auctionId).then(d => setRows(d.registrations)).catch(e => setFlash({ tone: 'error', text: e.message })), [auctionId, setFlash]);
  useEffect(() => { void load(); }, [load]);
  if (!rows) return <p className="text-sm text-gray-500">Загрузка…</p>;
  if (rows.length === 0) return <p className="text-sm text-gray-500">Заявок пока нет.</p>;
  return (
    <ul className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100">
      {rows.map(r => (
        <li key={r.user_id} className="p-4 space-y-2">
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-[12rem]">
              <p className="font-medium">{r.full_name} <span className="text-xs text-gray-500">№{r.user_id} · {r.email}</span></p>
              <p className="text-xs text-gray-500">{KIND_LABEL[r.kind] ?? r.kind} · {r.phone} · правила приняты {formatMoment(r.rules_accepted_at)}</p>
            </div>
            <Badge tone={r.kyc_status === 'approved' ? 'green' : r.kyc_status === 'rejected' ? 'red' : 'amber'}>личность: {r.kyc_status === 'approved' ? 'проверена' : r.kyc_status === 'rejected' ? 'отклонена' : 'не проверена'}</Badge>
            <Badge tone={r.status === 'active' ? 'green' : r.status === 'rejected' ? 'red' : 'indigo'}>{REGISTRATION_STATUS[r.status] ?? r.status}{r.pseudonym_no ? ` · № ${r.pseudonym_no}` : ''}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {r.kyc_status !== 'approved' && <button type="button" className={ghost} onClick={() => run(() => admin.setKyc(r.user_id, 'approved'), 'Личность подтверждена.', load)}>Подтвердить личность</button>}
            {r.kyc_status === 'pending' && <button type="button" className={`${ghost} text-red-700`} onClick={() => { const note = window.prompt('Причина отказа (увидит только организатор):') ?? undefined; void run(() => admin.setKyc(r.user_id, 'rejected', note), 'Участник отклонён.', load); }}>Отклонить личность</button>}
            <label className="text-sm text-gray-700 flex items-center gap-2">Лимит, ₽
              <input value={limits[r.user_id] ?? (r.limit_kop ? String(r.limit_kop / 100) : '')} onChange={e => setLimits({ ...limits, [r.user_id]: e.target.value })} inputMode="decimal" className="w-32 rounded-lg border border-gray-200 px-2 py-1" />
            </label>
            <button type="button" className={ghost} disabled={r.kyc_status !== 'approved'}
              onClick={() => { const rub = parseFloat((limits[r.user_id] ?? String(r.limit_kop / 100)).replace(/\s/g, '').replace(',', '.')); if (!(rub > 0)) { setFlash({ tone: 'error', text: 'Укажите лимит ставок в рублях.' }); return; } void run(() => admin.decideRegistration(auctionId, r.user_id, true, rub), r.status === 'active' ? 'Лимит обновлён.' : 'Участник допущен.', load); }}>
              {r.status === 'active' ? 'Изменить лимит' : 'Допустить'}
            </button>
            {r.status !== 'rejected' && <button type="button" className={`${ghost} text-red-700`} onClick={() => { const reason = window.prompt('Причина отказа:') ?? undefined; void run(() => admin.decideRegistration(auctionId, r.user_id, false, undefined, reason), 'Заявка отклонена.', load); }}>Отклонить заявку</button>}
          </div>
          {r.kyc_status !== 'approved' && <p className="text-xs text-gray-500">Допустить можно только после подтверждения личности.</p>}
        </li>
      ))}
    </ul>
  );
};

// ── Аукцион ────────────────────────────────────────────────────────────────────────────────────

const AuctionDetail: React.FC<{ id: number; setFlash: (f: Flash) => void; onChanged: () => void }> = ({ id, setFlash, onChanged }) => {
  const [data, setData] = useState<{ auction: admin.AdminAuction; lots: admin.AdminLot[] } | null>(null);
  const run = useAction(setFlash);
  const load = useCallback(() => admin.adminAuction(id).then(setData).catch(e => setFlash({ tone: 'error', text: e.message })), [id, setFlash]);
  useEffect(() => { setData(null); void load(); }, [load]);
  if (!data) return <p className="text-sm text-gray-500">Загрузка…</p>;
  const a = data.auction;
  const draft = a.status === 'draft';
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-xl font-semibold flex-1">{a.title}</h2>
          <Badge tone={a.status === 'bidding' ? 'green' : 'indigo'}>{AUCTION_STATUS[a.status] ?? a.status}</Badge>
          {a.status !== 'draft' && <Link to={`/torgi/${a.slug}`} className={ghost}>Страница аукциона</Link>}
        </div>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Открытие торгов</dt><dd>{formatMoment(a.bidding_opens_at)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Первый лот закрывается</dt><dd>{formatMoment(a.first_close_at)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Предельное закрытие</dt><dd>{formatMoment(a.hard_close_at)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Срок извещения</dt><dd>{a.notice_days} дн.</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Минимум участников по лоту</dt><dd>{a.min_bidders}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Адрес</dt><dd>/torgi/{a.slug}</dd></div>
        </dl>
        {['closed', 'settled'].includes(a.status) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {a.status === 'closed' && (
              <button type="button" className={primary}
                onClick={() => { if (window.confirm('Завершить расчёты по аукциону? Это можно сделать, когда по всем проданным лотам стоит отметка «расчёты завершены» (возвраты задатков проверьте сами).')) void run(() => admin.setAuctionStatus(id, 'settled'), 'Расчёты по аукциону завершены.', async () => { await load(); onChanged(); }); }}>
                Расчёты завершены
              </button>
            )}
            {a.status === 'settled' && (
              <button type="button" className={ghost}
                onClick={() => { if (window.confirm('Перенести аукцион в архив?')) void run(() => admin.setAuctionStatus(id, 'archived'), 'Аукцион в архиве.', async () => { await load(); onChanged(); }); }}>
                В архив
              </button>
            )}
          </div>
        )}
        {draft && (
          <div className="mt-4">
            <button type="button" className={primary} disabled={data.lots.length === 0}
              onClick={() => { if (window.confirm('Объявить аукцион? После этого даты и описания лотов менять нельзя, страница станет публичной.')) void run(() => admin.announceAuction(id), 'Аукцион объявлен.', async () => { await load(); onChanged(); }); }}>
              Объявить аукцион
            </button>
            {data.lots.length === 0 && <span className="text-xs text-gray-500 ml-3">Сначала добавьте лоты.</span>}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Лоты</h3>
        <LotsTable lots={data.lots} draft={draft} onChanged={load} setFlash={setFlash} />
        {draft && <AddLotForm auctionId={id} onAdded={load} setFlash={setFlash} />}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Участники</h3>
        {draft ? <p className="text-sm text-gray-500">Заявки принимаются после объявления аукциона.</p> : <Registrations auctionId={id} setFlash={setFlash} />}
      </section>
    </div>
  );
};

const TorgiAdminPage: React.FC = () => {
  const [auctions, setAuctions] = useState<admin.AdminAuction[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [flash, setFlash] = useState<Flash>(null);
  const [problem, setProblem] = useState<string | null>(null);

  const load = useCallback(() => admin.adminAuctions().then(d => { setAuctions(d.auctions); setProblem(null); }).catch(e => setProblem(e.message)), []);
  useEffect(() => { void load(); }, [load]);

  return (
    <Shell title="Торги: кабинет куратора" back={<Link to="/torgi" className="text-indigo-700 hover:underline">← Публичная страница торгов</Link>}
      subtitle="Создание аукционов и лотов, допуск участников, снятие лотов и проверка журнала ставок.">
      {flash && <div className="mb-4"><Notice tone={flash.tone}>{flash.text}</Notice></div>}
      {problem && <Notice tone="error">{problem === 'Не удалось выполнить действие.' ? 'Торги не запущены на сервере или миграция не применена.' : problem}</Notice>}
      {auctions && (
        <div className="grid lg:grid-cols-[18rem_1fr] gap-6">
          <aside className="space-y-3">
            <button type="button" className={`${primary} w-full`} onClick={() => { setCreating(true); setSelected(null); }}>Новый аукцион</button>
            <ul className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
              {auctions.length === 0 && <li className="p-4 text-sm text-gray-500">Аукционов пока нет.</li>}
              {auctions.map(a => (
                <li key={a.auction_id}>
                  <button type="button" onClick={() => { setSelected(a.auction_id); setCreating(false); }} className={`w-full text-left p-4 hover:bg-gray-50 ${selected === a.auction_id ? 'bg-indigo-50' : ''}`}>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-gray-500 flex flex-wrap gap-2 mt-1">
                      <span>{AUCTION_STATUS[a.status] ?? a.status}</span><span>лотов: {a.lots}</span>
                      {!!a.pending_applications && <span className="text-amber-700">заявок: {a.pending_applications}</span>}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div>
            {creating && <NewAuctionForm setFlash={setFlash} onCreated={async id => { setCreating(false); await load(); setSelected(id); }} />}
            {selected !== null && <AuctionDetail key={selected} id={selected} setFlash={setFlash} onChanged={load} />}
            {!creating && selected === null && <Notice tone="info">Выберите аукцион слева или создайте новый.</Notice>}
          </div>
        </div>
      )}
    </Shell>
  );
};

export default TorgiAdminPage;
