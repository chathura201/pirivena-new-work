import React from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const Events: React.FC = () => {
  const { events } = useData();
  const { t } = useTheme();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon-900 dark:text-saffron-500 mb-4 animate-zoom-in">{t('events')}</h2>
        <div className="h-1 w-20 bg-saffron-500 mx-auto rounded-full animate-fade-in-up"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.length > 0 ? (
          events.map((event, idx) => (
            <div 
              key={event.id} 
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col h-full animate-fade-in-up hover:-translate-y-3"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={event.imageUrl || "https://picsum.photos/800/600"} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 dark:brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40"></div>
                
                {/* Floating Date */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-maroon-900 dark:text-saffron-500 font-bold text-sm shadow-xl animate-fade-in-down" style={{ animationDelay: `${(idx * 0.15) + 0.3}s` }}>
                   <div className="flex items-center gap-2">
                     <Calendar size={16} /> {event.date}
                   </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-maroon-900 dark:group-hover:text-saffron-400 transition-colors leading-tight">{event.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6 bg-gray-50 dark:bg-slate-700/50 w-fit px-3 py-1 rounded-full">
                  <MapPin size={16} className="text-saffron-600 animate-bounce-slow" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm flex-grow mb-6">
                  {event.description}
                </p>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-700">
                   <button className="flex items-center gap-2 text-maroon-900 dark:text-saffron-500 font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all group-hover/btn">
                     More Details <ArrowRight size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-dashed border-gray-300 dark:border-slate-700 animate-fade-in">
            <Calendar size={48} className="mx-auto text-gray-300 dark:text-slate-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('no_events')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;