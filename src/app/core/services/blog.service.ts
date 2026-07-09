import { Injectable, signal } from '@angular/core';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  author: string;
  tag: 'Travel Guide' | 'Experiences' | 'Culture' | 'Food' | 'Tips' | 'Destinations';
  readTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // 1. المقال الرئيسي الكبير (Featured Story)
  featuredPost = signal<BlogPost>({
    id: 'cairo-events-2026',
    title: 'Cairo Events 2026: Shakira, Giza Shows & Top Egypt Festivals',
    summary: 'No city in the world is experiencing a cultural moment quite like Cairo in 2026. From global music icons performing at the Pyramids of Giza to world-class sporting events and ancient festivals, Egypt is redefining travel.',
    image: '/images/adventure-blog.webp',
    date: 'July 9, 2026',
    author: 'Martina',
    tag: 'Culture',
    readTime: '6 min read'
  });

  // 2. باقي قائمة المقالات الفرعية
  recentPosts = signal<BlogPost[]>([
    {
      id: 'post-1',
      title: 'Best Time to Visit Egypt: A Month by Month Guide',
      summary: 'A complete seasonal guide to weather, events, and crowds.',
      image: 'assets/images/egypt-month.jpg',
      date: 'May 12, 2026',
      author: 'Sarah Essam',
      tag: 'Travel Guide',
      readTime: '5 min read'
    },
    {
      id: 'post-2',
      title: 'Sailing the Nile: A Journey Like No Other',
      summary: 'Experience traditional Dahabiya luxury.',
      image: 'assets/images/nile-sail.jpg',
      date: 'May 8, 2026',
      author: 'Martina',
      tag: 'Experiences',
      readTime: '6 min read'
    },
    {
      id: 'post-3',
      title: 'The Stories Behind Egypt’s Ancient Symbols',
      summary: 'Uncover the hidden meanings of Ankh and Scarabs.',
      image: 'assets/images/symbols.jpg',
      date: 'May 3, 2026',
      author: 'Admin',
      tag: 'Culture',
      readTime: '4 min read'
    },
    {
      id: 'post-4',
      title: 'What to Pack for Your Trip to Egypt',
      summary: 'Essential guidelines for smart desert packing.',
      image: 'assets/images/pack.jpg',
      date: 'Apr 28, 2026',
      author: 'Expert',
      tag: 'Tips',
      readTime: '5 min read'
    }
  ]);
}