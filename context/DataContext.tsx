import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notice, Event, GalleryItem, GalleryCategory } from '../types';

interface DataContextType {
  notices: Notice[];
  events: Event[];
  gallery: GalleryItem[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_NOTICES: Notice[] = [
  { id: '1', title: 'වර්ෂ අවසාන විභාගය', description: '2024 වර්ෂ අවසාන විභාගය දෙසැම්බර් 15 වන දින ආරම්භ වේ.', date: '2024-12-10', isImportant: true },
  { id: '2', title: 'නවක සිසුන් බඳවා ගැනීම', description: '2025 වර්ෂය සඳහා නවක සිසුන් බඳවා ගැනීම දැන් සිදු කෙරේ.', date: '2024-11-20', isImportant: false },
  { id: '3', title: 'ධර්ම දේශනාව', description: 'සෑම පසළොස්වක පොහෝ දිනකම සවස 6.00 ට.', date: '2024-11-15', isImportant: false },
];

const INITIAL_EVENTS: Event[] = [
  { id: '1', title: 'වාර්ෂික කඨින පින්කම', date: '2024-11-15', location: 'පිරිවෙණ ප්‍රධාන ශාලාව', description: 'වාර්ෂික කඨින චීවර පූජා මහෝත්සවය.', imageUrl: 'https://picsum.photos/id/20/800/600' },
  { id: '2', title: 'ත්‍යාග ප්‍රදානෝත්සවය', date: '2024-12-20', location: 'ප්‍රධාන ශාලාව', description: 'දක්ෂතා දැක්වූ සිසුන් සඳහා ත්‍යාග ප්‍රදානය.', imageUrl: 'https://picsum.photos/id/180/800/600' },
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', title: 'පිරිවෙණ භූමිය', imageUrl: 'https://picsum.photos/id/1018/800/600', category: GalleryCategory.ENVIRONMENT },
  { id: '2', title: 'දානමය පින්කම', imageUrl: 'https://picsum.photos/id/1047/800/600', category: GalleryCategory.RELIGIOUS },
  { id: '3', title: 'පන්ති කාමර', imageUrl: 'https://picsum.photos/id/143/800/600', category: GalleryCategory.ACADEMIC },
  { id: '4', title: 'ශ්‍රමදාන ව්‍යාපාරය', imageUrl: 'https://picsum.photos/id/292/800/600', category: GalleryCategory.EVENTS },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice = { ...notice, id: Math.random().toString(36).substr(2, 9) };
    setNotices([newNotice, ...notices]);
  };

  const updateNotice = (id: string, updatedNotice: Partial<Notice>) => {
    setNotices(notices.map(n => n.id === id ? { ...n, ...updatedNotice } : n));
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Math.random().toString(36).substr(2, 9) };
    setEvents([newEvent, ...events]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setGallery([newItem, ...gallery]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  return (
    <DataContext.Provider value={{
      notices, events, gallery,
      addNotice, updateNotice, deleteNotice,
      addEvent, updateEvent, deleteEvent,
      addGalleryItem, deleteGalleryItem
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};