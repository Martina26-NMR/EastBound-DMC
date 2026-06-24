import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourService, Tour } from '../../core/services/tour.service'; 

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-detail.html',
  styleUrls: ['./country-detail.scss']
})
export class CountryDetail {
  private tourService = inject(TourService);
  slug = input.required<string>(); 

  activeTab = signal<'package' | 'day-tour'>('package');
  
  selectedCity = signal<string>('all');

  isLoading = signal<boolean>(false);
  currentSort = signal<string>('featured');

  // دالة الـ Sort الجديدة المتوافقة مع الـ HTML Dropdown
  onSortChange(sortBy: string) {
    this.isLoading.set(true);
    this.currentSort.set(sortBy);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 400);
  }

  private destinationId = computed(() => `dest-${this.slug().toLowerCase()}`);

  citiesOptions = computed(() => {
    if (this.slug().toLowerCase() === 'egypt') {
      return ['Cairo', 'Luxor', 'Aswan', 'Giza', 'Red Sea'];
    } else {
      return ['Amman', 'Petra', 'Wadi Rum', 'Dead Sea'];
    }
  });

  // 👈 إضافة داتا الـ Top Destinations للبلد المفتوح بالوصف المكتوب في الديزاين بالظبط
  topDestinationsList = computed(() => {
    if (this.slug().toLowerCase() === 'egypt') {
      return [
        { name: 'Cairo', desc: 'The Pyramids, Museums and Old Cairo', img: '/images/destinations/cairo.jpg' },
        { name: 'Luxor', desc: 'Temples, Tombs and Ancient History', img: '/images/destinations/luxor.jpg' },
        { name: 'Aswan', desc: 'Nile Beauty and Nubian Culture', img: '/images/destinations/aswan.jpg' },
        { name: 'Sharm El Sheikh', desc: 'Red Sea Beaches and Water Activities', img: '/images/destinations/sharm.jpg' }
      ];
    } else {
      return [
        { name: 'Petra', desc: 'The Rose City and UNESCO Wonder', img: '/images/destinations/petra.jpg' },
        { name: 'Wadi Rum', desc: 'Desert Adventures and Stargazing', img: '/images/destinations/wadi-rum.jpg' },
        { name: 'Dead Sea', desc: 'Relax, Float and Rejuvenate', img: '/images/destinations/dead-sea.jpg' },
        { name: 'Amman', desc: 'Culture, History and Modern Life', img: '/images/destinations/amman.jpg' }
      ];
    }
  });

  // 👈 إضافة داتا الـ Testimonial مطابقة للبلد عشان تظهر تحت
  testimonial = computed(() => {
    if (this.slug().toLowerCase() === 'egypt') {
      return {
        text: 'An amazing experience from start to finish. Everything was perfectly organized and the memories will last forever.',
        author: 'Jessica M.',
        country: 'United States'
      };
    } else {
      return {
        text: 'Our trip to Jordan was beyond incredible. The service, the places, the people – everything was perfect.',
        author: 'David K.',
        country: 'Canada'
      };
    }
  });

  filteredTours = computed(() => {
    let tours = this.tourService.getToursByDestinationAndType(this.destinationId(), this.activeTab());
    
    if (this.selectedCity() !== 'all') {
      tours = tours.filter(t => t.locations.toLowerCase().includes(this.selectedCity().toLowerCase()));
    }
    
    return tours;
  });

  setTab(type: 'package' | 'day-tour') {
    this.activeTab.set(type);
  }

  setCity(city: string) {
    this.selectedCity.set(city);
  }
}