import { Component, OnInit, AfterViewInit, ElementRef, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourService, Tour } from '../../../../core/services/tour.service';

@Component({
  selector: 'app-popular-tours',
  templateUrl: './popular-tours.html',
  styleUrls: ['./popular-tours.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PopularTours implements OnInit, AfterViewInit {

  activeTab = signal<'all' | 'egypt' | 'jordan'>('all');
  filteredTours: Tour[] = [];

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private el: ElementRef,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.filterTours();
  }

  // ── فلترة بناءً على isFeatured و destinationId ───────────────────────────
  filterTours(): void {
    // جلب الـ featured tours من الـ Signal مباشرة
    const featured = this.tourService.tours().filter(t => t.isFeatured);

    if (this.activeTab() === 'all') {
      // أول 2 مصر + أول 2 أردن = 4 كروت في All tab
      const egypt  = featured.filter(t => t.destinationId === 'dest-egypt').slice(0, 2);
      const jordan = featured.filter(t => t.destinationId === 'dest-jordan').slice(0, 2);
      this.filteredTours = [...egypt, ...jordan];

    } else if (this.activeTab() === 'egypt') {
      this.filteredTours = featured.filter(t => t.destinationId === 'dest-egypt').slice(0, 4);

    } else {
      this.filteredTours = featured.filter(t => t.destinationId === 'dest-jordan').slice(0, 4);
    }

    // إعادة تشغيل أنيميشن الكروت بعد كل فلترة
    this.replayAnimations();
  }

  setTab(tab: 'all' | 'egypt' | 'jordan'): void {
    if (this.activeTab() === tab) return;
    this.activeTab.set(tab);
    this.filterTours();
  }

  // ── Helper: استخراج اسم البلد من destinationId ────────────────────────────
  getCountryLabel(tour: Tour): string {
    return tour.destinationId === 'dest-egypt' ? 'Egypt' : 'Jordan';
  }

  // ── Animation helpers ─────────────────────────────────────────────────────
  private replayAnimations(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      const cards = this.el.nativeElement.querySelectorAll('.scroll-trigger');
      cards.forEach((c: HTMLElement) => c.classList.remove('animate-active'));
      setTimeout(() => {
        cards.forEach((c: HTMLElement) => c.classList.add('animate-active'));
      }, 50);
    }, 0);
  }

  ngAfterViewInit(): void {
    // IntersectionObserver موجود في الـ browser بس — مش في SSR (Node.js)
    if (!this.isBrowser) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = this.el.nativeElement.querySelectorAll('.scroll-trigger');
          cards.forEach((c: HTMLElement) => c.classList.add('animate-active'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.el.nativeElement);
  }
}