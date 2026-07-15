import { Component, OnInit, ElementRef, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-tailor-made',
  templateUrl: './tailor-made.html',
  styleUrls: ['./tailor-made.scss']
})
export class TailorMade implements OnInit {

  // ── Values bar data ───────────────────────────────────────────────────
  values = [
    { icon: 'fa-sliders-h',   title: 'Tailor Made for You',    desc: 'Fully customized itineraries based on your preferences.' },
    { icon: 'fa-user-tie',    title: 'Expert Local Support',    desc: 'Our travel experts are with you from planning to your return.' },
    { icon: 'fa-magic',       title: 'Authentic Experiences',   desc: 'Discover hidden gems and live like a local.' },
    { icon: 'fa-user-shield', title: 'Flexible & Hassle-Free',  desc: 'We handle the details so you can enjoy your journey.' },
  ];

  // ── How it works steps ────────────────────────────────────────────────
  steps = [
    { num: 1, icon: 'far fa-comments',       title: 'Share Your Ideas',   desc: 'Tell us about your dream trip and what you love.' },
    { num: 2, icon: 'fas fa-map-marked-alt', title: 'We Plan for You',    desc: 'Our experts design a personalized itinerary just for you.' },
    { num: 3, icon: 'far fa-envelope-open',  title: 'Review & Confirm',   desc: 'Review your itinerary and make any changes.' },
    { num: 4, icon: 'fas fa-luggage-cart',   title: 'Enjoy Your Journey', desc: 'We take care of everything while you enjoy every moment.' },
    { num: 5, icon: 'fas fa-camera-retro',   title: 'Create Memories',    desc: 'Unforgettable experiences that last a lifetime.' },
  ];

  // ── Inspiration cards ─────────────────────────────────────────────────
  inspirationCards = [
    { img: '/images/cultueral.webp',      title: 'Cultural Explorer', desc: 'History, culture & iconic landmarks' },
    { img: '/images/adven seek.webp',     title: 'Adventure Seeker',  desc: 'Adventure, nature & off the beaten path' },
    { img: '/images/luxury.webp',         title: 'Luxury Escape',     desc: 'Luxury stays & premium experiences' },
    { img: '/images/family getaway.webp', title: 'Family Getaway',    desc: 'Fun activities for all ages' },
  ];

  constructor(private el: ElementRef) {
    // afterNextRender يضمن إن الكود يشتغل في الـ browser بس (مش SSR)
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