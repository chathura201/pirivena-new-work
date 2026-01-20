import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'si' | 'en';
type Theme = 'light' | 'dark';

interface Translations {
  [key: string]: {
    si: string;
    en: string;
  };
}

// Translation Dictionary
export const tData: Translations = {
  // Navigation
  home: { si: 'මුල් පිටුව', en: 'Home' },
  about: { si: 'අප ගැන', en: 'About Us' },
  notices: { si: 'දැනුම්දීම්', en: 'Notices' },
  events: { si: 'උත්සව', en: 'Events' },
  gallery: { si: 'ගැලරිය', en: 'Gallery' },
  contact: { si: 'සම්බන්ධ වන්න', en: 'Contact' },
  login: { si: 'ඇතුල් වන්න', en: 'Login' },
  admin: { si: 'පරිපාලක පිවිසුම', en: 'Admin Portal' },
  
  // Footer
  address: { si: 'මුද්දුව, රත්නපුර', en: 'Mudduwa, Ratnapura' },
  desc_short: { si: 'බුද්ධ ධර්මය සහ ශාස්ත්‍රීය අධ්‍යාපනය ලබා දෙන කීර්තිමත් අධ්‍යාපන ආයතනයකි.', en: 'A prestigious educational institute providing Buddhist Dhamma and academic education.' },
  links: { si: 'සබැඳි', en: 'Quick Links' },
  contact_us: { si: 'අමතන්න', en: 'Contact Us' },
  rights: { si: 'සියලු හිමිකම් ඇවිරිණි.', en: 'All rights reserved.' },

  // Home Hero
  hero_title: { si: 'ප්‍රඥා නරානං රතනං', en: 'Wisdom is the Gem of Men' },
  hero_subtitle: { si: 'ගුණ නැණ බෙලෙන් පිරිපුන් දැයක් තනන්නට...', en: 'Building a nation filled with virtue and wisdom...' },
  hero_btn: { si: 'අප ගැන තව දැනගන්න', en: 'Learn More About Us' },
  
  // Home Sections
  welcome_title: { si: 'ශ්‍රී සුමන මහා පිරිවෙන වෙත සාදරයෙන් පිළිගනිමු', en: 'Welcome to Sri Sumana Maha Pirivena' },
  welcome_text: { 
    si: 'රත්නපුර මුද්දුව ප්‍රදේශයේ පිහිටි ඓතිහාසික පුදබිමක විරාජමානව වැජඹෙන අප පිරිවෙන, වසර ගණනාවක් පුරා ගිහි පැවිදි ශිෂ්‍යයන් දහස් ගණනකට අධ්‍යාපනය ලබා දෙමින් සම්බුද්ධ ශාසනයේ චිරස්ථිතිය උදෙසා අමිල මෙහෙවරක් ඉටු කරයි.', 
    en: 'Situated in the historic sacred grounds of Mudduwa, Ratnapura, our Pirivena has been serving a priceless mission for the perpetuity of the Sambuddha Sasana by providing education to thousands of lay and ordained students for many years.' 
  },
  latest_notices: { si: 'නවතම දැනුම්දීම්', en: 'Latest Notices' },
  see_all: { si: 'සියල්ල', en: 'See All' },
  upcoming_events: { si: 'ඉදිරි උත්සව හා කටයුතු', en: 'Upcoming Events & Activities' },
  see_all_events: { si: 'සියල්ල බලන්න', en: 'View All' },
  no_notices: { si: 'දැනුම්දීම් නොමැත.', en: 'No notices available.' },
  no_events: { si: 'ඉදිරි උත්සව නොමැත.', en: 'No upcoming events.' },

  // Generic
  read_more: { si: 'වැඩි විස්තර', en: 'Read More' },
  date: { si: 'දිනය', en: 'Date' },
  important: { si: 'වැදගත්', en: 'Important' }
};

interface ThemeContextType {
  lang: Language;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('si');
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('pirivena_theme');
      if (savedTheme) return savedTheme as Theme;
      // Default to light mode regardless of system preference
      return 'light';
    }
    return 'light';
  });

  // Apply Theme Class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pirivena_theme', theme);
  }, [theme]);

  const toggleLang = () => {
    setLang(prev => prev === 'si' ? 'en' : 'si');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    if (!tData[key]) return key;
    return tData[key][lang];
  };

  return (
    <ThemeContext.Provider value={{ lang, toggleLang, theme, toggleTheme, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};