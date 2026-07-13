import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. استيراد الـ CommonModule
import { TourService, Tour } from '../../../../core/services/tour.service';

@Component({
  selector: 'app-popular-tours',
  templateUrl: './popular-tours.html',
  styleUrls: ['./popular-tours.scss'],
  standalone: true, // تأكدي لو الكومبوننت standalone
  imports: [CommonModule] // 2. إضافة الـ CommonModule هنا عشان الـ *ngFor والـ [class.d-none] يشتغلوا
})
export class PopularTours implements OnInit {
  // باقي الكود بتاع الـ TS زي ما هو بدون أي تغيير...
  
  activeTab: string = 'all';
  toursList: any[] = []; 

  constructor(
    private el: ElementRef,
    private toursService: TourService 
  ) {}

  ngOnInit(): void {
    const svc: any = this.toursService;

    // 1) إذا يوجد ميثود getTours()
    if (typeof svc.getTours === 'function') {
      svc.getTours().subscribe((data: any[]) => {
        this.toursList = data;
        this.delayInitScrollObserver();
      });
      return;
    }

    // 2) إذا الخدمة تعرض Observable باسم tours$
    if (svc.tours$ && typeof svc.tours$.subscribe === 'function') {
      svc.tours$.subscribe((data: any[]) => {
        this.toursList = data;
        this.delayInitScrollObserver();
      });
      return;
    }

    // 3) إذا الخدمة تعرض Observable أو مصفوفة باسم tours
    if (svc.tours) {
      if (typeof svc.tours.subscribe === 'function') {
        svc.tours.subscribe((data: any[]) => {
          this.toursList = data;
          this.delayInitScrollObserver();
        });
      } else if (Array.isArray(svc.tours)) {
        this.toursList = svc.tours;
        this.delayInitScrollObserver();
      }
      return;
    }

    // 4) كحل افتراضي
    if (Array.isArray(svc)) {
      this.toursList = svc;
      this.delayInitScrollObserver();
      return;
    }

    console.warn('TourService: no known getTours/tours$/tours property found');
  }

  // ميثود جديدة تضمن رندرة الـ HTML أولاً قبل تشغيل الـ Observer
  private delayInitScrollObserver(): void {
    setTimeout(() => {
      this.initScrollObserver();
    }, 100); // 100ms كافية جداً لانتهاء الـ *ngFor من رص الكروت
  }

  private initScrollObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activateAnimations();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.el.nativeElement);
  }

  setTab(tabName: string): void {
    this.activeTab = tabName;
    setTimeout(() => {
      this.activateAnimations();
    }, 50);
  }

  private activateAnimations(): void {
    const cards = this.el.nativeElement.querySelectorAll('.scroll-trigger');
    cards.forEach((card: HTMLElement) => {
      card.classList.add('animate-active');
    });
  }
}