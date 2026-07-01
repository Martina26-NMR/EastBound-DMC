import { Injectable, signal } from '@angular/core';

// ============================================
//  INTERFACES
// ============================================

/** A single city/location card shown inside a country page */
export interface CityDetail {
  id: string;
  slug: string;          // used in routing: /destinations/egypt/cairo
  name: string;
  description: string;   // short tagline shown on card
  about: string;         // longer intro paragraph shown on the city page hero
  image: string;
  tourIds: string[];     // IDs from TourService — tours that include this city
}

/** Country-level destination */
export interface Destination {
  id: string;
  name: string;
  slug: string;          // 'egypt' | 'jordan' — used in routing
  headline: string;
  subtext: string;
  heroImage: string;
  cities: CityDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  // ============================================
  //  DATA
  // ============================================
  private destinationsData = signal<Destination[]>([

    // ════════════════════════════════════════
    //  EGYPT
    // ════════════════════════════════════════
    {
      id: 'dest-egypt',
      name: 'EGYPT',
      slug: 'egypt',
      headline: 'Discover Ancient Wonders, Timeless Culture & Unforgettable Experiences',
      subtext: 'From the Pyramids of Giza to the temples of Luxor, Egypt is a journey through the story of civilization.',
      heroImage: '/images/top-egypt/cairo.webp',
      cities: [
        {
          id: 'cairo',
          slug: 'cairo',
          name: 'Cairo',
          description: 'Where history meets energy',
          about: 'Cairo is one of the great cities of the world — sprawling, loud, layered, and impossible to exhaust. It is home to the Egyptian Museum, the medieval maze of Islamic Cairo, the Coptic quarter, and, just beyond the city limits, the Pyramids of Giza rising above the desert plateau. No other city on Earth puts 5,000 years of continuous civilization in such direct reach.',
          image: '/images/top-egypt/cairo.webp',
          tourIds: [
            'tour-eg-cairo-cruise-hurghada-10d',
            'tour-eg-cairo-luxor-6d',
            'tour-eg-cairo-cruise-8d',
            'tour-eg-cairo-cruise-7d',
            'tour-eg-islamic-cairo-1d',
            'tour-eg-alexandria-1d',
            'tour-eg-fayoum-1d'
          ]
        },
        {
          id: 'giza',
          slug: 'giza',
          name: 'Giza',
          description: 'Timeless wonders that inspire',
          about: 'Giza is where ancient Egypt announces itself at its most monumental. The three pyramids of Khufu, Khafre, and Menkaure have stood on this limestone plateau for over 4,500 years, alongside the Great Sphinx — the largest monolithic statue on Earth. Just south of Cairo, Giza is also the gateway to Saqqara and Dahshur, where the entire story of pyramid architecture can be traced from its earliest experiments to its perfected form.',
          image: '/images/top-egypt/1-sunset-at-the-pyramids-giza-cairo-nick-brundle-photography.jpg',
          tourIds: [
            'tour-eg-cairo-cruise-hurghada-10d',
            'tour-eg-cairo-luxor-6d',
            'tour-eg-cairo-cruise-8d',
            'tour-eg-cairo-cruise-7d',
            'tour-eg-saqqara-dahshur-1d'
          ]
        },
        {
          id: 'luxor',
          slug: 'luxor',
          name: 'Luxor',
          description: 'History and grandeur',
          about: 'Luxor is built on the ruins of ancient Thebes, the capital of Egypt at the height of its power. The East Bank holds the colossal temple complexes of Karnak and Luxor; the West Bank is the Land of the Dead — a limestone escarpment riddled with royal tombs, including the Valley of the Kings, the Temple of Hatshepsut, and the rarely visited craftsmen\'s village of Deir el-Medina. No city in Egypt concentrates more ancient history in a smaller space.',
          image: '/images/top-egypt/luxor.webp',
          tourIds: [
            'tour-eg-cairo-cruise-hurghada-10d',
            'tour-eg-cairo-luxor-6d',
            'tour-eg-cairo-cruise-8d',
            'tour-eg-cairo-cruise-7d',
            'tour-eg-luxor-westbank-1d'
          ]
        },
        {
          id: 'aswan',
          slug: 'aswan',
          name: 'Aswan',
          description: 'Peaceful beauty on the Nile',
          about: 'Aswan is the most beautiful city on the Egyptian Nile. The river here is wide and dotted with granite islands; desert dunes come right down to the water\'s edge; and the pace is slower than anywhere else in Egypt. It is the natural starting point for a Nile cruise to Luxor, and home to Philae Temple — relocated block by block by UNESCO after the construction of the High Dam — and the Nubian villages on the west bank, where one of Africa\'s oldest continuous cultures still lives vividly and proudly.',
          image: '/images/top-egypt/aswan.webp',
          tourIds: [
            'tour-eg-cairo-cruise-hurghada-10d',
            'tour-eg-cairo-cruise-8d',
            'tour-eg-cairo-cruise-7d',
            'tour-eg-aswan-1d'
          ]
        },
        // {
        //   id: 'siwa',
        //   slug: 'siwa',
        //   name: 'Siwa Oasis',
        //   description: 'Desert Escape and Natural Springs',
        //   about: 'Siwa Oasis sits deep in the Western Desert, close to the Libyan border — remote, quiet, and unlike anywhere else in Egypt. The ancient Oracle Temple here was visited by Alexander the Great himself; the salt lakes and freshwater springs are surrounded by date palms and olive groves; and the local Siwan culture, with its own Berber language and traditions, has remained largely intact for centuries. Siwa is for the traveler who wants to go beyond the standard Egypt itinerary and find something genuinely different.',
        //   image: '/images/cities/siwa.webp',
        //   tourIds: [] // no current tour package — Siwa is a standalone destination for custom itineraries
        // },
        {
          id: 'Hurghada',
          slug: 'Hurghada',
          name: 'Hurghada',
          description: 'Dive into pure paradise',
          about: 'The Egyptian Red Sea coast — stretching from Hurghada in the north to Marsa Alam in the south — is one of the finest marine environments in the world. The coral reefs here are among the most biodiverse in the Mediterranean basin, the water is clear, and the diving and snorkeling are world-class. Hurghada makes a natural extension to any Egypt itinerary, offering a few days of beach relaxation after the intensity of Cairo, Luxor, and Aswan.',
          image: '/images/top-egypt/HURGHADA.webp',
          tourIds: [
            'tour-eg-cairo-cruise-hurghada-10d'
          ]
        },
      ]
    },

    // ════════════════════════════════════════
    //  JORDAN
    // ════════════════════════════════════════
    {
      id: 'dest-jordan',
      name: 'JORDAN',
      slug: 'jordan',
      headline: 'Discover Ancient Wonders, Timeless Culture & Unforgettable Experiences',
      subtext: 'From the rose-red city of Petra to the silence of Wadi Rum, Jordan packs extraordinary geography into a small and welcoming country.',
      heroImage: '/images/top-jordan/petra.webp',
      cities: [
        {
          id: 'petra',
          slug: 'petra',
          name: 'Petra',
          description: 'A wonder carved in stone',
          about: 'Petra is one of the New Seven Wonders of the World and one of the most extraordinary archaeological sites on Earth. The ancient Nabataean city was carved into rose-red sandstone cliffs over 2,000 years ago — its most famous facade, the Treasury, revealed at the end of the narrow Siq canyon in a moment that stops most visitors mid-step. Beyond the Treasury, Petra expands into a full ancient city: the Royal Tombs, the Colonnaded Street, the Theatre, and the Monastery — a facade even larger than the Treasury, reached by 850 rock-cut steps.',
          image: '/images/top-jordan/petra.webp',
          tourIds: [
            'tour-jo-amman-petra-wadirum-4d',
            'tour-jo-petra-3d',
            'tour-jo-petra-deadsea-wadirum-5d',
            'tour-jo-jerash-ajloun-7d',
            'tour-jo-timeless-6d'
          ]
        },
        {
          id: 'wadi-rum',
          slug: 'wadi-rum',
          name: 'Wadi Rum',
          description: 'Silence, stars, and adventure',
          about: 'Wadi Rum is a UNESCO World Heritage Site of approximately 720 square kilometers — a vast protected desert reserve of red sandstone mountains, sand dunes, and ancient Nabataean inscriptions in southwestern Jordan. It has been used as a stand-in for Mars in multiple Hollywood productions, and standing inside it, the comparison feels like a simple observation rather than a creative one. The Bedouin tribes who have lived here for centuries guide visitors through jeep tours, camel rides, and overnight camps under one of the clearest night skies in the Middle East.',
          image: '/images/top-jordan/wadirum.webp',
          tourIds: [
            'tour-jo-amman-petra-wadirum-4d',
            'tour-jo-petra-deadsea-wadirum-5d',
            'tour-jo-jerash-ajloun-7d',
            'tour-jo-timeless-6d',
            'tour-jo-wadirum-1d'
          ]
        },
        {
          id: 'amman',
          slug: 'amman',
          name: 'Amman',
          description: 'A city of culture and modern life',
          about: 'Amman is one of the most livable capitals in the Arab world — a city of hills, good food, and a particular ease that makes it a natural starting and ending point for any Jordan itinerary. The Roman Theatre, built into the hillside in the 2nd century AD, and the Citadel above it — occupied since the Bronze Age — give the city an ancient core. The Weibdeh and Jabal Amman neighborhoods offer some of the best restaurants, galleries, and coffee shops in the region. Most travelers pass through Amman; the ones who stay an extra day rarely regret it.',
          image: '/images/top-jordan/amman.webp',
          tourIds: [
            'tour-jo-amman-petra-wadirum-4d',
            'tour-jo-petra-3d',
            'tour-jo-petra-deadsea-wadirum-5d',
            'tour-jo-jerash-ajloun-7d',
            'tour-jo-timeless-6d',
            'tour-jo-main-hotsprings-1d'
          ]
        },
        {
          id: 'dead-sea',
          slug: 'dead-sea',
          name: 'Dead Sea',
          description: 'Relax, Float and Rejuvenate',
          about: 'The Dead Sea sits 430 meters below sea level — the lowest point on Earth — and floating in its mineral-rich water is as strange and specific as everyone says. The salinity, ten times that of normal seawater, makes sinking physically impossible. The mineral-rich black mud along the shoreline has been used for skin treatment since antiquity. The afternoon light on the water and the mountains of the West Bank visible on the far shore make this one of those experiences that is impossible to describe adequately and very easy to remember.',
          image: '/images/top-jordan/dead sea.webp',
          tourIds: [
            'tour-jo-amman-petra-wadirum-4d',
            'tour-jo-petra-deadsea-wadirum-5d',
            'tour-jo-jerash-ajloun-7d',
            'tour-jo-timeless-6d'
          ]
        },
        {
          id: 'jerash',
          slug: 'jerash',
          name: 'Jerash',
          description: 'Ancient Roman Ruins',
          about: 'Jerash contains one of the best-preserved Greco-Roman cities in the world — and it sits just an hour north of Amman. The colonnaded Cardo Maximus stretches 800 meters, still paved with original Roman stones bearing the wheel ruts of ancient carts. The oval forum, temples of Zeus and Artemis, and Hadrian\'s triumphal arch form a city that housed 20,000 people at its 2nd-century peak. Unlike many ancient sites, Jerash is immediately adjacent to a living modern town — and crossing between the two, with a knowledgeable local guide, is where the experience moves from impressive to genuinely human.',
          image: '/images/top-jordan/jerash.webp',
          tourIds: [
            'tour-jo-jerash-ajloun-7d',
            'tour-jo-timeless-6d',
            'tour-jo-jerash-1d'
          ]
        },
        {
          id: 'aqaba',
          slug: 'aqaba',
          name: 'Aqaba',
          description: 'Red Sea Beaches and Diving',
          about: 'Aqaba sits at the northern tip of the Red Sea, where Jordan, Israel, Egypt, and Saudi Arabia converge at one of the most diverse marine ecosystems in the world. The coral reefs here are exceptional — world-class for diving and snorkeling — and the city itself has a relaxed, sun-bleached character quite unlike Amman. It is Jordan\'s only sea outlet, and the combination of desert mountains behind and clear Red Sea water in front creates a setting that is unlike anything else in the country.',
          image: '/images/top-jordan/aqaba.webp',
          tourIds: [
            'tour-jo-aqaba-fishing-1d'
          ]
        }
        // {
        //   id: 'madaba',
        //   slug: 'madaba',
        //   name: 'Madaba',
        //   description: 'Mosaics and Historic Churches',
        //   about: 'Madaba is known as the City of Mosaics — and the 6th-century Byzantine mosaic map of the Holy Land preserved in the floor of St. George\'s Church is the most famous example of a tradition that runs through dozens of churches and public buildings across the city. A short drive from Amman, Madaba is usually combined with a visit to Mount Nebo — where Moses is said to have looked out over the Promised Land — and makes a natural first stop on the road south toward Petra.',
        //   image: '/images/cities/madaba.webp',
        //   tourIds: [
        //     'tour-jo-petra-deadsea-wadirum-5d',
        //     'tour-jo-jerash-ajloun-7d',
        //     'tour-jo-timeless-6d'
        //   ]
        // }
      ]
    }
  ]);

  // Expose as read-only
  destinations = this.destinationsData.asReadonly();

  // ============================================
  //  METHODS
  // ============================================


  getDestinationBySlug(slug: string): Destination | undefined {
  if (!slug) return undefined; // 👈 سطر الأمان لمنع الـ TypeError تماماً

  return this.destinationsData().find(d =>
    d.slug.toLowerCase() === slug.toLowerCase()
  );
}

  /** Get a single city by country slug + city slug — used in city detail page */
  getCityBySlug(countrySlug: string, citySlug: string): CityDetail | undefined {
    const destination = this.getDestinationBySlug(countrySlug);
    return destination?.cities.find(c =>
      c.slug.toLowerCase() === citySlug.toLowerCase()
    );
  }

  /** Get all cities for a given country — used in destinations listing */
  getCitiesByCountry(countrySlug: string): CityDetail[] {
    return this.getDestinationBySlug(countrySlug)?.cities ?? [];
  }
}