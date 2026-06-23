// import { Injectable, signal, computed } from '@angular/core';

// export interface Tour {
//   id: string;
//   destinationId: string; // الربط مع الـ Destination
//   title: string;
//   price: number;
//   duration: string;
//   image: string;
//   isFeatured: boolean; // عشان نسحبها في الهوم بيج علطول
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class TourService {
//   private toursList = signal<Tour[]>([
//     {
//       id: '101',
//       destinationId: '1', // تابعة لمصر
//       title: 'Classic Cairo & Nile Cruise',
//       price: 1250,
//       duration: '8 Days',
//       image: '/images/slide 1.jpg',
//       isFeatured: true
//     },
//     {
//       id: '102',
//       destinationId: '2', // تابعة للأردن
//       title: 'Highlights of Jordan & Petra',
//       price: 1400,
//       duration: '6 Days',
//       image: '/images/slide 4.jpg',
//       isFeatured: true
//     }
//   ]);

//   tours = this.toursList.asReadonly();

//   // 👈 ميثود سحرية بالـ Computed Signal بتجيب الرحلات المميزة للهوم بيج تلقائي
//   featuredTours = computed(() => this.toursList().filter(t => t.isFeatured));

//   // ميثود تجيب رحلات بلد معينة (مثلاً لما تدخلي صفحة مصر يعرض رحلات مصر بس)
//   getToursByDestination(destinationId: string) {
//     return this.toursList().filter(t => t.destinationId === destinationId);
//   }
// }


import { Injectable, signal, computed } from '@angular/core';

// 1️⃣ الـ Interface الخاص بالرحلة
export interface Tour {
  id: string;
  destinationId: string; // 'dest-egypt' أو 'dest-jordan' عشان نربطها بالبلد
  title: string;
  type: 'package' | 'day-tour'; // نوع الرحلة للـ Tabs
  duration: string; // مثلاً: '8 Days / 7 Nights' أو '1 Day'
  locations: string; // الأماكن: 'Cairo, Luxor, Aswan'
  price: number; // السعر رقم عشان لو احتاجنا نعمل فلترة بالأسعار مستقبلاً
  image: string;
  isFeatured: boolean; // عشان نسحبها في الـ Popular Tours في الهوم بيج
  rating?: number; // تقييم اختياري زي الـ (4.9) اللي في الديزاين
  reviewsCount?: number; // عدد التقييمات (120)
}

@Injectable({
  providedIn: 'root'
})
export class TourService {

  // 2️⃣ الـ Signal المركزي اللي شايل الـ Mock Data كاملة ومتطابقة مع الديزاين
  private toursData = signal<Tour[]>([
    // === رحلات مصر (Egypt Tours) ===
    {
      id: 'tour-eg-classic',
      destinationId: 'dest-egypt',
      title: 'Classic Egypt',
      type: 'package',
      duration: '8 Days / 7 Nights',
      locations: 'Cairo, Luxor, Aswan',
      price: 1250,
      image: '/images/tours/egypt-classic.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 120
    },
    {
      id: 'tour-eg-nile-cruise',
      destinationId: 'dest-egypt',
      title: 'Cairo & Nile Cruise',
      type: 'package',
      duration: '6 Days / 5 Nights',
      locations: 'Cairo, Luxor, Aswan',
      price: 1090,
      image: '/images/tours/nile-cruise.webp',
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 76
    },
    {
      id: 'tour-eg-luxury',
      destinationId: 'dest-egypt',
      title: 'Egypt Luxury Escape',
      type: 'package',
      duration: '7 Days / 6 Nights',
      locations: 'Cairo, Aswan, Red Sea',
      price: 1650,
      image: '/images/tours/egypt-luxury.webp',
      isFeatured: false,
      rating: 4.9,
      reviewsCount: 45
    },
    {
      id: 'tour-eg-pyramids-day',
      destinationId: 'dest-egypt',
      title: 'Giza Pyramids & Sphinx Day Tour',
      type: 'day-tour',
      duration: '1 Day (8 Hours)',
      locations: 'Giza, Cairo',
      price: 75,
      image: '/images/tours/pyramids-day.webp',
      isFeatured: false
    },

    // === رحلات الأردن (Jordan Tours) ===
    {
      id: 'tour-jo-classic',
      destinationId: 'dest-jordan',
      title: 'Classic Jordan',
      type: 'package',
      duration: '5 Days / 4 Nights',
      locations: 'Amman, Petra, Wadi Rum, Dead Sea',
      price: 890,
      image: '/images/tours/jordan-classic.webp',
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 98
    },
    {
      id: 'tour-jo-adventure',
      destinationId: 'dest-jordan',
      title: 'Petra & Wadi Rum Adventure',
      type: 'package',
      duration: '4 Days / 3 Nights',
      locations: 'Amman, Petra, Wadi Rum, Dead Sea',
      price: 750,
      image: '/images/tours/petra-adventure.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 112
    },
    {
      id: 'tour-jo-luxury',
      destinationId: 'dest-jordan',
      title: 'Jordan Luxury Escape',
      type: 'package',
      duration: '5 Days / 4 Nights',
      locations: 'Amman, Madaba, Bethany, Dead Sea',
      price: 1150,
      image: '/images/tours/jordan-luxury.webp',
      isFeatured: false,
      rating: 4.7,
      reviewsCount: 34
    },
    {
      id: 'tour-jo-petra-day',
      destinationId: 'dest-jordan',
      title: 'Petra Magic Day Tour from Amman',
      type: 'day-tour',
      duration: '1 Day',
      locations: 'Petra',
      price: 120,
      image: '/images/tours/petra-day.webp',
      isFeatured: false
    }
  ]);

  // Expose الـ Signal الأصلي كـ Read-only
  tours = this.toursData.asReadonly();

  // 3️⃣ الـ Computed Signal السحري عشان نسحب الـ Featured اللي هيظهروا في الهوم بيج فوراً
  featuredTours = computed(() => this.toursData().filter(tour => tour.isFeatured));

  // 4️⃣ ميثود لفلترة الرحلات بناءً على البلد ونوع الـ Tab (Package ولا Day Tour)
  getToursByDestinationAndType(destinationId: string, type: 'package' | 'day-tour'): Tour[] {
    return this.toursData().filter(tour => 
      tour.destinationId === destinationId && tour.type === type
    );
  }
}