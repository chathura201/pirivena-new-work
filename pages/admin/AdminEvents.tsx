import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, Edit, Search, X, MapPin, ImageIcon, Upload, Loader2 } from 'lucide-react';
import { Event } from '../../types';

const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Reset form
  useEffect(() => {
    if (!isFormOpen) {
      setEditingId(null);
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImageUrl('');
      setIsUploading(false);
    }
  }, [isFormOpen]);

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setLocation(event.location);
    setImageUrl(event.imageUrl || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setIsUploading(true);

    // Simulating upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    const eventData = {
      title,
      description,
      date,
      location,
      imageUrl: imageUrl || `https://picsum.photos/800/600?random=${Math.floor(Math.random()*100)}`
    };

    if (editingId) {
      updateEvent(editingId, eventData);
    } else {
      addEvent(eventData);
    }
    
    setIsFormOpen(false);
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Events</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Organize upcoming events and activities</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-maroon-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-maroon-800 transition-colors shadow-md active:scale-95 transform duration-100"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 mb-8 animate-slide-up relative">
          <button 
            onClick={() => setIsFormOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
          >
            <X size={24} />
          </button>

          <h3 className="font-bold text-xl mb-6 text-gray-800 dark:text-white">{editingId ? 'Edit Event' : 'Create New Event'}</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all dark:[color-scheme:dark]" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all" />
                </div>
              </div>
              
              {/* Photo Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Event Image</label>
                {!imageUrl ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg h-[46px] flex items-center justify-center cursor-pointer transition-colors ${
                        isUploading ? 'bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-600' : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-maroon-900 dark:hover:border-saffron-500'
                      }`}
                    >
                      {isUploading ? (
                        <div className="flex items-center gap-2 text-maroon-900 dark:text-saffron-500">
                          <Loader2 size={18} className="animate-spin" />
                          <span className="text-sm">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Upload size={18} />
                          <span className="text-sm">Click to upload image</span>
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
                    <div className="relative w-full h-[46px] bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 flex items-center px-2 gap-2">
                      <img src={imageUrl} alt="Preview" className="w-8 h-8 object-cover rounded" />
                      <span className="text-xs text-gray-600 dark:text-gray-300 truncate flex-grow">Image uploaded</span>
                      <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all h-32"></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-slate-800">
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
                className={`px-6 py-2.5 bg-saffron-500 text-white hover:bg-saffron-600 rounded-lg font-bold shadow-md hover:shadow-lg transition-all ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
                disabled={isUploading}
              >
                {editingId ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search events by title or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-maroon-900 outline-none shadow-sm transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden group hover:shadow-md dark:hover:shadow-slate-900/40 transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative">
               <img src={event.imageUrl || "https://picsum.photos/800/600"} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                 <button 
                    onClick={() => handleEdit(event)}
                    className="bg-white text-gray-800 p-2.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-lg transform hover:scale-110"
                    title="Edit"
                 >
                   <Edit size={20} />
                 </button>
                 <button 
                    onClick={() => {
                        if(window.confirm('Delete this event?')) deleteEvent(event.id);
                    }}
                    className="bg-white text-gray-800 p-2.5 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors shadow-lg transform hover:scale-110"
                    title="Delete"
                 >
                   <Trash2 size={20} />
                 </button>
               </div>
               <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 dark:text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                 {event.date}
               </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 leading-tight">{event.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <MapPin size={14} /> {event.location}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">{event.description}</p>
            </div>
          </div>
        ))}
        
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-800">
             <Search size={48} className="mx-auto mb-4 opacity-20" />
             <p className="text-lg font-medium">No events found.</p>
             <p className="text-sm">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;