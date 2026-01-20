import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, AlertCircle, Edit, Search, X } from 'lucide-react';
import { Notice } from '../../types';

const AdminNotices: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  // Reset form when opening/closing or switching modes
  useEffect(() => {
    if (!isFormOpen) {
      setEditingId(null);
      setTitle('');
      setDescription('');
      setDate('');
      setIsImportant(false);
    }
  }, [isFormOpen]);

  const handleEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setTitle(notice.title);
    setDescription(notice.description);
    setDate(notice.date);
    setIsImportant(notice.isImportant);
    setIsFormOpen(true);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    if (editingId) {
      updateNotice(editingId, {
        title,
        description,
        date,
        isImportant
      });
    } else {
      addNotice({
        title,
        description,
        date,
        isImportant
      });
    }

    setIsFormOpen(false);
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Notices</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Create and edit public announcements</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-maroon-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-maroon-800 transition-colors shadow-md active:scale-95 transform duration-100"
        >
          <Plus size={18} /> Add Notice
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
          
          <h3 className="font-bold text-xl mb-6 text-gray-800 dark:text-white">{editingId ? 'Edit Notice' : 'Create New Notice'}</h3>
          
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
                  placeholder="Ex: Exam Timetable 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input 
                  required 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all dark:[color-scheme:dark]" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-maroon-900 outline-none transition-all min-h-[120px]"
                placeholder="Enter full details of the notice..."
              ></textarea>
            </div>
            
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30 w-fit">
              <input 
                type="checkbox" 
                id="important" 
                checked={isImportant} 
                onChange={(e) => setIsImportant(e.target.checked)} 
                className="w-5 h-5 text-maroon-900 focus:ring-maroon-900 rounded border-gray-300 dark:border-slate-600 dark:bg-slate-700"
              />
              <label htmlFor="important" className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer select-none">Mark as Important (Highlighted)</label>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)} 
                className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-saffron-500 text-white hover:bg-saffron-600 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
              >
                {editingId ? 'Update Notice' : 'Publish Notice'}
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
          placeholder="Search notices..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-maroon-900 outline-none shadow-sm transition-colors"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">Date</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">Title</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">Status</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {filteredNotices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400 w-32">{notice.date}</td>
                <td className="p-4">
                  <p className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{notice.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{notice.description}</p>
                </td>
                <td className="p-4 w-32">
                  {notice.isImportant && (
                    <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-bold">
                      <AlertCircle size={12} /> Important
                    </span>
                  )}
                </td>
                <td className="p-4 text-right w-32">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(notice)}
                      className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this notice?')) deleteNotice(notice.id)
                      }}
                      className="text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredNotices.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-400 dark:text-gray-500">
                  <Search size={40} className="mx-auto mb-3 opacity-20" />
                  <p>No notices found matching your search.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotices;