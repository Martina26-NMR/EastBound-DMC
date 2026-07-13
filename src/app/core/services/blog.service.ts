import { Injectable, signal } from '@angular/core';

export interface BlogPost {
  id: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  // author: string;
  tag: 'Travel Guide' | 'Experiences' | 'Culture' | 'Food' | 'Tips' | 'Destinations';
  readTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

 featuredPost = signal<BlogPost>({
  id: 'cairo-events-2026',
  metaTitle: 'Cairo Events 2026: Shakira, Giza Shows & Top Egypt Festivals',
  metaDescription: 'Discover the biggest Cairo events in 2026, including Shakira at the Pyramids, Giza equestrian shows, and Abu Simbel Sun Festival. Plan your Egypt trip now.',
  title: 'Cairo Events 2026: The Year Egypt Became the World’s Stage',
  summary: 'No city in the world is experiencing a cultural moment quite like Cairo in 2026. From global music icons performing at the Pyramids of Giza to world-class sporting events and ancient festivals, Egypt is redefining what it means to travel for experiences.',
  image: '/images/adventure-blog.webp',
  date: 'July 9, 2026',
  // author: 'Martina',
  tag: 'Culture',
  readTime: '6 min read',
  
 
  content: `
    <p>This is not just a year filled with events—it is a year where every event takes place in a setting that carries thousands of years of history. In Cairo, the venue is as powerful as the event itself.</p>
    <p>If you are thinking about visiting Egypt, 2026 is the perfect time to do it.</p>
    
    <h2 class="fw-bold font-heading h3 mt-5 mb-3 text-brand-black border-start border-3 border-brand-red ps-3">Why Cairo Events in 2026 Are Unmissable</h2>
    <p>What makes Cairo events in 2026 truly special is not just their scale, but their uniqueness. These are not ordinary concerts or festivals held in modern arenas—they are experiences set against some of the most iconic landmarks in human history.</p>
    
    <h3 class="fw-bold mt-4 h5 mb-2 text-brand-black">Here’s what makes this year exceptional:</h5>
    <ul class="brand-list mb-4">
      <li>Events hosted at world-famous historical sites</li>
      <li>Perfect weather for outdoor experiences</li>
      <li>A mix of music, sports, and cultural festivals</li>
      <li>Limited availability of nearby accommodation</li>
    </ul>

    <h2 class="fw-bold font-heading h3 mt-5 mb-3 text-brand-black border-start border-3 border-brand-red ps-3">Shakira at the Pyramids of Giza – November 28, 2026</h2>
    <p>One of the biggest highlights of the year is the highly anticipated concert by global superstar Shakira, taking place at the Pyramids of Giza on November 28, 2026.</p>
    
    <div class="brand-info-card rounded-4 p-4 my-4 shadow-xs">
      <div class="row g-4">
        <div class="col-md-6">
          <h3 class="fw-bold h4 text-brand-black mb-3">Event Details</h4>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0 text-muted small">
            <li><strong>Date:</strong> November 28, 2026</li>
            <li><strong>Time:</strong> 8:00 PM</li>
            <li><strong>Location:</strong> Great Gate, Giza Plateau</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h3 class="fw-bold h4 text-brand-black mb-3">Entry Policy</h3>
          <ul class="list-unstyled d-flex flex-column gap-2 mb-0 text-muted small">
            <li>No tickets available at the door</li>
            <li>No re-entry allowed</li>
            <li>Minimum age 21+</li>
            <li>Strict security regulations</li>
          </ul>
        </div>
      </div>
    </div>
  `
});

  // 2. باقي قائمة المقالات الفرعية
  recentPosts = signal<BlogPost[]>([
    {
      id: 'post-1',
      title: 'Best Time to Visit Egypt: A Month by Month Guide',
      summary: 'A complete seasonal guide to weather, events, and crowds.',
      image: 'assets/images/egypt-month.jpg',
      date: 'May 12, 2026',
      // author: 'Sarah Essam',
      tag: 'Travel Guide',
      readTime: '5 min read',
      metaTitle: 'Best Time to Visit Egypt: A Month by Month Guide',
      metaDescription: 'A complete seasonal guide to weather, events, and crowds.',
      content: '<p>...</p>'
    },
    {
      id: 'post-2',
      title: 'Sailing the Nile: A Journey Like No Other',
      summary: 'Experience traditional Dahabiya luxury.',
      image: 'assets/images/nile-sail.jpg',
      date: 'May 8, 2026',
      // author: 'Martina',
      tag: 'Experiences',
      readTime: '6 min read',
      metaTitle: 'Sailing the Nile: A Journey Like No Other',
      metaDescription: 'Experience traditional Dahabiya luxury.',
      content: '<p>...</p>'
    },
    {
      id: 'post-3',
      title: 'The Stories Behind Egypt’s Ancient Symbols',
      summary: 'Uncover the hidden meanings of Ankh and Scarabs.',
      image: 'assets/images/symbols.jpg',
      date: 'May 3, 2026',
      // author: 'Admin',
      tag: 'Culture',
      readTime: '4 min read',
      metaTitle: 'The Stories Behind Egypt’s Ancient Symbols',
      metaDescription: 'Uncover the hidden meanings of Ankh and Scarabs.',
      content: '<p>...</p>'
    },
    {
      id: 'post-4',
      title: 'What to Pack for Your Trip to Egypt',
      summary: 'Essential guidelines for smart desert packing.',
      image: 'assets/images/pack.jpg',
      date: 'Apr 28, 2026',
      // author: 'Expert',
      tag: 'Tips',
      readTime: '5 min read',
      metaTitle: 'What to Pack for Your Trip to Egypt',
      metaDescription: 'Essential guidelines for smart desert packing.',
      content: '<p>...</p>'
    }
  ]);

  getPostById(id: string): BlogPost | undefined {
    if (this.featuredPost().id === id) {
      return this.featuredPost();
    }
    return this.recentPosts().find(post => post.id === id);
  }
}