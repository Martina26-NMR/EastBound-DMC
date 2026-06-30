import { Component, inject, signal, computed, AfterViewInit, ElementRef, viewChildren, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DestinationService, CityDetail } from '../../core/services/destination.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destinations.html',
  styleUrls: ['./destinations.scss']
})
export class Destinations implements AfterViewInit {
  
  private destinationService = inject(DestinationService);
  private allDestinations = this.destinationService.destinations;
  private platformId = inject(PLATFORM_ID);

  readonly scrollCards = viewChildren<ElementRef>('scrollCard');
  
  // فلاتر البلاد المستقلة العلوية
  selectedCountry = signal<string>('All');
  countryFilters = ['All', 'Egypt', 'Jordan'];

  // فلاتر التصنيفات الخاصة بالـ Sidebar
  selectedCategory = signal<string>('All');
  categoryFilters = ['All', 'Culture', 'Adventure', 'Relaxation', 'Luxury'];

  // التحكم في حالة الـ Sidebar الجانبي
  isSidebarOpen = signal<boolean>(false);

  // الـ Computed الذكي جداً اللي بيدمج فلترة البلد مع تصنيفات الـ Sidebar
  filteredCities = computed(() => {
    const country = this.selectedCountry();
    const category = this.selectedCategory();
    const destinations = this.allDestinations();

    let citiesList: (CityDetail & { countrySlug: string })[] = [];
    destinations.forEach(dest => {
      dest.cities.forEach(city => {
        citiesList.push({ ...city, countrySlug: dest.slug });
      });
    });

    // 1. فلترة بناء على البلد أولاً
    if (country !== 'All') {
      citiesList = citiesList.filter(city => city.countrySlug.toLowerCase() === country.toLowerCase());
    }

    // 2. فلترة بناء على التصنيف القادم من الـ Sidebar (دمج الفلاتر معاً)
    if (category !== 'All') {
      // هنا الفلترة الحقيقية بتعتمد على وجود حقل الـ tags أو الفئة جوه داتا المدن عندك
      // للآن هنعمل حظر ذكي بناء على الـ Index كـ Mock، وبمجرد ربط الـ API هيشتغل فوراً على تصنيف الـ City الفعلي
      citiesList = citiesList.filter((city, index) => {
        if (category === 'Culture') return index % 2 === 0;
        if (category === 'Adventure') return index % 2 !== 0;
        return true;
      });
    }

    return citiesList;
  });

  setCountryFilter(filter: string) {
    this.selectedCountry.set(filter);
  }

  setCategoryFilter(filter: string) {
    this.selectedCategory.set(filter);
    this.toggleSidebar(false); // غلق الـ Sidebar تلقائياً بعد اختيار التصنيف لمظهر فخم ومريح لليوزر
  }

  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen.set(isOpen);
  }

  resetAllFilters() {
    this.selectedCountry.set('All');
    this.selectedCategory.set('All');
    this.toggleSidebar(false);
  }

  private observer!: IntersectionObserver;

  constructor() {
    effect(() => {
      const cards = this.scrollCards();
      if (isPlatformBrowser(this.platformId) && cards.length > 0) {
        setTimeout(() => this.setupIntersectionObserver(), 50);
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initObserverConfig();
    this.setupIntersectionObserver();
  }

  private initObserverConfig() {
    if (typeof IntersectionObserver === 'undefined') return;

    const options = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-revealed');
        }
      });
    }, options);
  }

  private setupIntersectionObserver() {
    if (!this.observer) return;
    this.scrollCards().forEach(card => {
      this.observer.unobserve(card.nativeElement);
      this.observer.observe(card.nativeElement);
    });
  }
}