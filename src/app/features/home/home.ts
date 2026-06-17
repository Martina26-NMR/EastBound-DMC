import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DestinationService } from '../../core/services/destination.service';
import { TourService } from '../../core/services/tour.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private timerId: any;
  
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone); // 👈 بنعمل inject للـ Zone عشان نجبر الـ UI يتحدث
// 👈 عمل inject للـ Services
  private destinationService = inject(DestinationService);
  private tourService = inject(TourService);

  // سحب الـ Signals علطول للـ HTML
  destinations = this.destinationService.destinations;
  featuredTours = this.tourService.featuredTours;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // بنشغل الـ Interval جوه الـ Zone عشان الأنجولار يراقب التغيير ويقلب الصور فوراً
      this.ngZone.run(() => {
        this.timerId = setInterval(() => {
          this.currentSlide.update(index => (index + 1) % 3); // هيلف: 0 -> 1 -> 2 -> 0
          console.log('Current active slide:', this.currentSlide()); // 👈 حطي السطر ده عشان تشوفي في الـ Console وهي بتقلب!
        }, 5000);
      });
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}