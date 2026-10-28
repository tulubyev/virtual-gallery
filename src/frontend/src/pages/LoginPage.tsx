// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDays, setRememberDays] = useState<'0' | '7' | '30'>('0');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        rememberMe: Number(rememberDays)
      });

      const { token, user_id, username, email: uemail, role, must_change_password } = response.data;

      localStorage.setItem('authToken', token);

      const user: User = {
        id: String(user_id),
        username,
        email: uemail,
        role,
        must_change_password: !!must_change_password,
      };

      onLogin(user);
      navigate(must_change_password ? '/change-password' : '/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Вход в аккаунт</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="rememberDays" className="block text-sm text-gray-600 mb-1">
            Оставаться в системе
          </label>
          <select
            id="rememberDays"
            value={rememberDays}
            onChange={(e) => setRememberDays(e.target.value as '0' | '7' | '30')}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm text-gray-700"
          >
            <option value="0">Только в этом сеансе (24 часа)</option>
            <option value="7">7 дней</option>
            <option value="30">30 дней</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Войти
        </button>
      </form>
      <p className="mt-4 text-center">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;