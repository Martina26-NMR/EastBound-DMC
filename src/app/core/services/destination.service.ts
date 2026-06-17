import { Injectable, signal } from '@angular/core';

export interface Destination {
  id: string;
  name: string;
  slug: string; // للـ Routing النظيف زي /destinations/egypt
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  // الـ Signal المركزي للبلاد
  private destinationsList = signal<Destination[]>([
    {
      id: '1',
      name: 'Egypt',
      slug: 'egypt',
      image: '/images/slide 1.jpg',
      description: 'Discover the land of Pharaohs, ancient pyramids, and the majestic Nile.'
    },
    {
      id: '2',
      name: 'Jordan',
      slug: 'jordan',
      image: '/images/slide 4.jpg',
      description: 'Explore the rose-red city of Petra, Wadi Rum desert, and the Dead Sea.'
    }
  ]);

  // Read-only getter عشان نقرأ منه في الـ Components
  destinations = this.destinationsList.asReadonly();

  // ميثود تجيب بلد معينة بالـ slug عشان صفحة الـ country-detail
  getDestinationBySlug(slug: string) {
    return this.destinationsList().find(d => d.slug === slug);
  }
}