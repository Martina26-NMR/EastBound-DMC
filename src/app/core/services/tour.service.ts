import { Injectable, signal, computed } from '@angular/core';

// ============================================
//  INTERFACES
// ============================================

/** Single day in a tour itinerary */
export interface ItineraryDay {
  day: number;
  title: string;       // e.g. "Giza Pyramids & Egyptian Museum"
  description: string; // intro line for the day
  highlights: string[]; // bullet points (places/activities visited)
}

/** Main Tour model */
export interface Tour {
  id: string;
  destinationId: string;        // 'dest-egypt' | 'dest-jordan'
  title: string;                // card title, e.g. "Classic Egypt"
  fullTitle: string;            // long SEO title, e.g. "10-Day Cairo, Nile Cruise & Hurghada Journey"
  type: 'package' | 'day-tour'; // controls which Tab the tour appears under
  durationDays: number;         // 10, 8, 7, 6 ... used for sorting/filtering
  duration: string;             // display string, e.g. '10 Days / 9 Nights'
  locations: string;            // 'Cairo, Luxor, Aswan, Hurghada'
  price: number;
  image: string;
  isFeatured: boolean;
  rating?: number;
  reviewsCount?: number;
  featuredTag: string;

  // ── Rich content (used in Tour Details page) ──
  summary: string;              // short intro paragraph
  whyChoose: string[];          // "Why choose this itinerary" bullet points
  itinerary: ItineraryDay[];
  travelTips: string[];

  // ── Day-tour specific (optional, used when type === 'day-tour') ──
  startPoint?: string;          // e.g. 'Amman' — where the day trip departs from
  tourDurationHours?: string;   // e.g. '4-6 Hours' — actual time on the activity
}

@Injectable({
  providedIn: 'root'
})
export class TourService {

  // ============================================
  //  MOCK DATA — EGYPT (4 Packages) + JORDAN (5 Packages)
  // ============================================
  private toursData = signal<Tour[]>([

    // ════════════════════════════════════════
    //  EGYPT TOURS
    // ════════════════════════════════════════
    {
      id: 'tour-eg-cairo-cruise-hurghada-10d',
      destinationId: 'dest-egypt',
      title: 'Cairo, Nile Cruise & Hurghada',
      fullTitle: '10-Day Cairo, Nile Cruise & Hurghada Journey',
      type: 'package',
      durationDays: 10,
      duration: '10 Days / 9 Nights',
      locations: 'Cairo, Aswan, Luxor, Hurghada',
      price: 1450,
      image: '/images/tours/egypt-cairo-cruise-hurghada.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 88,
      featuredTag: 'Best Seller',
      summary: 'A 10-day Egypt itinerary that combines Cairo, a Nile cruise, and Hurghada offers one of the most enriching ways to experience the country. This well-balanced journey allows travelers to explore Egypt\u2019s most iconic ancient landmarks, sail through the timeless Nile Valley between Aswan and Luxor, and unwind on the stunning beaches of the Red Sea.',
      whyChoose: [
        'Exploring the Pyramids of Giza and Cairo\u2019s cultural treasures',
        'Cruising the Nile River between Aswan and Luxor',
        'Relaxing along the Red Sea coast'
      ],
      itinerary: [
        { day: 1,  title: 'Arrival in Cairo', description: 'Arrive at Cairo International Airport, where you will be greeted and assisted by a representative.', highlights: ['Transfer to your hotel', 'Check-in and relax after your journey', 'Free evening at leisure'] },
        { day: 2,  title: 'Giza Pyramids & Egyptian Museum', description: 'Begin your journey into ancient Egypt.', highlights: ['Great Pyramid of Khufu', 'Pyramid of Khafre', 'Pyramid of Menkaure', 'The Great Sphinx', 'Egyptian Museum & Tutankhamun treasures'] },
        { day: 3,  title: 'Aswan & Nile Cruise Embarkation', description: 'Transfer to Cairo Airport for your flight to Aswan.', highlights: ['Aswan High Dam', 'Unfinished Obelisk', 'Philae Temple', 'Board Nile cruise & dinner onboard'] },
        { day: 4,  title: 'Kom Ombo & Edfu Temples', description: 'Sail along the Nile and visit two remarkable temples.', highlights: ['Kom Ombo Temple (Sobek & Horus)', 'Temple of Horus in Edfu', 'Sail toward Luxor'] },
        { day: 5,  title: 'Luxor East Bank', description: 'Discover Luxor\u2019s East Bank.', highlights: ['Karnak Temple Complex', 'Luxor Temple'] },
        { day: 6,  title: 'West Bank & Transfer to Hurghada', description: 'Explore Luxor\u2019s West Bank before heading to the Red Sea.', highlights: ['Valley of the Kings', 'Temple of Queen Hatshepsut', 'Colossi of Memnon', 'Disembark & transfer to Hurghada'] },
        { day: 7,  title: 'Red Sea Leisure', description: 'Enjoy a relaxing day in Hurghada.', highlights: ['Snorkeling in coral reefs', 'Boat trips to nearby islands', 'Scuba diving', 'Beach relaxation'] },
        { day: 8,  title: 'Optional Adventures', description: 'A free day to explore Hurghada or join optional excursions.', highlights: ['Desert safari by quad bike or 4x4', 'Snorkeling trip to Giftun Island', 'Glass-bottom boat tours'] },
        { day: 9,  title: 'Return to Cairo', description: 'Transfer back to Cairo by flight or private vehicle.', highlights: ['Hotel check-in', 'Free evening for shopping or sightseeing'] },
        { day: 10, title: 'Departure', description: 'Transfer to Cairo International Airport for your final departure.', highlights: [] },
      ],
      travelTips: [
        'The best time to visit Egypt is from October to April',
        'Wear light clothing and comfortable shoes',
        'Stay hydrated, especially during sightseeing',
        'Choose experienced guides for deeper insights'
      ]
    },

    {
      id: 'tour-eg-cairo-luxor-6d',
      destinationId: 'dest-egypt',
      title: 'Jewels of Cairo & Luxor',
      fullTitle: 'Jewels of Cairo & Luxor: A 6-Day Journey Through Egypt\u2019s Timeless Wonders',
      type: 'package',
      durationDays: 6,
      duration: '6 Days / 5 Nights',
      locations: 'Cairo, Luxor',
      price: 1090,
      image: '/images/tours/egypt-cairo-luxor.webp',
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 76,
      featuredTag: 'Best Seller',
      summary: 'The Jewels of Cairo & Luxor tour is a perfectly crafted 6-day Egypt itinerary that brings together the country\u2019s most iconic highlights in one seamless experience. From the legendary Pyramids of Giza and the cutting-edge Grand Egyptian Museum to the awe-inspiring temples and royal tombs of Luxor, this journey is designed for travelers who want to see the very best of Egypt\u2014without compromise.',
      whyChoose: [
        'Combines Cairo and Luxor within a short, well-organized timeframe',
        'Domestic flights maximize sightseeing time',
        'Rich blend of ancient history and modern museum experience'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Cairo', description: 'Arrive at Cairo International Airport and transfer to your hotel.', highlights: ['Free time at leisure', 'Optional Nile dinner cruise in the evening'] },
        { day: 2, title: 'Giza Pyramids & Grand Egyptian Museum', description: 'Explore the world-famous Giza Plateau.', highlights: ['The Great Pyramid of Khufu', 'The Pyramid of Khafre', 'The Pyramid of Menkaure', 'The Great Sphinx', 'Grand Egyptian Museum'] },
        { day: 3, title: 'Coptic & Islamic Cairo', description: 'Discover the spiritual and historical layers of Cairo.', highlights: ['Coptic Cairo (Hanging Church, Ben Ezra Synagogue)', 'Citadel of Salah El-Din', 'Mosque of Mohamed Ali', 'Khan El Khalili Bazaar'] },
        { day: 4, title: 'Flight to Luxor (East Bank)', description: 'Fly to Luxor and begin exploring the East Bank.', highlights: ['Karnak Temple Complex', 'Luxor Temple'] },
        { day: 5, title: 'Luxor West Bank', description: 'Step into the world of the pharaohs.', highlights: ['Valley of the Kings', 'Temple of Queen Hatshepsut', 'Colossi of Memnon', 'Optional felucca ride on the Nile'] },
        { day: 6, title: 'Departure', description: 'Fly from Luxor back to Cairo to connect with your international departure flight.', highlights: [] },
      ],
      travelTips: [
        'Best time to visit: October to April for pleasant weather',
        'Domestic flights help maximize your time',
        'Wear light, breathable clothing and comfortable walking shoes',
        'Consider a felucca ride in Luxor for a peaceful Nile experience'
      ]
    },

    {
      id: 'tour-eg-cairo-cruise-8d',
      destinationId: 'dest-egypt',
      title: 'Cairo & Nile Cruise',
      fullTitle: '8-Day Cairo & Nile Cruise Tour: Discover Egypt\u2019s Timeless Wonders',
      type: 'package',
      durationDays: 8,
      duration: '8 Days / 7 Nights',
      locations: 'Cairo, Aswan, Luxor',
      price: 1250,
      image: '/images/tours/egypt-cairo-cruise-8d.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 120,
      featuredTag: 'Best Seller',
      summary: 'An 8-day Cairo & Nile Cruise tour offers one of the most complete and rewarding ways to experience Egypt. Within just eight days, you\u2019ll explore the iconic Pyramids of Giza, discover the treasures of the Grand Egyptian Museum, wander through historic Cairo, and sail the legendary Nile from Aswan to Luxor.',
      whyChoose: [
        'Ideal for first-time visitors wanting a smooth, well-organized program',
        'Domestic flights reduce transit time and maximize exploration',
        'Balanced mix of history, culture, and relaxation'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Cairo', description: 'Arrive at Cairo International Airport and transfer to your hotel.', highlights: ['Free time to relax after your journey'] },
        { day: 2, title: 'Giza Pyramids & Grand Egyptian Museum', description: 'Begin your exploration of ancient Egypt.', highlights: ['Pyramids of Khufu, Khafre, and Menkaure', 'The Great Sphinx', 'Grand Egyptian Museum (GEM)'] },
        { day: 3, title: 'Citadel, Old Cairo & Khan El Khalili', description: 'Discover Cairo\u2019s rich cultural layers.', highlights: ['Citadel of Salah El-Din', 'Mosque of Mohamed Ali', 'Old and Coptic Cairo', 'Khan El Khalili Bazaar'] },
        { day: 4, title: 'Fly to Aswan & Nile Cruise Embarkation', description: 'Domestic flight to Aswan and cruise check-in.', highlights: ['Aswan High Dam', 'Unfinished Obelisk', 'Philae Temple', 'Board Nile cruise'] },
        { day: 5, title: 'Kom Ombo & Edfu Temples', description: 'Sail along the Nile and explore two unique temples.', highlights: ['Kom Ombo Temple', 'Temple of Horus in Edfu'] },
        { day: 6, title: 'Karnak & Luxor Temples', description: 'Arrive in Luxor and visit its grand temples.', highlights: ['Karnak Temple Complex', 'Luxor Temple'] },
        { day: 7, title: 'Luxor West Bank & Return to Cairo', description: 'Explore the West Bank then fly back to Cairo.', highlights: ['Valley of the Kings', 'Temple of Queen Hatshepsut', 'Colossi of Memnon'] },
        { day: 8, title: 'Final Departure', description: 'Transfer to Cairo International Airport for your departure flight.', highlights: [] },
      ],
      travelTips: [
        'Best time to visit: October to April for pleasant weather',
        'Domestic flights help maximize your time',
        'Bring comfortable walking shoes and light clothing',
        'Consider optional excursions for a more personalized trip'
      ]
    },

    {
      id: 'tour-eg-cairo-cruise-7d',
      destinationId: 'dest-egypt',
      title: 'Cairo & Nile Cruise (7 Days)',
      fullTitle: '7-Day Cairo & Nile Cruise Tour: A Complete Journey Through Ancient Egypt',
      type: 'package',
      durationDays: 7,
      duration: '7 Days / 6 Nights',
      locations: 'Cairo, Aswan, Luxor',
      price: 1150,
      image: '/images/tours/egypt-cairo-cruise-7d.webp',
      isFeatured: false,
      rating: 4.8,
      reviewsCount: 64,
      featuredTag: 'Popular Choice',
      summary: 'A 7-day Cairo & Nile Cruise tour offers the perfect blend of Egypt\u2019s iconic landmarks, rich cultural heritage, and the tranquil beauty of the Nile River. Ideal for those seeking a complete Egyptian adventure within a limited timeframe.',
      whyChoose: [
        'Complete introduction to Egypt within a week',
        'Combines Cairo\u2019s energy with the elegance of a Nile cruise',
        'Visits temples in Aswan, Kom Ombo, Edfu, and Luxor'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Cairo', description: 'Arrive at Cairo International Airport and transfer to your hotel.', highlights: ['Free time to relax after your journey'] },
        { day: 2, title: 'Giza Pyramids, Grand Egyptian Museum & Khan El Khalili', description: 'Explore Egypt\u2019s ancient wonders and vibrant markets.', highlights: ['Pyramids of Khufu, Khafre, and Menkaure', 'The Great Sphinx', 'Grand Egyptian Museum', 'Khan El Khalili Bazaar'] },
        { day: 3, title: 'Fly to Aswan & Nile Cruise Embarkation', description: 'Domestic flight to Aswan and cruise check-in.', highlights: ['Aswan High Dam', 'Unfinished Obelisk', 'Philae Temple'] },
        { day: 4, title: 'Kom Ombo & Edfu Temples', description: 'Sail along the Nile and discover two remarkable temples.', highlights: ['Kom Ombo Temple', 'Temple of Horus in Edfu'] },
        { day: 5, title: 'Karnak & Luxor Temples', description: 'Arrive in Luxor and explore its grand temples.', highlights: ['Karnak Temple Complex', 'Luxor Temple'] },
        { day: 6, title: 'Luxor West Bank & Return to Cairo', description: 'Visit the West Bank then transfer back to Cairo.', highlights: ['Valley of the Kings', 'Temple of Queen Hatshepsut', 'Colossi of Memnon'] },
        { day: 7, title: 'Departure', description: 'Transfer to Cairo International Airport for your final departure.', highlights: [] },
      ],
      travelTips: [
        'Best time to visit: October to April for mild weather',
        'Bring sunscreen, hats, and comfortable walking shoes',
        'Optional felucca rides or cultural shows add depth to the experience',
        'Carry small cash for markets and tipping'
      ]
    },

    // ════════════════════════════════════════
    //  EGYPT DAY TOURS
    // ════════════════════════════════════════

    {
      id: 'tour-eg-islamic-cairo-1d',
      destinationId: 'dest-egypt',
      title: 'Islamic Cairo Walking Tour',
      fullTitle: 'Islamic Cairo: A Journey Through the City of a Thousand Minarets',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Cairo',
      price: 65,
      image: '/images/tours/egypt-islamic-cairo-day.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 47,
      featuredTag: 'Best Seller',
      startPoint: 'Cairo',
      tourDurationHours: 'Full Day (6-8 Hours)',
      summary: 'Islamic Cairo is one of those places that stays with you long after you leave. The streets are narrow, the buildings are old, and everywhere you turn there is something that makes you stop and look twice — a carved wooden door, a minaret rising above the rooftops, a courtyard hidden behind a wall you almost walked past without noticing.',
      whyChoose: [
        'Al-Azhar Mosque — one of the oldest universities in the world, still active today',
        'Walk the full length of Al-Muizz Street, continuously inhabited since the 10th century',
        'Discover Beit El Sehimy — a hidden 17th-century merchant house most visitors miss entirely'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Islamic Cairo Full Day',
          description: 'A walking journey through the oldest district of Cairo, from Al-Azhar to Khan el-Khalili.',
          highlights: [
            'Al-Azhar Mosque (970 AD) — one of the world\'s oldest universities',
            'Al-Muizz Street — the spine of Islamic Cairo since the 10th century',
            'Bab Al-Fetouh & Bab Zuweila — the northern and southern city gates',
            'Beit El Sehimy — a 17th-century merchant\'s house with mashrabiya screens',
            'Khan el-Khalili Bazaar — founded 1382 as a Silk Road trading post',
            'Coffee at Al-Fishawi café — open continuously for over 200 years'
          ]
        }
      ],
      travelTips: [
        'Wear comfortable, closed shoes — the cobblestones on Al-Muizz Street are uneven',
        'Cover your shoulders and knees before entering any mosque',
        'Visit in the morning when the light is best and crowds are smaller',
        'Bring cash in Egyptian pounds for the market and for tips',
        'Go with a local guide — the stories behind the buildings make everything more interesting'
      ]
    },

    {
      id: 'tour-eg-saqqara-dahshur-1d',
      destinationId: 'dest-egypt',
      title: 'Saqqara, Dahshur & Memphis',
      fullTitle: 'Saqqara, Dahshur, and Memphis: Walking Through the Birth of Architecture',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Giza, Cairo',
      price: 75,
      image: '/images/tours/egypt-saqqara-dahshur-day.webp',
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 33,
      featuredTag: 'Hidden Gem',
      startPoint: 'Cairo',
      tourDurationHours: 'Full Day (7-8 Hours)',
      summary: 'Most visitors to Egypt spend their time in Giza — but 30 kilometers south of Cairo, three sites sit close enough to visit in a single day, and together they tell a story that Giza alone cannot: how Egyptian architecture was invented, tested, and perfected over roughly two centuries.',
      whyChoose: [
        'The Step Pyramid of Saqqara — the oldest monumental stone structure in the world (2650 BC)',
        'The Bent Pyramid at Dahshur — visible proof of ancient trial and error mid-construction',
        'Memphis open-air museum — colossal Ramses II statue and the finest alabaster sphinx in Egypt'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Saqqara, Dahshur & Memphis Day Trip',
          description: 'Three sites, one continuous story: the invention and perfection of the Egyptian pyramid.',
          highlights: [
            'Saqqara — Step Pyramid of Djoser (2650 BC), oldest monumental stone structure in the world',
            'Saqqara — entrance colonnade, the earliest use of stone columns in history',
            'Dahshur — the Bent Pyramid, structural problem corrected mid-construction',
            'Dahshur — the Red Pyramid, first true smooth-sided pyramid ever completed',
            'Red Pyramid interior chambers — corbelled ceilings in ancient silence',
            'Memphis open-air museum — colossal Ramses II statue & alabaster sphinx'
          ]
        }
      ],
      travelTips: [
        'Start at Saqqara in the early morning when the light and temperature are at their best',
        'Move to Dahshur around midday — the sites are compact and crowds are minimal',
        'Finish at Memphis in the early afternoon before returning to Cairo',
        'A private guide is essential — the three sites together tell one continuous story'
      ]
    },

    {
      id: 'tour-eg-fayoum-1d',
      destinationId: 'dest-egypt',
      title: 'El Fayoum Oasis Day Trip',
      fullTitle: 'El Fayoum Oasis: A Journey to Egypt\'s Hidden Desert Gem',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Cairo',
      price: 85,
      image: '/images/tours/egypt-fayoum-day.webp',
      isFeatured: false,
      rating: 4.8,
      reviewsCount: 28,
      featuredTag: 'Hidden Gem',
      startPoint: 'Cairo',
      tourDurationHours: 'Full Day (9-10 Hours)',
      summary: 'An hour and a half southwest of Cairo, the landscape changes completely. The desert gives way to green fields, palm groves, and a vast shallow lake that has been sustaining life in this basin for over four thousand years. El Fayoum is not a typical tourist destination — and that is precisely what makes it worth the trip.',
      whyChoose: [
        'Wadi El Hitan (Valley of the Whales) — a UNESCO World Heritage Site with 40-million-year-old fossilized whales on the desert floor',
        'Egypt\'s only natural waterfall at Wadi El Rayan, hidden in the Western Desert',
        'The pottery village of Tunis — a quiet creative community above Lake Qarun'
      ],
      itinerary: [
        {
          day: 1,
          title: 'El Fayoum Oasis Full Day',
          description: 'A journey into Egypt\'s most surprising and least-visited landscape.',
          highlights: [
            'Lake Qarun — saltwater remnant of the ancient Lake Moeris',
            'Wadi El Rayan — Egypt\'s only natural waterfall, set in a desert reserve',
            'Wildlife spotting: sand foxes, Egyptian mongoose, migratory birds',
            'Wadi El Hitan — walk among complete fossilized whale skeletons up to 18m long',
            'Village of Tunis — traditional pottery workshops above the lake'
          ]
        }
      ],
      travelTips: [
        'Best visited October through April',
        'Private car essential — a 4x4 is required for Wadi El Hitan',
        'Combine with an overnight stay in Tunis village for the full experience',
        'Excellent for birdwatching during spring and autumn migration'
      ]
    },

    {
      id: 'tour-eg-alexandria-1d',
      destinationId: 'dest-egypt',
      title: 'Alexandria Day Trip from Cairo',
      fullTitle: 'From Cairo to Alexandria: A Perfect Day Trip to the Bride of the Mediterranean',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Cairo',
      price: 90,
      image: '/images/tours/egypt-alexandria-day.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 52,
      featuredTag: 'Best Seller',
      startPoint: 'Cairo',
      tourDurationHours: 'Full Day (10-11 Hours)',
      summary: 'Two and a half hours north of Cairo, the desert ends and the Mediterranean begins. Alexandria is everything Cairo is not — open, breezy, seafront, and carrying a completely different kind of history. Founded by Alexander the Great in 331 BC, it was for centuries the intellectual capital of the ancient world.',
      whyChoose: [
        'Catacombs of Kom El Shoqafa — an underground wonder blending Egyptian, Greek & Roman art traditions',
        'Fresh Mediterranean seafood lunch on the Eastern Harbour',
        'The modern Bibliotheca Alexandrina on the site of the ancient library'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Alexandria Full Day Trip',
          description: 'A journey from Cairo to the Mediterranean, through layers of Greco-Roman history.',
          highlights: [
            'Pompey\'s Pillar — 27-meter red granite column, 297 AD',
            'Catacombs of Kom El Shoqafa — 2nd century AD, three levels of underground chambers',
            'Unique blend of Egyptian, Greek & Roman burial art found nowhere else',
            'Seafood lunch on the Eastern Harbour',
            'Bibliotheca Alexandrina — modern library on the site of the ancient one',
            'Walk along the Corniche at golden hour'
          ]
        }
      ],
      travelTips: [
        'Private car is the most comfortable option — two and a half hours each way',
        'Train from Ramses Station is a good alternative — fast, comfortable, and scenic',
        'Visit the Catacombs early to avoid heat and crowds',
        'A full day is the minimum — do not try to compress this into half a day'
      ]
    },

    {
      id: 'tour-eg-aswan-1d',
      destinationId: 'dest-egypt',
      title: 'Aswan Highlights Day Tour',
      fullTitle: 'Aswan: The Timeless Grace of the Egyptian Nile',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Aswan',
      price: 70,
      image: '/images/tours/egypt-aswan-day.webp',
      isFeatured: false,
      rating: 4.9,
      reviewsCount: 41,
      featuredTag: 'Unmissable',
      startPoint: 'Aswan',
      tourDurationHours: 'Full Day (6-8 Hours)',
      summary: 'Of all the cities along the Nile, Aswan is the one that stays with you longest. It is quieter than Luxor, slower than Cairo, and more beautiful than either. The river here is wide, scattered with granite islands, and flanked by desert dunes that come right down to the water\'s edge.',
      whyChoose: [
        'Philae Temple — an entire temple complex dismantled and relocated by UNESCO, approached by boat',
        'Visit a Nubian village on the west bank — a culture that has preserved itself through everything',
        'Felucca at sunset — the best single hour anywhere on the Nile'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Aswan Full Day',
          description: 'Ancient monuments, living Nubian culture, and a sunset on the Nile.',
          highlights: [
            'Philae Temple — relocated by UNESCO block by block, approached by boat on the Nile',
            'Aswan High Dam — engineering marvel controlling the Nile since 1970',
            'Unfinished Obelisk — 1,200-tonne monument abandoned mid-carving in the quarry',
            'Nubian village of Gharb Soheil — vivid painted houses, mint tea, and genuine hospitality',
            'Felucca ride at sunset — the best hour in Aswan'
          ]
        }
      ],
      travelTips: [
        'Two days minimum to cover the main sites comfortably',
        'Visit Philae early morning before the tour boats arrive',
        'October through March is the ideal season',
        'Aswan is the natural starting or ending point for a Nile cruise to Luxor'
      ]
    },

    {
      id: 'tour-eg-luxor-westbank-1d',
      destinationId: 'dest-egypt',
      title: 'Luxor West Bank Hidden Gems',
      fullTitle: 'The Silent Side of Thebes: Discovering the West Bank\'s Hidden Gems',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Luxor',
      price: 75,
      image: '/images/tours/egypt-luxor-westbank-day.webp',
      isFeatured: false,
      rating: 4.9,
      reviewsCount: 38,
      featuredTag: 'Expert Pick',
      startPoint: 'Luxor',
      tourDurationHours: 'Full Day (7-8 Hours)',
      summary: 'Most visitors to Luxor spend their time on the East Bank. But cross the Nile to the West Bank and the city changes completely. The noise drops away, the roads narrow, and the landscape opens into something that feels genuinely ancient — a long limestone escarpment riddled with tombs cut into the rock for over three thousand years.',
      whyChoose: [
        'Deir el-Medina — tombs of the craftsmen who built the royal tombs, rarely visited and deeply personal',
        'Medinet Habu — better preserved than most West Bank sites, nearly empty in the late afternoon',
        'Valley of the Kings beyond the famous tombs — Seti I and Ramses III for those who go further'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Luxor West Bank Full Day',
          description: 'The ancient world\'s greatest concentration of royal tombs and mortuary temples.',
          highlights: [
            'Valley of the Kings — including Seti I and Ramses III tombs (extra ticket)',
            'Deir el-Medina — the craftsmen\'s village that built the royal tombs',
            'Intimate personal tombs of the ancient artists, rarely visited by tourists',
            'Temple of Hatshepsut at Deir el-Bahari — three colonnaded terraces against the cliff face',
            'Medinet Habu — mortuary temple of Ramses III, best preserved on the West Bank',
            'Colossi of Memnon at sunrise'
          ]
        }
      ],
      travelTips: [
        'Start at 6am — the Valley of the Kings gets crowded by mid-morning',
        'Buy extra tomb tickets on site for access to Seti I and Nefertari when available',
        'Deir el-Medina and Medinet Habu are best saved for late afternoon',
        'A full day is the minimum — two days allows for a genuinely unhurried visit',
        'Hire a local guide — the West Bank\'s history is layered and rewards expert storytelling'
      ]
    },

    // ════════════════════════════════════════
    //  JORDAN TOURS
    // ════════════════════════════════════════
    {
      id: 'tour-jo-amman-petra-wadirum-4d',
      destinationId: 'dest-jordan',
      title: 'Petra & Wadi Rum Adventure',
      fullTitle: '4-Day Jordan Exploration Tour: Petra, Dead Sea and Wadi Rum',
      type: 'package',
      durationDays: 4,
      duration: '4 Days / 3 Nights',
      locations: 'Amman, Petra, Wadi Rum, Dead Sea',
      price: 750,
      image: '/images/tours/jordan-petra-wadirum-4d.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 112,
      featuredTag: 'Best Seller',
      summary: 'Four days is exactly enough time to see the best of Jordan without rushing any of it. This itinerary moves through three of the most extraordinary landscapes in the Middle East in a sequence that builds naturally from one experience to the next.',
      whyChoose: [
        'Covers Amman, Dead Sea, Petra, and Wadi Rum in one seamless trip',
        'Builds naturally from culture to relaxation to adventure',
        'Overnight desert camp under a sky with no light pollution'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Amman', description: 'Spend the afternoon discovering Amman\u2019s ancient heart.', highlights: ['Roman Theatre', 'The Citadel, Temple of Hercules & Umayyad Palace', 'Dinner in the Weibdeh neighborhood'] },
        { day: 2, title: 'The Dead Sea', description: 'Float in the lowest point on Earth, 430 meters below sea level.', highlights: ['Floating in the mineral-rich water', 'Mineral mud treatment on the shoreline', 'Afternoon light over the West Bank mountains'] },
        { day: 3, title: 'Petra', description: 'Walk through the Siq into the ancient Nabataean city.', highlights: ['The Siq canyon entrance', 'Al-Khazneh (The Treasury)', 'Royal Tombs & Colonnaded Street', 'Optional climb to the Monastery'] },
        { day: 4, title: 'Wadi Rum', description: 'Move south into the open red desert.', highlights: ['Jeep tour with a Bedouin driver', 'Rock arches, sand dunes, Lawrence\u2019s Spring', 'Overnight desert camp'] },
      ],
      travelTips: [
        'Best season: March through May and September through November',
        'Comfortable walking shoes essential for Petra',
        'Purchase the Jordan Pass before arrival',
        'Private transport between sites strongly recommended'
      ]
    },

    {
      id: 'tour-jo-petra-3d',
      destinationId: 'dest-jordan',
      title: 'Jordan Highlights: Petra Focus',
      fullTitle: 'Our 3-Day Jordan Highlights Tour',
      type: 'package',
      durationDays: 3,
      duration: '3 Days / 2 Nights',
      locations: 'Amman, Petra',
      price: 590,
      image: '/images/tours/jordan-petra-3d.webp',
      isFeatured: false,
      rating: 4.7,
      reviewsCount: 41,
      featuredTag: 'Quick Getaway',
      summary: 'Built for travelers who want to experience Petra \u2014 one of the New Seven Wonders of the World \u2014 without the stress of complicated logistics. Whether on a weekend escape or adding leisure days to a business trip, this is the most focused way to see Jordan in limited time.',
      whyChoose: [
        'Seamless airport assistance and smooth departure transfers',
        'A full Petra day trip from Amman',
        'Most efficient way to experience Jordan in limited time'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Amman', description: 'Our representative meets you before passport control to assist with visa formalities.', highlights: ['Private transfer to your hotel', 'Rest of the day at leisure'] },
        { day: 2, title: 'Petra', description: 'A private car takes you south to the ancient Nabataean city.', highlights: ['Walk through the Siq', 'The Treasury', 'Street of Facades', 'Royal Tombs & Colonnaded Street', 'Optional climb to the Monastery'] },
        { day: 3, title: 'Departure', description: 'Breakfast at the hotel, free time, then private transfer to the airport.', highlights: [] },
      ],
      travelTips: [
        'Currency: Jordanian Dinar \u2014 cash recommended for markets',
        'Best Season: Spring and autumn',
        'Comfortable walking shoes and plenty of water for Petra',
        'SIM cards available at the airport, Wi-Fi in all hotels'
      ]
    },

    {
      id: 'tour-jo-petra-deadsea-wadirum-5d',
      destinationId: 'dest-jordan',
      title: 'Best of Jordan',
      fullTitle: '5-Day Best of Jordan Tour: Petra, Dead Sea and Wadi Rum',
      type: 'package',
      durationDays: 5,
      duration: '5 Days / 4 Nights',
      locations: 'Amman, Madaba, Petra, Wadi Rum, Dead Sea',
      price: 890,
      image: '/images/tours/jordan-best-of-5d.webp',
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 98,
      featuredTag: 'Best Seller',
      summary: 'Jordan packs an extraordinary amount into a small geography \u2014 ancient cities carved into rock, the lowest point on Earth, and one of the most dramatic desert landscapes in the Middle East. This five-day itinerary covers all of it in a sequence that moves naturally from history to nature to pure desert wilderness.',
      whyChoose: [
        'Covers Madaba, Mount Nebo, Dead Sea, Petra, Little Petra and Wadi Rum',
        'Visits Little Petra \u2014 quieter and less visited than its famous neighbor',
        'Traditional Bedouin dinner & overnight desert camp'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Amman', description: 'Assistance with visa and immigration formalities, then private transfer to your hotel.', highlights: ['Rest of the day at leisure'] },
        { day: 2, title: 'Madaba \u2014 Mount Nebo \u2014 Dead Sea', description: 'A morning of mosaics and biblical views, an afternoon of floating.', highlights: ['Byzantine mosaic map at St. George\u2019s Church', 'Mount Nebo views across the Jordan Valley', 'Floating & mineral mud at the Dead Sea'] },
        { day: 3, title: 'Petra', description: 'Walk through the Siq into the legendary Treasury.', highlights: ['The Siq canyon', 'The Treasury', 'Colonnaded Street, Royal Tombs, Theatre', 'Optional climb to the Monastery'] },
        { day: 4, title: 'Little Petra \u2014 Wadi Rum', description: 'A quieter Nabataean site, then the open desert.', highlights: ['Little Petra carved facades', 'Two-hour jeep tour of Wadi Rum', 'Traditional Bedouin dinner & overnight desert camp'] },
        { day: 5, title: 'Departure', description: 'Breakfast at camp, then transfer to Amman Airport for departure.', highlights: [] },
      ],
      travelTips: [
        'Petra: Sturdy shoes and plenty of water \u2014 the Monastery climb is worth it',
        'Dead Sea: Avoid shaving beforehand and protect your eyes from the salt water',
        'Best Season: Spring and autumn',
        'Tipping is customary and appreciated by guides and drivers'
      ]
    },

    {
      id: 'tour-jo-jerash-ajloun-7d',
      destinationId: 'dest-jordan',
      title: "Jordan's Majestic Journey",
      fullTitle: "7-Day Jordan's Majestic Journey: the Complete Jordan Experience",
      type: 'package',
      durationDays: 7,
      duration: '7 Days / 6 Nights',
      locations: 'Amman, Jerash, Ajloun, Madaba, Petra, Wadi Rum, Dead Sea',
      price: 1290,
      image: '/images/tours/jordan-majestic-7d.webp',
      isFeatured: false,
      rating: 4.9,
      reviewsCount: 53,
      featuredTag: 'Luxury Itinerary',
      summary: 'One week is the ideal amount of time to see Jordan properly. This itinerary covers Petra, Wadi Rum, the Dead Sea, Jerash, Ajloun, and Amman in a sequence that flows naturally, balancing history, nature, and culture without rushing any of it.',
      whyChoose: [
        'The most complete Jordan itinerary available',
        'Includes Jerash, one of the best-preserved Greco-Roman cities in the world',
        'Ends with an Amman city tour and Rainbow Street'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Amman', description: 'Assistance with visa and immigration, then private transfer to your hotel.', highlights: [] },
        { day: 2, title: 'Jerash and Ajloun', description: 'A Greco-Roman city and a 12th-century fortress.', highlights: ['Colonnaded streets & Oval Plaza', "Hadrian's Arch & Temple of Artemis", 'Ajloun Castle'] },
        { day: 3, title: 'Madaba \u2014 Mount Nebo \u2014 Dead Sea', description: 'Mosaics, biblical views, and the Dead Sea.', highlights: ["St. George's Church mosaic map", 'Mount Nebo views', 'Floating at the Dead Sea'] },
        { day: 4, title: 'Petra', description: 'A full day exploring the ancient Nabataean city.', highlights: ['The Siq & The Treasury', 'Royal Tombs, Theatre, Colonnaded Street', 'Optional climb to the Monastery'] },
        { day: 5, title: 'Little Petra and Wadi Rum', description: 'A quieter site followed by desert adventure.', highlights: ['Little Petra', 'Two-hour jeep tour of Wadi Rum', 'Overnight desert camp'] },
        { day: 6, title: 'Wadi Rum \u2014 Amman City Tour', description: 'Return to Amman and explore its historic core.', highlights: ['The Citadel & Temple of Hercules', 'Umayyad Palace & Roman Theatre', 'Downtown markets & Rainbow Street'] },
        { day: 7, title: 'Departure', description: 'Private transfer to Queen Alia International Airport.', highlights: [] },
      ],
      travelTips: [
        'Best Season: Spring and autumn',
        'Dead Sea: Avoid shaving beforehand, protect your eyes from the salt water',
        'Petra: Comfortable walking shoes essential',
        'Currency: Jordanian Dinar \u2014 cash useful for markets, cards accepted in hotels'
      ]
    },

    {
      id: 'tour-jo-timeless-6d',
      destinationId: 'dest-jordan',
      title: 'Jordan Timeless Wonders',
      fullTitle: '6-Day Jordan Timeless Wonders Tour',
      type: 'package',
      durationDays: 6,
      duration: '6 Days / 5 Nights',
      locations: 'Amman, Jerash, Ajloun, Madaba, Petra, Wadi Rum, Dead Sea',
      price: 1150,
      image: '/images/tours/jordan-timeless-6d.webp',
      isFeatured: false,
      rating: 4.7,
      reviewsCount: 39,
      featuredTag: 'Luxury Itinerary',
      summary: "Six days is the ideal amount of time to experience Jordan's full range \u2014 Roman cities, biblical landmarks, Petra, Wadi Rum, and the Dead Sea \u2014 at a pace that feels unhurried and complete.",
      whyChoose: [
        'A near-complete Jordan experience in six well-paced days',
        'Travels the scenic King\u2019s Highway from Madaba to Petra',
        'Combines desert camp and Dead Sea relaxation back to back'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Amman', description: 'Assistance with visa formalities, then private transfer to your hotel.', highlights: [] },
        { day: 2, title: 'Jerash and Ajloun Castle', description: 'One of the best-preserved Roman cities in the world.', highlights: ['Colonnaded streets, Oval Plaza', "Hadrian's Arch, Temple of Artemis", 'Ajloun Castle'] },
        { day: 3, title: 'Madaba \u2014 Mount Nebo \u2014 Petra', description: 'Mosaics, biblical views, then the scenic King\u2019s Highway south.', highlights: ['St. George\u2019s Church mosaic map', 'Mount Nebo views', 'Drive to Wadi Musa'] },
        { day: 4, title: 'Petra and Wadi Rum', description: 'A full morning in Petra, then desert adventure.', highlights: ['The Siq, Treasury, Royal Tombs', 'Afternoon drive to Wadi Rum', 'Overnight desert camp'] },
        { day: 5, title: 'Wadi Rum Jeep Tour \u2014 Dead Sea', description: 'Morning desert safari, afternoon at the lowest point on Earth.', highlights: ['Two-hour jeep safari', 'Floating & mineral mud at the Dead Sea'] },
        { day: 6, title: 'Departure', description: 'Relaxed morning before private transfer to Amman Airport.', highlights: [] },
      ],
      travelTips: [
        'Best Season: Spring and autumn for comfortable temperatures',
        'Petra: Sturdy walking shoes essential',
        'Dead Sea: Avoid shaving beforehand, protect your eyes from the salt water',
        'Currency: Jordanian Dinar \u2014 cards accepted in hotels, cash useful for markets'
      ]
    },

    // ════════════════════════════════════════
    //  JORDAN DAY TOURS
    // ════════════════════════════════════════
    {
      id: 'tour-jo-main-hotsprings-1d',
      destinationId: 'dest-jordan',
      title: "Ma'in Hot Springs Day Escape",
      fullTitle: "Amman to Ma'in Hot Springs: A Perfect Day Escape",
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: "Amman, Ma'in",
      price: 95,
      image: '/images/tours/jordan-main-hotsprings.webp',
      isFeatured: false,
      rating: 4.6,
      reviewsCount: 27,
      featuredTag: 'Nature Escape',
      startPoint: 'Amman',
      tourDurationHours: 'Full Day (approx. 6-7 Hours)',
      summary: "Less than an hour south of Amman, the landscape drops dramatically into a deep valley carved by centuries of mineral-rich water cutting through the Jordanian highlands. Ma'in Hot Springs sits at the bottom of that descent \u2014 a natural thermal complex where waterfalls of hot mineral water cascade directly from the cliff face into pools below.",
      whyChoose: [
        'One of the most accessible natural escapes from Amman',
        'Therapeutic mineral water with a 2,000-year-old history',
        'Easily combined with a Dead Sea or Madaba extension'
      ],
      itinerary: [
        { day: 1, title: "Amman to Ma'in Hot Springs", description: 'A scenic drive south from Amman, descending into the valley through a series of switchbacks.', highlights: ["Views of the Dead Sea on the descent", "Main thermal waterfall pool", "Ma'in Hot Springs Resort pools & spa facilities", 'Optional extension to the Dead Sea or Madaba'] },
      ],
      travelTips: [
        'The drive from Amman takes approximately 50 minutes by private car',
        'Arrive early \u2014 the resort gets busy on weekends and public holidays',
        'Bring a swimsuit, towel, and sandals',
        'The outdoor waterfall area is free; the resort pools require a day pass',
        'Water shoes are useful for the rocky areas around the natural falls'
      ]
    },

    {
      id: 'tour-jo-wadirum-1d',
      destinationId: 'dest-jordan',
      title: 'Wadi Rum Desert Day Tour',
      fullTitle: 'Explore the Moon Valley of Wadi Rum: A Journey Beyond Earth',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Wadi Rum',
      price: 80,
      image: '/images/tours/jordan-wadirum-day.webp',
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 64,
      featuredTag: 'Best Seller',
      startPoint: 'Amman or Aqaba',
      tourDurationHours: 'Half Day or Full Day',
      summary: "There are landscapes that look like they belong on another planet \u2014 and then there is Wadi Rum, which actually has been used as one. The vast protected desert reserve in southern Jordan has stood in for Mars in multiple Hollywood productions, and standing inside it, the comparison feels less like a creative choice and more like a simple observation.",
      whyChoose: [
        'UNESCO World Heritage Site of approximately 720 square kilometers',
        'Guided by Bedouin drivers who know every hidden spring and canyon',
        'Option to extend into an overnight stargazing camp experience'
      ],
      itinerary: [
        { day: 1, title: 'Wadi Rum Jeep Tour', description: 'A jeep tour with a Bedouin driver covering the main highlights of the desert.', highlights: ["Lawrence's Spring", 'Khazali Canyon', 'Red sand dunes', 'Natural rock arches & ancient Nabataean inscriptions'] },
      ],
      travelTips: [
        'Approximately 4 hours from Amman, 1 hour from Aqaba',
        'A licensed Bedouin guide is strongly recommended',
        'Book overnight camps well in advance during peak season',
        'Best visited October through April',
        'Bring layers \u2014 desert nights are cold even when days are warm'
      ]
    },

    {
      id: 'tour-jo-jerash-1d',
      destinationId: 'dest-jordan',
      title: 'Jerash Local Cultural Experience',
      fullTitle: 'Full Day with Locals in Jerash: Authentic Cultural Experience in Jordan',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Jerash',
      price: 70,
      image: '/images/tours/jordan-jerash-day.webp',
      isFeatured: false,
      rating: 4.8,
      reviewsCount: 19,
      featuredTag: 'Cultural Experience',
      startPoint: 'Amman',
      tourDurationHours: 'Full Day (approx. 7-8 Hours)',
      summary: 'Jerash sits about an hour north of Amman, and it contains one of the best-preserved Roman cities in the world. Most visitors come for the archaeology \u2014 and the archaeology is extraordinary \u2014 but a full day here with a local guide offers something beyond ruins: a genuine encounter with Jordanian culture.',
      whyChoose: [
        'Walk the 800-meter Cardo Maximus with original Roman paving stones',
        'Includes lunch with a local family \u2014 mansaf and fresh flatbread',
        'A local guide transforms ruins into a living story of 2,000 years'
      ],
      itinerary: [
        { day: 1, title: 'Full Day in Jerash', description: 'Morning exploration of the ancient Roman city, followed by an afternoon with the local community.', highlights: ['The Cardo Maximus colonnaded street', 'Oval Forum, Temples of Zeus and Artemis', 'Two theatres, nymphaeum & Hadrian\u2019s Arch', 'Lunch with a local family in the modern town'] },
      ],
      travelTips: [
        'One hour by private car from Amman',
        'Visit the ruins in the morning before the midday heat',
        'The Jerash Festival of Culture and Arts (summer) is worth planning around',
        'Comfortable walking shoes are essential \u2014 the site covers a large, uneven area'
      ]
    },

    {
      id: 'tour-jo-aqaba-fishing-1d',
      destinationId: 'dest-jordan',
      title: 'Aqaba Red Sea Fishing Trip',
      fullTitle: 'Fishing Trip in Aqaba: Cast Your Line in the Red Sea',
      type: 'day-tour',
      durationDays: 1,
      duration: '1 Day',
      locations: 'Aqaba',
      price: 110,
      image: '/images/tours/jordan-aqaba-fishing.webp',
      isFeatured: false,
      rating: 4.7,
      reviewsCount: 14,
      featuredTag: 'Adventure',
      startPoint: 'Aqaba Marina',
      tourDurationHours: '4-6 Hours',
      summary: 'Aqaba sits at the northern tip of the Red Sea, where Jordan, Israel, Egypt, and Saudi Arabia meet at one of the most diverse marine ecosystems in the world. Beneath the surface, the reefs that make Aqaba famous for diving also make it exceptional for fishing.',
      whyChoose: [
        'Traditional wooden boats operated by local fishermen',
        'Catch grouper, snapper, barracuda, emperor fish, and trevally',
        'Often includes snorkeling and a fresh on-board lunch from the catch'
      ],
      itinerary: [
        { day: 1, title: 'Red Sea Fishing Trip', description: 'An early-morning departure from the marina for a few hours on the water.', highlights: ['Traditional boat departure at sunrise', 'Fishing over the coral reef', 'Optional snorkeling stop', 'Fresh lunch prepared on board from the morning\u2019s catch'] },
      ],
      travelTips: [
        'Trips typically run 4 to 6 hours, departing between 6 and 8am',
        'No experience necessary \u2014 equipment and instruction provided on board',
        'Best season is October through May',
        'Combine with a snorkeling or diving session for a full day',
        'Sunscreen, a hat, and light layers for the early morning are essential'
      ]
    },
  ]);

  // Expose as read-only signal
  tours = this.toursData.asReadonly();

  // ============================================
  //  COMPUTED SIGNALS
  // ============================================
  featuredTours = computed(() => this.toursData().filter(tour => tour.isFeatured));

  // ============================================
  //  METHODS
  // ============================================

  /** Filter tours by destination + tab type (package | day-tour) */
  getToursByDestinationAndType(destinationId: string, type: 'package' | 'day-tour'): Tour[] {
    return this.toursData().filter(tour =>
      tour.destinationId === destinationId && tour.type === type
    );
  }

  /** Filter tours by city/location keyword */
  getToursByCity(cityName: string): Tour[] {
    return this.toursData().filter(tour =>
      tour.locations.toLowerCase().includes(cityName.toLowerCase())
    );
  }

  /** Get a single tour by ID (used in Tour Details page) */
  getTourById(tourId: string): Tour | undefined {
    return this.toursData().find(tour => tour.id === tourId);
  }
}