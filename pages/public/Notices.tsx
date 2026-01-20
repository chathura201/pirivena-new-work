import React from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Calendar, AlertCircle, ChevronRight } from 'lucide-react';

const Notices: React.FC = () => {
  const { notices } = useData();
  const { t } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 dark:text-saffron-500 mb-4 animate-zoom-in">{t('notices')}</h2>
           <div className="h-1 w-20 bg-saffron-500 mx-auto rounded-full animate-fade-in-up"></div>
        </div>
        
        <div className="space-y-6">
          {notices.length > 0 ? (
            notices.map((notice, idx) => (
              <div 
                key={notice.id} 
                className={`group bg-white dark:bg-slate-800 p-5 md:p-8 rounded-2xl shadow-md border-l-[6px] ${notice.isImportant ? 'border-red-600 dark:border-red-500' : 'border-maroon-900 dark:border-saffron-600'} transition-all hover:translate-x-2 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-slate-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-saffron-500/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 relative z-10">
                   {/* Date Box */}
                   <div className="shrink-0 flex md:flex-col items-center justify-center bg-gray-50 dark:bg-slate-700/60 rounded-xl p-3 md:p-4 w-fit md:min-w-[80px] border border-gray-100 dark:border-slate-600 group-hover:border-saffron-500/30 transition-colors gap-3 md:gap-0">
                      <span className="text-xl md:text-2xl font-bold text-maroon-900 dark:text-saffron-500">{notice.date.split('-')[2]}</span>
                      <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                   </div>

                  <div className="flex-grow">
                     <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-3">
                        {notice.isImportant && (
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1">
                            <AlertCircle size={12} /> {t('important')}
                          </span>
                        )}
                        <span className="text-gray-400 dark:text-gray-400 text-xs flex items-center gap-1 font-medium">
                          <Calendar size={12} /> {notice.date}
                        </span>
                     </div>
                     <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-3 group-hover:text-maroon-900 dark:group-hover:text-saffron-400 transition-colors">{notice.title}</h3>
                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">{notice.description}</p>
                  </div>

                  <div className="hidden md:flex shrink-0 self-center">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center text-gray-400 dark:text-gray-400 group-hover:bg-maroon-900 group-hover:text-white dark:group-hover:bg-saffron-500 dark:group-hover:text-maroon-900 transition-all duration-300 transform group-hover:scale-110">
                       <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-slate-700 animate-fade-in">
              <Bell size={48} className="mx-auto text-gray-300 dark:text-slate-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t('no_notices')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;