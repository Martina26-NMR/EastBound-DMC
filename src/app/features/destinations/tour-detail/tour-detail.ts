import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // ضيفنا RouterModule عشان الـ routerLink
import { CommonModule } from '@angular/common'; // 👈 الـ import ده عشان الـ ngClass
import { TourService, Tour } from '../../../core/services/tour.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.html',
  styleUrls: ['./tour-detail.scss'],
  standalone: true,      // 👈 لو الكومبوننت Standalone
  imports: [CommonModule, RouterModule] // 👈 ضيفيهم هنا عشان الـ HTML يفهم كل الـ tags والـ directives
})
export class TourDetailComponent implements OnInit {
  public router = inject(Router);
  tour: Tour | undefined;
  activeDay: number = 1; 

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService // 👈 تأكدي إنها private
  ) {}

ngOnInit(): void {
  const tourId = this.route.snapshot.paramMap.get('id');
  if (tourId) {
    // 👈 بنساوي القيمة مباشرة لأن الـ Service مش بترجع Observable
    const data = this.tourService.getTourById(tourId); 
    
    if (data) {
      this.tour = data;
    } else {
      console.error('Tour not found with the provided ID');
    }
  }
}

  toggleDay(dayNumber: number): void {
    this.activeDay = this.activeDay === dayNumber ? 0 : dayNumber;
  }
}