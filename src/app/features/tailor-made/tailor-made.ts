import { Component, OnInit, ElementRef, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-tailor-made',
  templateUrl: './tailor-made.html',
  styleUrls: ['./tailor-made.scss']
})
export class TailorMade implements OnInit {

  constructor(private el: ElementRef) {

    afterNextRender(() => {
      const cards = this.el.nativeElement.querySelectorAll('.reveal-card');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active'); 
            observer.unobserve(entry.target); 
          }
        });
      }, { threshold: 0.15 }); 

      cards.forEach((card: any) => observer.observe(card));
    });
  }

  ngOnInit(): void {}
}