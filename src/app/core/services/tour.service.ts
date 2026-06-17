import { Injectable, signal, computed } from '@angular/core';

export interface Tour {
  id: string;
  destinationId: string; // الربط مع الـ Destination
  title: string;
  price: number;
  duration: string;
  image: string;
  isFeatured: boolean; // عشان نسحبها في الهوم بيج علطول
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private toursList = signal<Tour[]>([
    {
      id: '101',
      destinationId: '1', // تابعة لمصر
      title: 'Classic Cairo & Nile Cruise',
      price: 1250,
      duration: '8 Days',
      image: '/images/slide 1.jpg',
      isFeatured: true
    },
    {
      id: '102',
      destinationId: '2', // تابعة للأردن
      title: 'Highlights of Jordan & Petra',
      price: 1400,
      duration: '6 Days',
      image: '/images/slide 4.jpg',
      isFeatured: true
    }
  ]);

  tours = this.toursList.asReadonly();

  // 👈 ميثود سحرية بالـ Computed Signal بتجيب الرحلات المميزة للهوم بيج تلقائي
  featuredTours = computed(() => this.toursList().filter(t => t.isFeatured));

  // ميثود تجيب رحلات بلد معينة (مثلاً لما تدخلي صفحة مصر يعرض رحلات مصر بس)
  getToursByDestination(destinationId: string) {
    return this.toursList().filter(t => t.destinationId === destinationId);
  }
}