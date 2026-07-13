import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.html',
  styleUrls: ['./why-us.scss']
})
export class WhyUs implements AfterViewInit {

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {

    // يمنع تشغيل الكود أثناء SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const cards =
            this.el.nativeElement.querySelectorAll('.scroll-trigger');

          cards.forEach((card: HTMLElement) => {
            card.classList.add('animate-active');
          });

          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.2
    });

    observer.observe(this.el.nativeElement);
  }
}