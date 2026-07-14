import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  feedback: string;
  destination: string;
  rating: number;
  locationPhoto: string; // صورة الوجهة (خلفية البوست كارد)
  avatar: string;        // صورة المسافر (جوه طابع البريد)
  dateSent: string;      // تاريخ تجميلي على الختم
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Testimonials implements OnInit {

  @ViewChild('postcardWrapper') postcardWrapper!: ElementRef;

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Family Tour',
      feedback: 'Our trip to Egypt was flawlessly organized! The custom itinerary captured everything we wanted, from private tour guides at the Pyramids to a luxury Nile cruise.',
      destination: 'Giza, Egypt',
      rating: 5,
      locationPhoto: '/images/top-egypt/1-sunset-at-the-pyramids-giza-cairo-nick-brundle-photography.jpg',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      dateSent: '12.04.2026'
    },
    {
      id: 2,
      name: 'Matteo Rossi',
      role: 'Solo Adventure',
      feedback: 'Exploring Petra and camping in Wadi Rum was a dream come true. EASTBOUND DMC handled every detail with extreme professionalism. Truly premium service!',
      destination: 'Wadi Rum, Jordan',
      rating: 5,
      locationPhoto: '/images/top-jordan/wadirum.webp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      dateSent: '28.05.2026'
    },
    {
      id: 3,
      name: 'Emma Watson',
      role: 'Luxury Honeymoon',
      feedback: 'Absolute perfection. The hotels, private transfers, and personalized recommendations made our honeymoon seamless and deeply magical. We loved every second.',
      destination: 'Luxor, Egypt',
      rating: 5,
      locationPhoto: '/images/top-egypt/luxor.webp',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      dateSent: '05.07.2026'
    }
  ];

  ngOnInit(): void {}

  // أزرار التحكم الاختيارية للديسك توب
  scrollNext(): void {
    const el = this.postcardWrapper.nativeElement;
    el.scrollBy({ left: el.offsetWidth * 0.8, behavior: 'smooth' });
  }

  scrollPrev(): void {
    const el = this.postcardWrapper.nativeElement;
    el.scrollBy({ left: -el.offsetWidth * 0.8, behavior: 'smooth' });
  }
}