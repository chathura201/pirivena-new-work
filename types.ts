export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export enum GalleryCategory {
  ALL = 'All',
  RELIGIOUS = 'Religious',
  ACADEMIC = 'Academic',
  EVENTS = 'Events',
  ENVIRONMENT = 'Environment'
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: GalleryCategory;
}

export interface User {
  username: string;
  role: 'admin';
}