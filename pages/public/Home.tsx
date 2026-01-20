import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, ChevronRight, Bell, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { notices, events } = useData();
  const { t } = useTheme();

  // Get last 3 notices
  const latestNotices = notices.slice(0, 3);
  // Get upcoming 2 events
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden group">
        <div className="absolute inset-0 bg-maroon-900/40 dark:bg-black/60 z-10 transition-colors duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
        
        {/* Background Image with Slow Zoom - Static ID used for consistency */}
        <img
          src="https://picsum.photos/id/1015/1920/1080"
          alt="Pirivena Building"
          className="w-full h-full object-cover animate-zoom-in scale-100 group-hover:scale-105 transition-transform duration-[40s] ease-linear"
        />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl relative">
            {/* Decorative Floating Elements */}
            <div className="absolute -top-20 -left-20 w-32 h-32 bg-saffron-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-maroon-500/20 rounded-full blur-3xl animate-float-delayed"></div>

            <div className="mb-8 flex justify-center animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
              <div className="h-1 w-24 bg-saffron-500 rounded-full opacity-80 shadow-[0_0_20px_rgba(255,193,7,0.8)]"></div>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-wide animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {t('hero_title')}
            </h2>
            
            <p className="text-xl md:text-3xl text-saffron-100 mb-12 font-light tracking-wider animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              {t('hero_subtitle')}
            </p>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-3 bg-saffron-600/90 hover:bg-saffron-500 text-maroon-900 dark:text-maroon-950 font-bold py-4 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,179,0,0.6)] shadow-xl overflow-hidden"
              >
                <span className="relative z-10">{t('hero_btn')}</span>
                <ArrowRight size={20} className="relative z-10 animate-pulse-slow" />
                {/* Button Ripple/Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center transition-colors duration-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 via-maroon-600 to-saffron-500 animate-pulse-slow"></div>
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-saffron-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-maroon-900/10 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="container mx-auto px-4 max-w-4xl animate-fade-in-up relative z-10" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 dark:text-saffron-500 mb-8">{t('welcome_title')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-loose text-lg md:text-xl">
            {t('welcome_text')}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-maroon-900 dark:bg-saffron-500 animate-scale-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 rounded-full bg-maroon-900 dark:bg-saffron-500 opacity-60 animate-scale-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 rounded-full bg-maroon-900 dark:bg-saffron-500 opacity-30 animate-scale-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Latest Notices - Sidebar */}
        {/* Fixed: Sticky positioning now only applies to Desktop (lg) screens. On mobile, it scrolls normally. */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
          <div className="bg-gradient-to-br from-saffron-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-lg border border-saffron-100 dark:border-slate-700 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-center mb-8 border-b border-saffron-200 dark:border-slate-700 pb-4">
              <h3 className="text-2xl font-bold text-maroon-900 dark:text-saffron-400 flex items-center gap-3">
                <Bell size={24} className="text-saffron-600 animate-scale-pulse" /> {t('latest_notices')}
              </h3>
              <Link to="/notices" className="text-sm font-semibold text-saffron-700 dark:text-saffron-300 hover:text-maroon-900 transition-colors duration-300">{t('see_all')}</Link>
            </div>
            
            <div className="space-y-5">
              {latestNotices.length > 0 ? (
                latestNotices.map((notice, idx) => (
                  <div 
                    key={notice.id} 
                    className="bg-white dark:bg-slate-700/50 p-5 rounded-2xl shadow-sm border-l-4 border-maroon-800 dark:border-saffron-500 hover:shadow-lg transition-all duration-500 hover:translate-x-2 animate-fade-in-up cursor-default group"
                    style={{ animationDelay: `${0.4 + (idx * 0.2)}s` }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-400 block mb-1 group-hover:text-maroon-700 dark:group-hover:text-saffron-400 transition-colors duration-500">{notice.date}</span>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-tight">{notice.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{notice.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center italic py-4">{t('no_notices')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-2 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-slate-700 pb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <Calendar size={28} className="text-maroon-900 dark:text-saffron-500" /> {t('upcoming_events')}
            </h3>
            <Link to="/events" className="flex items-center text-maroon-900 dark:text-saffron-400 font-bold hover:text-maroon-700 group transition-all duration-300">
              {t('see_all_events')} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, idx) => (
                <div 
                  key={event.id} 
                  className="group bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-100 dark:border-slate-700 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + (idx * 0.2)}s` }}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={event.imageUrl || "https://picsum.photos/400/300"} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out filter dark:brightness-90 dark:group-hover:brightness-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80"></div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 py-2 rounded-xl text-center shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                       <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Event</span>
                       <span className="block text-sm font-extrabold text-maroon-900 dark:text-saffron-500">{event.date}</span>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute -top-6 left-6 bg-saffron-500 text-maroon-900 p-2 rounded-lg shadow-lg group-hover:rotate-6 transition-transform duration-500">
                      <Calendar size={20} />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-maroon-900 dark:group-hover:text-saffron-400 transition-colors duration-300 leading-tight">{event.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{event.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
                      <span className="text-xs font-bold text-maroon-900 dark:text-saffron-500 uppercase tracking-wider group-hover:underline">Read More</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic col-span-2 text-center py-8">{t('no_events')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;