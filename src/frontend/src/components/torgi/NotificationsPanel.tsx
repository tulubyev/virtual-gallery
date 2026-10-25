import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiProblem, formatMoment, markNotificationsRead, myNotifications, type NotificationItem } from '../../lib/bidding';

/** Уведомления участника: ставку перебили, лот закрыт, решение по заявке. Гостю панель не показывается. */
const NotificationsPanel: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[] | null>(null);
  const [unread, setUnread] = useState(0);
  const [hidden, setHidden] = useState(false);

  const load = useCallback(() => myNotifications()
    .then(d => { setItems(d.notifications); setUnread(d.unread); })
    .catch(e => { if (e instanceof ApiProblem && e.status === 401) setHidden(true); else setItems([]); }), []);
  useEffect(() => { void load(); }, [load]);

  if (hidden || !items || items.length === 0) return null;
  const readAll = () => { void markNotificationsRead().then(load).catch(() => undefined); };
  return (
    <section aria-label="Уведомления" className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold">Уведомления{unread > 0 && <span className="ml-2 text-sm font-normal text-indigo-700">непрочитанных: {unread}</span>}</h2>
        {unread > 0 && <button type="button" onClick={readAll} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">Отметить прочитанными</button>}
      </div>
      <ul className="divide-y divide-gray-100">
        {items.slice(0, 8).map(n => (
          <li key={n.notification_id} className={`py-2 text-sm ${n.read ? 'text-gray-500' : 'text-gray-900'}`}>
            <p className={n.read ? '' : 'font-medium'}>{n.path ? <Link to={n.path} className="underline">{n.title}</Link> : n.title}</p>
            <p>{n.text}</p>
            <p className="text-xs text-gray-400">{formatMoment(n.created_at)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NotificationsPanel;
