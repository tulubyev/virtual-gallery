import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadLegalDoc, type LegalDoc } from '../../lib/legal';
import { applyForAuction, formatKop, myRegistrations, type Registration } from '../../lib/bidding';
import { KIND_LABEL, REGISTRATION_STATUS } from '../../lib/biddingAdmin';
import { Notice } from './Shell';

/** Заявка на участие и текущее положение участника на аукционе. */
const RegistrationPanel: React.FC<{ slug: string; loggedIn: boolean; open: boolean }> = ({ slug, loggedIn, open }) => {
  const [mine, setMine] = useState<Registration | null | undefined>(undefined);
  const [kind, setKind] = useState<'person' | 'legal_entity' | 'sole_proprietor'>('person');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rules, setRules] = useState(false);
  const [consent, setConsent] = useState(false);
  const [docs, setDocs] = useState<{ rules: LegalDoc; consent: LegalDoc } | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => myRegistrations().then(d => setMine(d.registrations.find(r => r.slug === slug) ?? null)).catch(() => setMine(null));
  useEffect(() => { if (loggedIn) void load(); else setMine(null); /* eslint-disable-next-line */ }, [slug, loggedIn]);
  // Текущие версии документов: участник принимает именно их, версия записывается в заявку
  useEffect(() => {
    Promise.all([loadLegalDoc('auction-rules'), loadLegalDoc('pd-consent')]).then(([r, c]) => setDocs({ rules: r, consent: c })).catch(() => setDocs(null));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      if (!docs) throw new Error('Не удалось загрузить документы. Обновите страницу.');
      await applyForAuction(slug, {
        kind, full_name: fullName.trim(), phone: phone.trim(),
        rules_accepted: rules, rules_version: docs.rules.ref, pd_consent: consent, pd_version: docs.consent.ref,
      });
      await load();
    } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  }

  if (!loggedIn) {
    return <Notice tone="info">Чтобы участвовать, <Link to="/login" className="underline font-medium">войдите</Link> или <Link to="/register" className="underline font-medium">зарегистрируйтесь</Link> и подайте заявку.</Notice>;
  }
  if (mine === undefined) return <p className="text-sm text-gray-500">Загрузка…</p>;

  if (mine) {
    const status = REGISTRATION_STATUS[mine.status] ?? mine.status;
    if (mine.status === 'active') {
      return <Notice tone="good">Вы допущены к торгам как участник № {mine.pseudonym_no}. Лимит ставок — {formatKop(mine.limit_kop)}.</Notice>;
    }
    if (mine.status === 'rejected') {
      return <Notice tone="error">Заявка отклонена{mine.reason ? `: ${mine.reason}` : '.'} Свяжитесь с организатором.</Notice>;
    }
    return (
      <Notice tone="warn">
        {status}. Организатор проверит данные и откроет вам участие{mine.kyc_status === 'pending' ? ' — проверка личности ещё не завершена' : ''}. Эта страница обновится при следующем заходе.
      </Notice>
    );
  }

  if (!open) return <Notice tone="info">Приём заявок на этот аукцион закрыт.</Notice>;

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <h3 className="text-lg font-semibold">Заявка на участие</h3>
      <p className="text-sm text-gray-600">Организатор проверит ваши данные и назначит лимит ставок. Пока заявка не одобрена, делать ставки нельзя.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-sm text-gray-700">Кто участвует
          <select value={kind} onChange={e => setKind(e.target.value as typeof kind)} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white">
            {Object.entries(KIND_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-sm text-gray-700">ФИО (или название организации)
          <input value={fullName} onChange={e => setFullName(e.target.value)} required maxLength={200} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" />
        </label>
        <label className="text-sm text-gray-700">Телефон
          <input value={phone} onChange={e => setPhone(e.target.value)} required type="tel" placeholder="+7 900 000-00-00" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2" />
        </label>
      </div>
      {docs === null && <Notice tone="error">Не удалось загрузить правила и согласие. Обновите страницу.</Notice>}
      {docs && (docs.rules.status === 'draft' || docs.consent.status === 'draft') && (
        <Notice tone="warn">Правила и согласие ещё не утверждены (это проект), поэтому приём заявок может быть закрыт.</Notice>
      )}
      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={rules} onChange={e => setRules(e.target.checked)} className="mt-1" />
        <span>
          Я прочитал(а) <Link to="/legal/auction-rules" target="_blank" className="underline text-indigo-700">правила аукциона</Link>{docs ? ` (версия ${docs.rules.version})` : ''} и принимаю их.
          Ставка — безотзывное предложение купить лот по указанной цене.
        </span>
      </label>
      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
        <span>
          Я даю <Link to="/legal/pd-consent" target="_blank" className="underline text-indigo-700">согласие на обработку персональных данных</Link>{docs ? ` (версия ${docs.consent.version})` : ''}.
          Порядок обработки описан в <Link to="/legal/privacy-policy" target="_blank" className="underline text-indigo-700">политике обработки персональных данных</Link>.
        </span>
      </label>
      {error && <Notice tone="error">{error}</Notice>}
      <button type="submit" disabled={busy || !docs || !rules || !consent || !fullName.trim() || !phone.trim()} className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
        {busy ? 'Отправляю…' : 'Подать заявку'}
      </button>
    </form>
  );
};

export default RegistrationPanel;
