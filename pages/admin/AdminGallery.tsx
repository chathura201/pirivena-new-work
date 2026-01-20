import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryCategory } from '../../types';
import { Trash2, Plus, Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<GalleryCategory>(GalleryCategory.EVENTS);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    addGalleryItem({
      title,
      imageUrl,
      category
    });

    // Reset form
    setTitle('');
    setImageUrl('');
    setCategory(GalleryCategory.EVENTS);
    setIsFormOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size is too large (max 5MB).');
      return;
    }

    setIsUploading(true);

    // Simulating an upload service (e.g., Cloudinary) by converting to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
      }, 1500);
    };
    reader.onerror = () => {
      alert('Failed to read file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Gallery</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Upload and organize photos</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-maroon-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-maroon-800 transition-colors shadow-md active:scale-95 transform duration-100"
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />} {isFormOpen ? 'Close Form' : 'Add Photo'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 mb-8 animate-slide-up">
          <h3 className="font-bold text-xl mb-6 text-gray-800 dark:text-white">Add New Photo</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input 
                  required 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all" 
                  placeholder="Photo description"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="relative">
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                    className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(GalleryCategory).filter(c => c !== GalleryCategory.ALL).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Photo Upload</label>
              
              {!imageUrl ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isUploading 
                      ? 'bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-600' 
                      : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-maroon-900 dark:hover:border-saffron-500'
                  }`}
                >
                  {isUploading ? (
                    <div className="text-center">
                      <Loader2 size={32} className="animate-spin text-maroon-900 dark:text-saffron-500 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Processing image...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-full w-fit mx-auto mb-4">
                        <Upload size={24} className="text-gray-500 dark:text-gray-300" />
                      </div>
                      <p className="text-base font-medium text-gray-700 dark:text-gray-200">Click to upload photo</p>
                      <p className="text-sm text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                </div>
              ) : (
                <div className="relative w-full h-64 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 group">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-lg transform hover:scale-105 flex items-center gap-2"
                    >
                      <Trash2 size={18} /> Remove Photo
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)} 
                className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-6 py-2.5 bg-saffron-500 text-white rounded-lg font-bold shadow-md flex items-center gap-2 ${
                  isUploading || !imageUrl || !title ? 'opacity-50 cursor-not-allowed' : 'hover:bg-saffron-600 hover:shadow-lg'
                }`}
                disabled={isUploading || !imageUrl || !title}
              >
                {isUploading ? 'Uploading...' : 'Add Photo'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
             <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-white font-bold text-sm mb-1 leading-tight">{item.title}</span>
                <span className="text-saffron-400 text-xs font-semibold uppercase tracking-wider mb-3">{item.category}</span>
                <button 
                  onClick={() => {
                     if(window.confirm('Delete this photo?')) deleteGalleryItem(item.id);
                  }}
                  className="bg-red-600/90 text-white p-2 rounded-lg hover:bg-red-600 w-full flex items-center justify-center gap-2 transition-colors text-xs font-bold"
                >
                  <Trash2 size={14} /> Delete
                </button>
             </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800 shadow-sm">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
            <p className="text-lg font-medium">No photos in gallery</p>
            <p className="text-sm">Start by adding a new photo above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;