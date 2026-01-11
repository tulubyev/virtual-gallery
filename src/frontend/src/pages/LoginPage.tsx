// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, ...userData } = response.data;

      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', token);

      // Вызываем callback для обновления состояния пользователя
      onLogin(userData);

      // Перенаправляем на главную страницу
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка входа');
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
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Войти
        </button>
      </form>
      <p className="mt-4 text-center">
        Нет аккаунта?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Зарегистрируйтесь
        </a>
      </p>
    </div>
  );
};

export default LoginPage;