import { Component, inject, signal, computed, AfterViewInit, ElementRef, viewChildren, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 👈 استيراد الـ Checker السحري
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
  
  // 👈 لقط الـ Platform ID عشان نعرف احنا شغالين سيرفر ولا متصفح
  private platformId = inject(PLATFORM_ID);

  readonly scrollCards = viewChildren<ElementRef>('scrollCard');
  selectedFilter = signal<string>('All');
  filterOptions = ['All', 'Egypt', 'Jordan', 'Culture', 'Adventure', 'Relaxation', 'Luxury'];

  filteredCities = computed(() => {
    const currentFilter = this.selectedFilter();
    const destinations = this.allDestinations();

    let citiesList: (CityDetail & { countrySlug: string })[] = [];
    destinations.forEach(dest => {
      dest.cities.forEach(city => {
        citiesList.push({ ...city, countrySlug: dest.slug });
      });
    });

    if (currentFilter === 'All') {
      return citiesList;
    } else if (currentFilter === 'Egypt' || currentFilter === 'Jordan') {
      return citiesList.filter(city => city.countrySlug.toLowerCase() === currentFilter.toLowerCase());
    } else {
      return citiesList.filter((_, index) => index % 2 === 0);
    }
  });

  setFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  private observer!: IntersectionObserver;

  constructor() {
    effect(() => {
      const cards = this.scrollCards();
      // 👈 نتأكد إننا جوه الـ Browser برضه قبل تشغيل الـ Effect
      if (isPlatformBrowser(this.platformId) && cards.length > 0) {
        setTimeout(() => this.setupIntersectionObserver(), 50);
      }
    });
  }

  ngAfterViewInit() {
    // 👈 حماية صريحة: لو الكود شغال SSR على السيرفر اخرج فوراً ومتكملش
    if (!isPlatformBrowser(this.platformId)) return;

    this.initObserverConfig();
    this.setupIntersectionObserver();
  }

  private initObserverConfig() {
    // خطوة أمان إضافية للتأكد من أن الـ API متاح في البيئة الحالية
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