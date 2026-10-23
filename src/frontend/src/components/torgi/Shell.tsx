import React from 'react';

export const Shell: React.FC<{ title: string; subtitle?: React.ReactNode; back?: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, back, children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      {back && <div className="mb-4 text-sm">{back}</div>}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <div className="text-gray-600 mt-2">{subtitle}</div>}
      </header>
      {children}
    </div>
  </div>
);

export const Notice: React.FC<{ tone: 'info' | 'good' | 'warn' | 'error'; children: React.ReactNode }> = ({ tone, children }) => {
  const style = { info: 'bg-gray-50 border-gray-200 text-gray-700', good: 'bg-green-50 border-green-200 text-green-800', warn: 'bg-amber-50 border-amber-200 text-amber-900', error: 'bg-red-50 border-red-200 text-red-800' }[tone];
  return <p role={tone === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-sm ${style}`}>{children}</p>;
};

export const Badge: React.FC<{ tone?: 'gray' | 'green' | 'amber' | 'red' | 'indigo'; children: React.ReactNode }> = ({ tone = 'gray', children }) => {
  const style = { gray: 'bg-gray-100 text-gray-700', green: 'bg-green-100 text-green-700', amber: 'bg-amber-100 text-amber-800', red: 'bg-red-100 text-red-700', indigo: 'bg-indigo-100 text-indigo-700' }[tone];
  return <span className={`inline-block text-xs px-2 py-1 rounded-full whitespace-nowrap ${style}`}>{children}</span>;
};
