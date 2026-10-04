export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export type BlogCategory = 'Engineering' | 'Design' | 'AI & Tech' | 'Architecture' | 'Tutorials';

export type BlogStatus = 'published' | 'draft' | 'archived';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  status: BlogStatus;
  featured: boolean;
  views: number;
  likes: number;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogFilter {
  search?: string;
  category?: string;
  status?: string;
  sortBy?: 'newest' | 'oldest' | 'views' | 'likes';
}

export interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
  totalLikes: number;
  categories: Record<string, number>;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  post?: BlogPost;
}
