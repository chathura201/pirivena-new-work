import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryCategory } from '../../types';
import { ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery } = useData();
  const [filter, setFilter] = useState<GalleryCategory>(GalleryCategory.ALL);

  const filteredItems = filter === GalleryCategory.ALL 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-maroon-900 dark:text-saffron-500 mb-6 animate-fade-in-down">ඡායාරූප එකතුව</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up">අප පිරිවෙණේ සුවිශේෂී අවස්ථාවන් හා මතකයන්</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {Object.values(GalleryCategory).map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-lg ${
              filter === cat
                ? 'bg-maroon-900 text-white shadow-maroon-900/30'
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
            }`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {cat === GalleryCategory.ALL ? 'සියල්ල' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative rounded-2xl overflow-hidden shadow-md cursor-pointer animate-zoom-in hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-maroon-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <span className="inline-block px-3 py-1 bg-saffron-500 text-maroon-900 text-xs font-extrabold rounded-full mb-3 uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <div className="w-8 h-1 bg-white/50 mx-auto rounded-full mt-2"></div>
                </div>
                
                <div className="absolute bottom-4 right-4 text-white/50 group-hover:text-white transition-colors transform scale-0 group-hover:scale-100 duration-300 delay-200">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-20 animate-fade-in text-lg">තෝරාගත් කාණ්ඩයේ ඡායාරූප නොමැත.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;