import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-tailor-made',
  templateUrl: './home-tailor-made.html',
  styleUrls: ['./home-tailor-made.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeTailorMade {
  
  cardTransform: string = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  
  // داتا الفورم الجديدة المطابقة للصورة
  planData = {
    destination: '',
    travelDates: '',
    travelersCount: null,
    travelStyle: '',
    interests: ''
  };

  onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 5; // تم تقليل زاوية الدوران لراحة أكبر أثناء إدخال البيانات
    const rotateX = -((y - yc) / yc) * 5;

    this.cardTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  }

  onMouseLeave(): void {
    this.cardTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  submitPlan(): void {
    console.log('Detailed Trip Plan Submitted:', this.planData);
    alert(`Thank you! We received your request to explore "${this.planData.destination}" and we will contact you with a customized itinerary.`);
    
    // إعادة تهيئة الفورم بعد النجاح
    this.planData = {
      destination: '',
      travelDates: '',
      travelersCount: null,
      travelStyle: '',
      interests: ''
    };
  }
}