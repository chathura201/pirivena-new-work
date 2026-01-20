import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const About: React.FC = () => {
  const { t } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-800 animate-fade-in-up">
        <div className="h-64 bg-maroon-900 relative overflow-hidden group">
          <img 
            src="https://picsum.photos/1200/400?grayscale" 
            alt="History" 
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center drop-shadow-lg animate-zoom-in">{t('about')}</h2>
          </div>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-maroon-900 dark:text-saffron-500 mb-4 font-serif">ඉතිහාසය</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              ශ්‍රී සුමන මහා පිරිවෙන රත්නපුර දිස්ත්‍රික්කයේ කීර්තිමත් බෞද්ධ අධ්‍යාපන ආයතනයකි. 
              වසර ගණනාවක ප්‍රෞඩ ඉතිහාසයකට උරුමකම් කියන මෙම ආයතනය සම්බුද්ධ ශාසනයේ අභිවෘද්ධිය උදෙසා 
              විශාල සේවාවක් ඉටු කර ඇත.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-saffron-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-saffron-500 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">දැක්ම</h4>
              <p className="text-gray-600 dark:text-gray-400 italic">"ගුණ නැණ බෙලෙන් පිරිපුන් දරු පරපුරක් දැයට දායාද කිරීම."</p>
            </div>
            <div className="bg-maroon-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-maroon-800 dark:border-maroon-600 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">මෙහෙවර</h4>
              <p className="text-gray-600 dark:text-gray-400 italic">"බෞද්ධ දර්ශනය පදනම් කරගත් ගුණාත්මක අධ්‍යාපනයක් ලබා දීම තුළින් යහපත් සමාජයක් ගොඩනැගීම."</p>
            </div>
          </div>

          <div className="animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
             <h3 className="text-2xl font-bold text-maroon-900 dark:text-saffron-500 mb-4 font-serif">ප්‍රධාන අරමුණු</h3>
             <ul className="space-y-3 text-gray-700 dark:text-gray-300">
               {['භික්ෂූන් වහන්සේලාගේ ධර්ම විනය අධ්‍යාපනය නංවාාලීම.', 'ගිහි සිසුන් සඳහා ගුණාත්මක අධ්‍යාපනයක් ලබා දීම.', 'පාරම්පරික දේශීය දැනුම සංරක්ෂණය කිරීම.', 'සාමාජීය සාරධර්ම වර්ධනය කිරීම.'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${0.7 + (idx * 0.1)}s` }}>
                    <span className="w-2 h-2 bg-saffron-500 rounded-full"></span>
                    {item}
                  </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;