import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ApiProblem, LOT_STATE, OUTCOME_TEXT, clockOffset, bidsCount, describeBid, formatKop, formatMoment, getLot, lotImage, lotTitle, myStatus, newRequestId, parseAmount,
  placeBid, pollLot, type HistoryItem, type PublicLot,
} from '../lib/bidding';
import { useCountdown } from '../components/torgi/useCountdown';
import { Badge, Notice, Shell } from '../components/torgi/Shell';

const POLL_MS = 2500;

const TorgiLotPage: React.FC = () => {
  const { id } = useParams();
  const lotId = Number(id);
  const [lot, setLot] = useState<PublicLot | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ tone: 'good' | 'info' | 'error' | 'warn'; text: string } | null>(null);
  const requestId = useRef<string | null>(null);      // один идентификатор на попытку: повтор после сбоя сети не создаст вторую ставку
  const loggedIn = !!localStorage.getItem('authToken');

  const full = useCallback(async () => {
    try {
      const data = await getLot(lotId);
      setOffset(clockOffset(data.server_time));
      setLot(data.lot);
      setHistory(data.history);
      setLoadError(null);
    } catch (e) { setLoadError((e as Error).message); }
  }, [lotId]);

  useEffect(() => { void full(); }, [full]);

  // Опрос по версии: пока ничего не изменилось, сервер отвечает коротко; изменилось — перечитываем лот с историей
  const version = lot?.version;
  const live = lot?.state === 'open' || lot?.state === 'approved';
  useEffect(() => {
    if (version === undefined || !live) return;
    const timer = setInterval(async () => {
      if (document.hidden) return;
      try {
        const next = await pollLot(lotId, version);
        setOffset(clockOffset(next.server_time));
        // Лот изменился не по нашей воле (чужая ставка, продление, закрытие): прежний итог нашей ставки уже неверен
        if (next.changed) { setResult(null); await full(); }
      } catch { /* временный сбой сети: попробуем в следующий раз */ }
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [lotId, version, live, full]);

  const clock = useCountdown(lot?.state === 'open' ? lot.ends_at : null, offset);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!lot || busy) return;
    const rub = parseAmount(amount);
    if (rub === null) { setResult({ tone: 'error', text: 'Введите сумму в рублях, например 25 000.' }); return; }
    setBusy(true); setResult(null);
    requestId.current = requestId.current ?? newRequestId();
    try {
      const accepted = await placeBid(lot.lot_id, rub, requestId.current, lot.version);
      requestId.current = null;
      setResult(describeBid(accepted));
      setAmount('');
      await full();
    } catch (err) {
      const problem = err as ApiProblem;
      // Ответ сервера получен — попытка закончена; при сетевом сбое идентификатор остаётся для повтора
      if (problem.status) requestId.current = null;
      setResult({ tone: problem.code === 'stale' ? 'warn' : 'error', text: problem.status ? problem.message : 'Нет связи с сервером. Нажмите «Сделать ставку» ещё раз — повтор не создаст вторую ставку.' });
      if (problem.code === 'stale' || problem.code === 'below_minimum') await full();
    } finally { setBusy(false); }
  }

  const back = lot ? <Link to={`/torgi`} className="text-indigo-700 hover:underline">← Все аукционы</Link> : <Link to="/torgi" className="text-indigo-700 hover:underline">← Все аукционы</Link>;
  if (loadError && !lot) return <Shell title="Лот" back={back}><Notice tone="error">{loadError}</Notice></Shell>;
  if (!lot) return <Shell title="Лот" back={back}><p className="text-sm text-gray-500">Загрузка…</p></Shell>;

  const mine = myStatus(lot);
  const open = lot.state === 'open';
  const sold = lot.close_outcome === 'sold';
  const image = lotImage(lot);
  const price = lot.bid_count > 0 ? lot.current_price_kop : lot.start_price_kop;
  const s = lot.snapshot;
  return (
    <Shell title={lotTitle(lot)} back={back} subtitle={s.artist_name ? <>{s.artist_name}{s.year_created ? `, ${s.year_created}` : ''}</> : undefined}>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl bg-gray-100 overflow-hidden aspect-square flex items-center justify-center">
            {image ? <img src={s.image_url || image} alt={lotTitle(lot)} className="w-full h-full object-contain" /> : <span className="text-gray-400 text-sm">Нет изображения</span>}
          </div>
          <dl className="mt-4 text-sm text-gray-700 space-y-1">
            {s.medium && <div className="flex justify-between gap-3"><dt className="text-gray-500">Техника</dt><dd>{s.medium}</dd></div>}
            {s.dimensions && <div className="flex justify-between gap-3"><dt className="text-gray-500">Размер</dt><dd>{s.dimensions}</dd></div>}
            {lot.estimate_low_kop !== null && <div className="flex justify-between gap-3"><dt className="text-gray-500">Оценка</dt><dd>{formatKop(lot.estimate_low_kop)} — {formatKop(lot.estimate_high_kop)}</dd></div>}
          </dl>
          {s.description && <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">{s.description}</p>}
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5" aria-live="polite">
            <div className="flex items-center justify-between gap-3 mb-2">
              <Badge tone={open ? 'green' : 'gray'}>{lot.close_outcome ? OUTCOME_TEXT[lot.close_outcome] ?? lot.state : LOT_STATE[lot.state] ?? lot.state}</Badge>
              {open && mine === 'leading' && <Badge tone="green">Вы лидируете</Badge>}
              {open && mine === 'outbid' && <Badge tone="amber">Вас перебили</Badge>}
              {sold && mine === 'leading' && <Badge tone="green">Вы выиграли</Badge>}
            </div>
            <p className="text-xs text-gray-500">{sold ? 'Цена продажи' : lot.bid_count > 0 ? 'Текущая цена' : 'Стартовая цена'}</p>
            <p className="text-4xl font-bold">{formatKop(lot.state === 'sold_awaiting_payment' && lot.hammer_kop ? lot.hammer_kop : price)}</p>
            <p className="text-sm text-gray-600 mt-1">
              {lot.bid_count > 0 ? bidsCount(lot.bid_count) : 'Ставок пока нет'}
              {lot.leader_pseudonym !== null && open && <> · лидер — участник № {lot.leader_pseudonym}</>}
              {lot.winner_pseudonym !== null && <> · победитель — участник № {lot.winner_pseudonym}</>}
            </p>
            {open && (
              <p className="mt-3 text-sm">До конца торгов по лоту: <span className={`font-mono text-lg ${clock.urgent ? 'text-red-600 font-bold' : ''}`}>{clock.text}</span>
                {clock.urgent && <span className="block text-xs text-red-600">Ставка в последние минуты продлевает торги.</span>}
              </p>
            )}
            {lot.state === 'approved' && <p className="mt-3 text-sm text-gray-600">Торги по этому лоту ещё не начались.</p>}
            {lot.ends_at && <p className="text-xs text-gray-500 mt-1">Закрытие: {formatMoment(lot.ends_at)}</p>}
          </section>

          {sold && mine === 'leading' && <Notice tone="good">Поздравляем, лот за вами. Организатор свяжется с вами для оформления покупки.</Notice>}
          {sold && mine === 'outbid' && <Notice tone="info">Торги завершены: лот купил другой участник.</Notice>}
          {open && mine && lot.mine?.my_max_kop != null && (
            <Notice tone={mine === 'leading' ? 'good' : 'warn'}>
              Ваш максимум — {formatKop(lot.mine.my_max_kop)}.{' '}
              {mine === 'leading' ? 'Система сама повышает цену за вас, пока не достигнет его.' : 'Чтобы вернуть лидерство, поднимите максимум.'}
            </Notice>
          )}

          {open && (loggedIn ? (
            <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-800">Ваш максимум, ₽</label>
              <input id="bid-amount" inputMode="decimal" autoComplete="off" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder={formatKop(lot.min_next_bid_kop).replace(/ /g, ' ')}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <p className="text-xs text-gray-500">
                Минимальная ставка — {formatKop(lot.min_next_bid_kop)}. Вы указываете максимум: система торгуется за вас шагами, пока цена не дойдёт до него.
                Ставка безотзывна.
              </p>
              {result && <Notice tone={result.tone}>{result.text}</Notice>}
              <button type="submit" disabled={busy || !amount.trim()} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {busy ? 'Отправляю…' : 'Сделать ставку'}
              </button>
            </form>
          ) : (
            <Notice tone="info"><Link to="/login" className="underline font-medium">Войдите</Link> и подайте заявку на участие, чтобы делать ставки.</Notice>
          ))}

          <section>
            <h2 className="font-semibold mb-2">История ставок</h2>
            {history.length === 0 ? <p className="text-sm text-gray-500">Ставок пока нет.</p> : (
              <ol className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 text-sm">
                {history.map(b => (
                  <li key={b.bid_id} className="flex items-center justify-between gap-3 px-4 py-2">
                    <span>Участник № {b.pseudonym}</span>
                    <span className="font-medium">{formatKop(b.price_kop)}</span>
                    <time className="text-gray-500" dateTime={b.at}>{new Date(b.at).toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' })}</time>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </Shell>
  );
};

export default TorgiLotPage;
