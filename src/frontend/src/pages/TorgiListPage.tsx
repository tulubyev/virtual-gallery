import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AUCTION_STATUS, formatMoment, listAuctions, loadBiddingEnabled, type AuctionSummary } from '../lib/bidding';
import { Badge, Notice, Shell } from '../components/torgi/Shell';

const TONE: Record<string, 'green' | 'indigo' | 'gray'> = { bidding: 'green', announced: 'indigo', registration: 'indigo', preview: 'indigo' };

const TorgiListPage: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    loadBiddingEnabled().then(on => {
      if (!alive) return;
      setEnabled(on);
      if (on) listAuctions().then(d => alive && setAuctions(d.auctions)).catch(e => alive && setError(e.message));
    });
    return () => { alive = false; };
  }, []);

  return (
    <Shell title="Торги" subtitle="Онлайн-аукционы: объявленные, идущие и завершённые.">
      {enabled === false && <Notice tone="info">Онлайн-торги пока не запущены. Следите за объявлениями.</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
      {enabled && auctions === null && !error && <p className="text-sm text-gray-500">Загрузка…</p>}
      {auctions && auctions.length === 0 && <Notice tone="info">Объявленных аукционов пока нет.</Notice>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {auctions?.map(a => (
          <li key={a.slug}>
            <Link to={`/torgi/${a.slug}`} className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-5 h-full">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg font-semibold">{a.title}</h2>
                <Badge tone={TONE[a.status] ?? 'gray'}>{AUCTION_STATUS[a.status] ?? a.status}</Badge>
              </div>
              {a.description && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{a.description}</p>}
              <dl className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between gap-3"><dt>Лотов</dt><dd>{a.lots}</dd></div>
                <div className="flex justify-between gap-3"><dt>Начало торгов</dt><dd className="text-right">{formatMoment(a.bidding_opens_at)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Первый лот закрывается</dt><dd className="text-right">{formatMoment(a.first_close_at)}</dd></div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-gray-500">
        Документы:{' '}
        <Link to="/legal/auction-rules" className="underline">правила аукциона</Link>,{' '}
        <Link to="/legal/privacy-policy" className="underline">политика обработки персональных данных</Link>,{' '}
        <Link to="/legal/pd-consent" className="underline">согласие на обработку персональных данных</Link>.
      </p>
    </Shell>
  );
};

export default TorgiListPage;
