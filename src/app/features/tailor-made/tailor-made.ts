import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tailor-made',
  templateUrl: './tailor-made.html',
  styleUrls: ['./tailor-made.scss']
})
export class TailorMade implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // التقاط جميع الكروت اللي محتاجه تظهر بالأنيميشن
    const cards = this.el.nativeElement.querySelectorAll('.reveal-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // إضافة كلاس التفعيل
          observer.unobserve(entry.target); // إيقاف المراقبة للكارت ده لتوفير الرام وسرعة الأداء
        }
      });
    }, { threshold: 0.15 }); // يشتغل لما يظهر 15% من الكارت

    cards.forEach((card: any) => observer.observe(card));
  }
}