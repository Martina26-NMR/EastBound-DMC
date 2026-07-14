import { 
  Component, 
  AfterViewInit, 
  ElementRef, 
  inject, 
  PLATFORM_ID, 
  viewChildren 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-destinations',
  imports: [RouterLink],
  templateUrl: './home-destinations.html',
  styleUrl: './home-destinations.scss',
})
export class HomeDestinations implements AfterViewInit {

  readonly cards = viewChildren<ElementRef>('card');
  

  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.cards().forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}