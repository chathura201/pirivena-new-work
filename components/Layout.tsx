import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Youtube, Phone, MapPin, Moon, Sun, Globe, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, theme, toggleTheme, lang, toggleLang } = useTheme();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('notices'), path: '/notices' },
    { name: t('events'), path: '/events' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden selection:bg-maroon-900 selection:text-white dark:selection:bg-saffron-500 dark:selection:text-maroon-900">
      {/* Top Bar - Hidden on Mobile */}
      <div className="bg-maroon-900 dark:bg-maroon-950 text-saffron-100 py-2 px-4 text-xs md:text-sm hidden md:block transition-colors duration-300 z-50 relative border-b border-maroon-800 dark:border-maroon-900">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 animate-fade-in">
            <span className="flex items-center gap-1 hover:text-white transition-colors duration-300"><Phone size={14} /> 045-222XXXX</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors duration-300"><MapPin size={14} /> {t('address')}</span>
          </div>
          <div className="flex gap-4 items-center animate-fade-in">
            <div className="flex gap-3 border-r border-maroon-800 pr-4">
              <a href="#" className="hover:text-white hover:scale-110 transition-transform duration-300"><Facebook size={16} /></a>
              <a href="#" className="hover:text-white hover:scale-110 transition-transform duration-300"><Youtube size={16} /></a>
            </div>
            {/* Toggles */}
            <button onClick={toggleLang} className="flex items-center gap-1 text-xs hover:text-white font-medium uppercase hover:scale-105 transition-transform duration-300">
              <Globe size={14} /> {lang === 'si' ? 'English' : 'සිංහල'}
            </button>
            <button onClick={toggleTheme} className="hover:text-white hover:rotate-12 transition-transform duration-300">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 animate-fade-in-down bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-all duration-500 shadow-sm dark:shadow-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group flex-1 max-w-[70%] md:max-w-none">
              <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-saffron-500/30 rounded-full blur-xl group-hover:bg-saffron-500/50 transition-all duration-500"></div>
                
                {/* Custom Vector Logo */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md transform group-hover:scale-105 transition-transform duration-500">
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFC107" />
                      <stop offset="100%" stopColor="#FF8F00" />
                    </linearGradient>
                    <linearGradient id="maroonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5D101D" />
                      <stop offset="100%" stopColor="#3E0A13" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer Background Circle */}
                  <circle cx="100" cy="100" r="95" fill="url(#maroonGradient)" stroke="url(#goldGradient)" strokeWidth="3" />
                  
                  {/* Decorative Inner Ring */}
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#FFC107" strokeWidth="1.5" strokeDasharray="4 3" className="opacity-50" />

                  {/* Dharma Chakra / Lotus Stylized */}
                  <g transform="translate(100 100)">
                      {/* Outer Rim */}
                      <circle cx="0" cy="0" r="62" fill="none" stroke="url(#goldGradient)" strokeWidth="6" />
                      {/* Center Hub */}
                      <circle cx="0" cy="0" r="18" fill="url(#goldGradient)" />
                      <circle cx="0" cy="0" r="8" fill="#5D101D" />
                      
                      {/* Spokes (8 Fold Path) */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <g key={deg} transform={`rotate(${deg})`}>
                          <rect x="-3" y="-62" width="6" height="62" rx="2" fill="url(#goldGradient)" />
                          {/* Spoke Detail */}
                          <circle cx="0" cy="-62" r="4" fill="url(#goldGradient)" />
                        </g>
                      ))}
                  </g>
                </svg>
              </div>
              
              <div className="flex flex-col justify-center overflow-hidden">
                <h1 className="text-base sm:text-lg md:text-2xl font-bold text-maroon-900 dark:text-saffron-500 font-serif leading-tight transition-colors duration-300 group-hover:text-maroon-800 dark:group-hover:text-saffron-400 truncate pr-2">
                  {lang === 'si' ? 'ශ්‍රී සුමන මහා පිරිවෙන' : 'Sri Sumana Maha Pirivena'}
                </h1>
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 tracking-wide transition-colors duration-300 hidden md:block">
                  {t('address')}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-1 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-500 font-medium group overflow-hidden text-sm xl:text-base ${
                    isActive(link.path)
                      ? 'text-maroon-900 dark:text-saffron-500 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-maroon-900 dark:hover:text-saffron-400'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-maroon-900 dark:bg-saffron-500 transition-all duration-500 ease-out ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
              <Link
                to="/admin"
                className="ml-4 px-5 py-2 border border-maroon-900 text-maroon-900 dark:border-saffron-500 dark:text-saffron-500 rounded-lg hover:bg-maroon-900 hover:text-white dark:hover:bg-saffron-600 dark:hover:text-maroon-950 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                {t('login')}
              </Link>
            </nav>

            {/* Mobile Controls & Menu Toggle */}
            <div className="lg:hidden flex items-center gap-1 sm:gap-2">
              <button 
                onClick={toggleTheme} 
                className="w-9 h-9 flex items-center justify-center text-maroon-900 dark:text-saffron-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300 active:scale-90"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              
              <button 
                onClick={toggleLang} 
                className="h-9 px-2 flex items-center justify-center text-maroon-900 dark:text-saffron-500 font-bold text-xs hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 active:scale-90 border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                aria-label="Toggle Language"
              >
                {lang === 'si' ? 'EN' : 'සිං'}
              </button>
              
              <button
                className="w-10 h-10 flex items-center justify-center text-maroon-900 dark:text-saffron-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300 active:scale-90 ml-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div 
          className={`lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 absolute w-full left-0 z-50 transition-all duration-300 ease-in-out origin-top overflow-hidden shadow-2xl ${
            isMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-2 px-4 space-y-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'bg-maroon-50 dark:bg-slate-800/80 text-maroon-900 dark:text-saffron-500 font-bold translate-x-1' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:translate-x-1'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 dark:border-slate-800 my-2 pt-2">
              <Link
                to="/admin"
                className="block px-4 py-3 rounded-lg text-maroon-900 dark:text-saffron-500 font-medium hover:bg-maroon-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                {t('admin')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow bg-pattern min-h-[calc(100vh-300px)] pt-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-maroon-900 dark:bg-slate-950 text-white pt-12 pb-6 border-t-4 border-saffron-600 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <div className="w-64 h-64 border-8 border-saffron-500 rounded-full animate-spin-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-bold font-serif mb-4 text-saffron-500">{lang === 'si' ? 'ශ්‍රී සුමන මහා පිරිවෙන' : 'Sri Sumana Maha Pirivena'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t('desc_short')}
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold mb-4 border-b border-maroon-700 inline-block pb-1">{t('links')}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-saffron-400 transition-all duration-300 hover:translate-x-2 w-fit">
                  <ChevronRight size={16} className="text-saffron-500" />
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="flex items-center gap-2 hover:text-saffron-400 transition-all duration-300 hover:translate-x-2 w-fit">
                  <ChevronRight size={16} className="text-saffron-500" />
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link to="/notices" className="flex items-center gap-2 hover:text-saffron-400 transition-all duration-300 hover:translate-x-2 w-fit">
                  <ChevronRight size={16} className="text-saffron-500" />
                  {t('notices')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-saffron-400 transition-all duration-300 hover:translate-x-2 w-fit">
                  <ChevronRight size={16} className="text-saffron-500" />
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-bold mb-4 border-b border-maroon-700 inline-block pb-1">{t('contact_us')}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="text-saffron-500 mt-1 shrink-0 group-hover:bounce-slow" />
                <span className="group-hover:text-white transition-colors duration-300">{lang === 'si' ? 'ශ්‍රී සුමන මහා පිරිවෙන' : 'Sri Sumana Maha Pirivena'},<br/>{t('address')}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-saffron-500 shrink-0 group-hover:tada" />
                <span className="group-hover:text-white transition-colors duration-300">045-222XXXX</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-maroon-800 text-center text-xs text-gray-400 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p>© {new Date().getFullYear()} Sri Sumana Maha Pirivena. {t('rights')}</p>
        </div>
      </footer>
    </div>
  );
}