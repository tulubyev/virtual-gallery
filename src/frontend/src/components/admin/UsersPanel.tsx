import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KeyRound, UserPlus, Copy, Check } from 'lucide-react';
import {
  type AdminUser, type IssuedPassword, ROLES, ROLE_HINTS, ROLE_LABELS,
  createUser, formatDate, handoverText, listUsers, passwordState, resetPassword, resetWarning, roleChangeWarning, setRole,
} from '../../lib/userAdmin';

const input = 'w-full px-3 py-2 border rounded-lg bg-background text-sm';

function currentUserId(): number | null {
  try { const id = Number(JSON.parse(localStorage.getItem('currentUser') || 'null')?.id); return Number.isInteger(id) ? id : null; } catch { return null; }
}

/** Временный пароль показывается один раз: сервер хранит только хеш и повторно его не отдаст. */
const IssuedPasswordCard: React.FC<{ issued: IssuedPassword; verb: string; onClose: () => void }> = ({ issued, verb, onClose }) => {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(handoverText(issued, window.location.origin)); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { /* буфер недоступен: пароль виден на экране */ }
  }
  return (
    <div role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-4 mb-4 space-y-2 text-sm">
      <p className="font-medium text-amber-900">{verb} «{issued.user.username}». Временный пароль показан только сейчас — сохранить его позже не получится.</p>
      <p className="font-mono text-lg tracking-wider select-all break-all" data-testid="temporary-password">{issued.temporary_password}</p>
      <p className="text-amber-900">Действует до {formatDate(issued.expires_at)}. При первом входе пользователь задаст свой пароль. Передайте пароль лично или по защищённому каналу: не пересылайте его вместе с адресом сайта в открытой переписке.</p>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={copy}>{copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}{copied ? 'Скопировано' : 'Скопировать для передачи'}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onClose}>Я сохранил, закрыть</Button>
      </div>
    </div>
  );
};

const CreateForm: React.FC<{ onCreated: (issued: IssuedPassword) => void; onCancel: () => void }> = ({ onCreated, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRoleValue] = useState('staff');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError('');
    try { onCreated(await createUser({ username, email, role, password })); }
    catch (err) { setError(err instanceof Error ? err.message : 'Не удалось создать пользователя.'); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border p-4 mb-4 space-y-3">
      <h3 className="font-semibold">Новый пользователь</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">Имя<input required minLength={2} maxLength={50} value={username} onChange={e => setUsername(e.target.value)} className={input} autoComplete="off" /></label>
        <label className="text-sm">E-mail<input required type="email" maxLength={100} value={email} onChange={e => setEmail(e.target.value)} className={input} autoComplete="off" /></label>
        <label className="text-sm">Роль
          <select value={role} onChange={e => setRoleValue(e.target.value)} className={input}>{ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}</select>
          <span className="text-xs text-muted-foreground">{ROLE_HINTS[role]}</span></label>
        <label className="text-sm">Временный пароль (необязательно)
          <input value={password} onChange={e => setPassword(e.target.value)} minLength={8} className={input} autoComplete="off" placeholder="пусто — выдать случайный" />
          <span className="text-xs text-muted-foreground">Не короче 8 знаков. Пользователь сменит его при первом входе.</span></label>
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>{busy ? 'Создаю…' : 'Создать'}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Отмена</Button>
      </div>
    </form>
  );
};

const UsersPanel: React.FC<{ total?: number; onChanged?: () => void }> = ({ total, onChanged }) => {
  const me = currentUserId();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [issued, setIssued] = useState<{ value: IssuedPassword; verb: string } | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    try { const r = await listUsers(search); setUsers(r.users); setCount(r.total); setError(''); }
    catch (e) { setError(e instanceof Error ? e.message : 'Ошибка'); }
  }, [search]);
  useEffect(() => { load(); }, [load]);

  async function changeRole(u: AdminUser, role: string) {
    if (role === u.role || !window.confirm(roleChangeWarning(u, role))) return;
    setBusyId(u.user_id); setError('');
    try { await setRole(u.user_id, role); setUsers(list => list && list.map(x => x.user_id === u.user_id ? { ...x, role } : x)); onChanged?.(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Не удалось сменить роль.'); }
    finally { setBusyId(null); }
  }

  async function reset(u: AdminUser) {
    if (!window.confirm(resetWarning(u))) return;
    setBusyId(u.user_id); setError('');
    try { setIssued({ value: await resetPassword(u.user_id), verb: 'Выдан новый временный пароль для' }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Не удалось выдать пароль.'); }
    finally { setBusyId(null); }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Пользователи</CardTitle>
          <CardDescription>Всего: {count || total || 0}. Здесь можно создать пользователя, назначить роль и выдать временный пароль.</CardDescription>
        </div>
        {!creating && <Button type="button" onClick={() => { setCreating(true); setIssued(null); }}><UserPlus className="h-4 w-4 mr-1" />Создать</Button>}
      </CardHeader>
      <CardContent>
        {issued && <IssuedPasswordCard issued={issued.value} verb={issued.verb} onClose={() => setIssued(null)} />}
        {creating && <CreateForm onCancel={() => setCreating(false)} onCreated={value => { setCreating(false); setIssued({ value, verb: 'Создан пользователь' }); load(); onChanged?.(); }} />}
        <form className="flex gap-2 mb-4" onSubmit={e => { e.preventDefault(); load(); }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Имя или e-mail" className={`${input} flex-1`} />
          <Button type="submit" variant="outline">Найти</Button>
        </form>
        {error && <p role="alert" className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b"><tr><th className="text-left p-3">Пользователь</th><th className="text-left p-3">Роль</th><th className="text-left p-3">Пароль</th><th className="text-left p-3">Регистрация</th><th className="p-3" /></tr></thead>
            <tbody>
              {(users ?? []).map(u => {
                const state = passwordState(u);
                const self = u.user_id === me;
                return (
                  <tr key={u.user_id} className="border-b hover:bg-muted/50">
                    <td className="p-3"><p className="font-medium">{u.username}{self && <span className="text-xs text-muted-foreground"> (вы)</span>}</p><p className="text-xs text-muted-foreground">{u.email}</p></td>
                    <td className="p-3">
                      <select value={u.role} disabled={self || busyId === u.user_id} title={self ? 'Свою роль меняет другой администратор' : undefined}
                        onChange={e => changeRole(u, e.target.value)} className="border rounded-md bg-background px-2 py-1 text-sm">
                        {ROLES.includes(u.role) ? null : <option value={u.role}>{u.role}</option>}
                        {ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                      </select>
                    </td>
                    <td className="p-3">
                      {state === 'pending' && <Badge variant="secondary">Ждёт смены до {formatDate(u.temp_password_expires_at)}</Badge>}
                      {state === 'expired' && <Badge variant="destructive">Временный пароль истёк</Badge>}
                    </td>
                    <td className="p-3">{formatDate(u.created_at)}</td>
                    <td className="p-3 text-right">
                      {!self && <Button type="button" variant="outline" size="sm" disabled={busyId === u.user_id} onClick={() => reset(u)}><KeyRound className="h-4 w-4 mr-1" />Временный пароль</Button>}
                    </td>
                  </tr>
                );
              })}
              {users && users.length === 0 && <tr><td colSpan={5} className="p-4 text-muted-foreground">Никого не найдено</td></tr>}
              {!users && !error && <tr><td colSpan={5} className="p-4 text-muted-foreground">Загрузка…</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersPanel;
