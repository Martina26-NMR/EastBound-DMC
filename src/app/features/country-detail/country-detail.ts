import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourService, Tour } from '../../core/services/tour.service'; 
import { DestinationService } from '../../core/services/destination.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-detail.html',
  styleUrls: ['./country-detail.scss']
})
export class CountryDetail {
  private destinationService = inject(DestinationService);
  private tourService = inject(TourService);
  
  slug = input.required<string>(); 

  activeTab = signal<'package' | 'day-tour'>('package');
  selectedCity = signal<string>('all');
  isLoading = signal<boolean>(false);
  currentSort = signal<string>('featured');

  // 1. حساب الـ ID الخاص بالدولة لمطابقة الـ TourService
  private destinationId = computed(() => `dest-${this.slug().toLowerCase()}`);

  // 2. جلب لستة المدن الحقيقية والديناميكية بالكامل من السيرفس (تم حل التكرار وقراءة الـ Interface الموحد)
  topDestinationsList = computed(() => 
    this.destinationService.getCitiesByCountry(this.slug())
  );

  // 3. استخراج خيارات المدن للفلاتر ديناميكياً من نفس بيانات السيرفس بدل الـ Hardcoded arrays
  citiesOptions = computed(() => {
    const cities = this.topDestinationsList();
    return cities.map(c => c.name);
  });

  // 4. التقييمات (Testimonials) بناءً على الدولة الحالية
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

  // 5. الفلترة والترتيب الصحيح للرحلات
  filteredTours = computed(() => {
    let tours = this.tourService.getToursByDestinationAndType(this.destinationId(), this.activeTab());
    
    if (this.selectedCity() !== 'all') {
      tours = tours.filter(t => t.locations.toLowerCase().includes(this.selectedCity().toLowerCase()));
    }

    if (this.currentSort() === 'priceLow') {
      tours = [...tours].sort((a, b) => a.price - b.price);
    } else if (this.currentSort() === 'priceHigh') {
      tours = [...tours].sort((a, b) => b.price - a.price);
    }
    
    return tours;
  });

  // تغيير الـ Sort
  onSortChange(sortBy: 'featured' | 'priceLow' | 'priceHigh') {
    this.currentSort.set(sortBy);
  }

  // تشغيل الـ Skeleton loader عند تغيير الـ Tab
  setTab(type: 'package' | 'day-tour') {
    this.isLoading.set(true);
    this.activeTab.set(type);
    
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  // تشغيل الـ Skeleton loader عند تغيير المدينة
  setCity(city: string) {
    this.isLoading.set(true);
    this.selectedCity.set(city);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}