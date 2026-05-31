export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  avatar_url?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Novel {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  total_chapters: number;
  genre: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Rating {
  id: string;
  novel_id: string;
  user_id: string;
  rating: number; // 1-5
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  id: string;
  novel_id: string;
  user_id: string;
  title: string;
  content: string;
  rating: number; // 1-5
  helpful_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReadingList {
  id: string;
  user_id: string;
  novel_id: string;
  status: 'reading' | 'completed' | 'dropped' | 'planning';
  added_at: Date;
  updated_at: Date;
}

export interface List {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  novels: string[]; // array of novel IDs
  created_at: Date;
  updated_at: Date;
}
