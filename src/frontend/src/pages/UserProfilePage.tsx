import React, { useState, useEffect, useRef } from 'react';
import { fetchWithAuth } from '../services/api';
import { User, Shield, Mail, Calendar, Key, Save, CheckCircle, AlertCircle, Loader2, Camera } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  currentUser: UserType | null;
  onUpdate: (user: UserType) => void;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  admin:               { label: 'Администратор', color: 'bg-red-100 text-red-700' },
  curator:             { label: 'Куратор',        color: 'bg-purple-100 text-purple-700' },
  staff:               { label: 'Персонал',        color: 'bg-blue-100 text-blue-700' },
  tour_guide:          { label: 'Гид',             color: 'bg-green-100 text-green-700' },
  auction_participant: { label: 'Участник аукциона', color: 'bg-amber-100 text-amber-700' },
  user:                { label: 'Посетитель',      color: 'bg-gray-100 text-gray-700' },
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function UserProfilePage({ currentUser, onUpdate }: Props) {
  const [profile, setProfile] = useState<{ username: string; email: string; created_at?: string; avatar_url?: string | null } | null>(null);
  const [loadError, setLoadError] = useState('');

  const [username, setUsername]     = useState('');
  const [email, setEmail]           = useState('');
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  const [curPass,  setCurPass]  = useState('');
  const [newPass,  setNewPass]  = useState('');
  const [confPass, setConfPass] = useState('');
  const [passMsg, setPassMsg]   = useState<{ ok: boolean; text: string } | null>(null);
  const [passSaving, setPassSaving] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    fetchWithAuth('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.error) { setLoadError(data.error); return; }
        setProfile(data);
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch(() => setLoadError('Не удалось загрузить профиль'));
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileSaving(true);
    try {
      const res  = await fetchWithAuth('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setProfileMsg({ ok: false, text: data.error || 'Ошибка сохранения' }); return; }
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      const updatedUser: UserType = {
        id: String(data.user_id ?? currentUser?.id),
        username: data.username ?? username.trim(),
        email: data.email ?? email.trim(),
        role: data.role ?? currentUser?.role ?? 'user',
        avatar_url: data.avatar_url ?? currentUser?.avatar_url,
      };
      onUpdate(updatedUser);
      setProfile(p => p ? { ...p, username: updatedUser.username, email: updatedUser.email } : p);
      setProfileMsg({ ok: true, text: 'Профиль обновлён' });
    } catch {
      setProfileMsg({ ok: false, text: 'Сетевая ошибка' });
    } finally {
      setProfileSaving(false);
    }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    setPassMsg(null);
    if (newPass !== confPass) { setPassMsg({ ok: false, text: 'Пароли не совпадают' }); return; }
    if (newPass.length < 6)   { setPassMsg({ ok: false, text: 'Минимум 6 символов' });   return; }
    setPassSaving(true);
    try {
      const res  = await fetchWithAuth('/api/auth/me/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: curPass, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) { setPassMsg({ ok: false, text: data.error || 'Ошибка смены пароля' }); return; }
      setPassMsg({ ok: true, text: 'Пароль изменён' });
      setCurPass(''); setNewPass(''); setConfPass('');
    } catch {
      setPassMsg({ ok: false, text: 'Сетевая ошибка' });
    } finally {
      setPassSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarMsg(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setAvatarMsg({ ok: false, text: 'Допустимые форматы: JPEG, PNG, WebP' });
      return;
    }
    if (file.size > MAX_SIZE) {
      setAvatarMsg({ ok: false, text: 'Файл слишком большой (максимум 5 МБ)' });
      return;
    }

    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/auth/me/avatar', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setAvatarMsg({ ok: false, text: data.error || 'Ошибка загрузки' });
        return;
      }
      setProfile(p => p ? { ...p, avatar_url: data.avatar_url } : p);
      onUpdate({ ...(currentUser as UserType), avatar_url: data.avatar_url });
      setAvatarMsg({ ok: true, text: 'Фото профиля обновлено' });
    } catch {
      setAvatarMsg({ ok: false, text: 'Сетевая ошибка при загрузке фото' });
    } finally {
      setAvatarUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Войдите, чтобы просмотреть профиль</p>
      </div>
    );
  }

  const roleInfo = ROLE_LABELS[currentUser.role] || ROLE_LABELS.user;
  const initials = (profile?.username || currentUser.username || '?').slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatar_url || currentUser.avatar_url;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">
          {/* Avatar with upload button */}
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Сменить фото профиля"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
              title="Загрузить фото"
            >
              {avatarUploading
                ? <Loader2 className="w-3 h-3 animate-spin" />
                : <Camera className="w-3 h-3" />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-900">{profile?.username || currentUser.username}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              {profile?.email || currentUser.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${roleInfo.color}`}>
                <Shield className="w-3 h-3 inline mr-1" />
                {roleInfo.label}
              </span>
              {profile?.created_at && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  С {new Date(profile.created_at).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })}
                </span>
              )}
            </div>
            {avatarMsg && (
              <div className={`flex items-center gap-1.5 text-xs mt-2 ${avatarMsg.ok ? 'text-green-600' : 'text-red-600'}`}>
                {avatarMsg.ok ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                {avatarMsg.text}
              </div>
            )}
          </div>
        </div>

        {loadError && (
          <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {loadError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            Личные данные
          </h2>
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя пользователя</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                minLength={2}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {profileMsg && (
              <div className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${profileMsg.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {profileMsg.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {profileMsg.text}
              </div>
            )}
            <button
              type="submit"
              disabled={profileSaving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Сохранить
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-500" />
            Сменить пароль
          </h2>
          <form onSubmit={savePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Текущий пароль</label>
              <input
                type="password"
                value={curPass}
                onChange={e => setCurPass(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
              <input
                type="password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                minLength={6}
                required
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Повторите пароль</label>
              <input
                type="password"
                value={confPass}
                onChange={e => setConfPass(e.target.value)}
                minLength={6}
                required
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {passMsg && (
              <div className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${passMsg.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {passMsg.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {passMsg.text}
              </div>
            )}
            <button
              type="submit"
              disabled={passSaving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {passSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              Сменить пароль
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
