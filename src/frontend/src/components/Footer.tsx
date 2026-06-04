import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Virtual Gallery Services</span>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {[
                { label: 'Галерея', to: '/galleries' },
                { label: 'Аукцион', to: '/auction' },
                { label: 'ArtWiki', to: '/artwiki' },
                { label: 'RAG', to: '/rag' },
                { label: 'О нас', to: '/about' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Youtube className="h-5 w-5 text-gray-400" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Virtual Art Gallery.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
