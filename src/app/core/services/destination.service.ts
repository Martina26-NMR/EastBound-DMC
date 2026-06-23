// import { Injectable, signal } from '@angular/core';

// export interface Destination {
//   id: string;
//   name: string;
//   slug: string; // للـ Routing النظيف زي /destinations/egypt
//   image: string;
//   description: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DestinationService {
//   // الـ Signal المركزي للبلاد
//   private destinationsList = signal<Destination[]>([
//     {
//       id: '1',
//       name: 'Egypt',
//       slug: 'egypt',
//       image: '/images/slide 1.jpg',
//       description: 'Discover the land of Pharaohs, ancient pyramids, and the majestic Nile.'
//     },
//     {
//       id: '2',
//       name: 'Jordan',
//       slug: 'jordan',
//       image: '/images/slide 4.jpg',
//       description: 'Explore the rose-red city of Petra, Wadi Rum desert, and the Dead Sea.'
//     }
//   ]);

//   // Read-only getter عشان نقرأ منه في الـ Components
//   destinations = this.destinationsList.asReadonly();

//   // ميثود تجيب بلد معينة بالـ slug عشان صفحة الـ country-detail
//   getDestinationBySlug(slug: string) {
//     return this.destinationsList().find(d => d.slug === slug);
//   }
// }



import { Injectable, signal } from '@angular/core';

// 1️⃣ الـ Interface الخاص بالمدن/المعالم الفرعية داخل كل بلد
export interface CityDetail {
  id: string;
  name: string;
  description: string;
  image: string;
}

// 2️⃣ الـ Interface الأساسي للبلد
export interface Destination {
  id: string;
  name: string;
  slug: string; // 'egypt' أو 'jordan' للـ Routing
  headline: string;
  subtext: string;
  heroImage: string;
  cities: CityDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  
  // 3️⃣ الـ Signal المركزي اللي شايل الداتا بالملي زي الـ Design
  private destinationsData = signal<Destination[]>([
    {
      id: 'dest-egypt',
      name: 'EGYPT',
      slug: 'egypt',
      headline: 'Explore Destinations That Feel Different',
      subtext: 'From Egypt to Jordan, discover journeys designed around you.',
      heroImage: '/images/egypt-hero.webp',
      cities: [
        { id: 'cairo', name: 'Cairo', description: 'Where history meets energy', image: '/images/cities/cairo.webp' },
        { id: 'giza', name: 'Giza', description: 'Timeless wonders that inspire', image: '/images/cities/giza.webp' },
        { id: 'luxor', name: 'Luxor', description: 'Temples, Tombs and Ancient History', image: '/images/cities/luxor.webp' },
        { id: 'aswan', name: 'Aswan', description: 'Nile Beauty and Nubian Culture', image: '/images/cities/aswan.webp' },
        { id: 'red-sea', name: 'Red Sea', description: 'Dive into pure paradise', image: '/images/cities/red-sea.webp' },
        { id: 'siwa', name: 'Siwa Oasis', description: 'Desert Escape and Natural Springs', image: '/images/cities/siwa.webp' },
        { id: 'abu-simbel', name: 'Abu Simbel', description: 'Iconic Temples and History', image: '/images/cities/abu-simbel.webp' }
      ]
    },
    {
      id: 'dest-jordan',
      name: 'JORDAN',
      slug: 'jordan',
      headline: 'Discover Ancient Wonders & Timeless Culture',
      subtext: 'Unforgettable experiences across the kingdom of Jordan.',
      heroImage: '/images/jordan-hero.webp',
      cities: [
        { id: 'petra', name: 'Petra', description: 'A wonder carved in stone', image: '/images/cities/petra.webp' },
        { id: 'wadi-rum', name: 'Wadi Rum', description: 'Silence, stars, and adventure', image: '/images/cities/wadi-rum.webp' },
        { id: 'amman', name: 'Amman', description: 'A city of culture and modern life', image: '/images/cities/amman.webp' },
        { id: 'dead-sea', name: 'Dead Sea', description: 'Relax, Float and Rejuvenate', image: '/images/cities/dead-sea.webp' },
        { id: 'jerash', name: 'Jerash', description: 'Ancient Roman Ruins', image: '/images/cities/jerash.webp' },
        { id: 'aqaba', name: 'Aqaba', description: 'Red Sea Beaches and Diving', image: '/images/cities/aqaba.webp' },
        { id: 'madaba', name: 'Madaba', description: 'Mosaics and Historic Churches', image: '/images/cities/madaba.webp' }
      ]
    }
  ]);

  // Expose الـ Signal للـ Components كـ Read-only
  destinations = this.destinationsData.asReadonly();

  // 4️⃣ ميثود سريعة عشان نلقط داتا بلد واحدة بالـ Slug في الـ Country Detail
  getDestinationBySlug(slug: string): Destination | undefined {
    return this.destinationsData().find(d => d.slug.toLowerCase() === slug.toLowerCase());
  }
}