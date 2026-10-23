import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AUCTION_STATUS, LOT_STATE, OUTCOME_TEXT, clockOffset, bidsCount, formatKop, formatMoment, getAuction, lotImage, lotTitle, myStatus, type AuctionView } from '../lib/bidding';
import { useCountdown } from '../components/torgi/useCountdown';
import RegistrationPanel from '../components/torgi/RegistrationPanel';
import { Badge, Notice, Shell } from '../components/torgi/Shell';

function LotCard({ lot, offset }: { lot: AuctionView['lots'][number]; offset: number }) {
  const clock = useCountdown(lot.state === 'open' ? lot.ends_at : null, offset);
  const image = lotImage(lot);
  const mine = myStatus(lot);
  const closed = lot.state !== 'open' && lot.state !== 'approved';
  return (
    <li>
      <Link to={`/torgi/lot/${lot.lot_id}`} className="flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-4 h-full">
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-gray-100 overflow-hidden">
          {image && <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-gray-500">Лот {lot.lot_no}</p>
            {lot.state === 'open' && mine === 'leading' && <Badge tone="green">Вы лидируете</Badge>}
            {lot.state === 'open' && mine === 'outbid' && <Badge tone="amber">Вас перебили</Badge>}
            {lot.close_outcome === 'sold' && mine === 'leading' && <Badge tone="green">Вы выиграли</Badge>}
          </div>
          <h3 className="font-semibold truncate">{lotTitle(lot)}</h3>
          {lot.snapshot.artist_name && <p className="text-sm text-gray-600 truncate">{lot.snapshot.artist_name}</p>}
          <p className="mt-2 text-lg font-bold">{formatKop(lot.bid_count > 0 ? lot.current_price_kop : lot.start_price_kop)}</p>
          <p className="text-xs text-gray-500">
            {lot.bid_count > 0 ? bidsCount(lot.bid_count) : 'ставок нет'}
            {lot.state === 'open' && <> · до конца <span className={clock.urgent ? 'text-red-600 font-semibold' : ''}>{clock.text}</span></>}
            {closed && <> · {lot.close_outcome ? OUTCOME_TEXT[lot.close_outcome] : LOT_STATE[lot.state] ?? lot.state}</>}
          </p>
        </div>
      </Link>
    </li>
  );
}

const TorgiAuctionPage: React.FC = () => {
  const { slug = '' } = useParams();
  const [view, setView] = useState<AuctionView | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const loggedIn = !!localStorage.getItem('authToken');

  const load = useCallback(async () => {
    try {
      const data = await getAuction(slug);
      setOffset(clockOffset(data.server_time));
      setView(data);
      setError(null);
    } catch (e) { setError((e as Error).message); }
  }, [slug]);

  useEffect(() => {
    void load();
    const timer = setInterval(() => { if (!document.hidden) void load(); }, 10_000);
    return () => clearInterval(timer);
  }, [load]);

  const back = <Link to="/torgi" className="text-indigo-700 hover:underline">← Все аукционы</Link>;
  if (error && !view) return <Shell title="Аукцион" back={back}><Notice tone="error">{error}</Notice></Shell>;
  if (!view) return <Shell title="Аукцион" back={back}><p className="text-sm text-gray-500">Загрузка…</p></Shell>;

  const a = view.auction;
  const registrationOpen = !a.registration_closes_at || Date.parse(a.registration_closes_at) > Date.now() + offset;
  const finished = ['closed', 'settled', 'archived', 'cancelled'].includes(a.status);
  return (
    <Shell title={a.title} back={back} subtitle={<><Badge tone={a.status === 'bidding' ? 'green' : 'indigo'}>{AUCTION_STATUS[a.status] ?? a.status}</Badge>{a.description && <p className="mt-3">{a.description}</p>}</>}>
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <h2 className="font-semibold mb-3">Календарь</h2>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Извещение опубликовано</dt><dd className="text-right">{formatMoment(a.notice_published_at)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Приём заявок до</dt><dd className="text-right">{a.registration_closes_at ? formatMoment(a.registration_closes_at) : 'до конца торгов'}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Начало торгов</dt><dd className="text-right">{formatMoment(a.bidding_opens_at)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-gray-500">Закрытие первого лота</dt><dd className="text-right">{formatMoment(a.first_close_at)}</dd></div>
        </dl>
        <p className="text-xs text-gray-500 mt-3">
          Если ставка сделана в последние {Math.round(a.soft_close_window_s / 60)} мин., лот продлевается на {Math.round(a.soft_close_extend_s / 60)} мин. от момента ставки.
          Торги по лоту, в которых сделал ставки один участник, не состоятся.
        </p>
      </section>

      {!finished && <section className="mb-8"><RegistrationPanel slug={a.slug} loggedIn={loggedIn} open={registrationOpen} /></section>}

      <h2 className="text-xl font-semibold mb-4">Лоты</h2>
      {view.lots.length === 0 ? <Notice tone="info">Лоты пока не опубликованы.</Notice> : (
        <ul className="grid gap-4 md:grid-cols-2">{view.lots.map(l => <LotCard key={l.lot_id} lot={l} offset={offset} />)}</ul>
      )}
    </Shell>
  );
};

export default TorgiAuctionPage;
