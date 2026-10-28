import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MIN_NEW_PASSWORD, newPasswordProblem } from '../lib/userAdmin';
import { fetchWithAuth } from '../services/api';
import type { User } from '../types';

/** Администратор выдал временный пароль: до смены пароля сайтом пользоваться нельзя. */
const ChangePasswordPage: React.FC<{ currentUser: User; onDone: () => void; onLogout: () => void }> = ({ currentUser, onDone, onLogout }) => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = newPasswordProblem(current, next, repeat);
    if (problem) { setError(problem); return; }
    setBusy(true); setError('');
    try {
      const res = await fetchWithAuth('/api/auth/me/password', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(res.status >= 500 ? 'Не удалось сменить пароль. Попробуйте позже.' : data.error || 'Не удалось сменить пароль.'); return; }
      if (data.token) localStorage.setItem('authToken', data.token);      // прежний токен после смены пароля больше не действует
      onDone();
      navigate('/', { replace: true });
    } catch { setError('Нет связи с сервером. Попробуйте позже.'); } finally { setBusy(false); }
  }

  const field = 'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-center">Задайте свой пароль</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">{currentUser.username}, вам выдан временный пароль. Чтобы продолжить, замените его на свой.</p>
      {error && <p role="alert" className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm">Временный пароль
          <input type="password" value={current} onChange={e => setCurrent(e.target.value)} required autoComplete="current-password" className={field} /></label>
        <label className="block text-sm">Новый пароль
          <input type="password" value={next} onChange={e => setNext(e.target.value)} required minLength={MIN_NEW_PASSWORD} autoComplete="new-password" className={field} />
          <span className="text-xs text-gray-500">Не короче {MIN_NEW_PASSWORD} знаков.</span></label>
        <label className="block text-sm">Повторите новый пароль
          <input type="password" value={repeat} onChange={e => setRepeat(e.target.value)} required autoComplete="new-password" className={field} /></label>
        <button type="submit" disabled={busy} className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50">{busy ? 'Сохраняю…' : 'Сохранить пароль'}</button>
      </form>
      <button type="button" onClick={onLogout} className="mt-4 w-full text-sm text-gray-500 hover:underline">Выйти</button>
    </div>
  );
};

export default ChangePasswordPage;
