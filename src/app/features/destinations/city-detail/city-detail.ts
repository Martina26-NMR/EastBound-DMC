import { Component, inject, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DestinationService, CityDetail } from '../../../core/services/destination.service';
import { TourService, Tour } from '../../../core/services/tour.service'; 

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city-detail.html',
  styleUrl: './city-detail.scss'
})
export class CityDetailComponent {

  private destinationService = inject(DestinationService);
  private tourService        = inject(TourService);

  // ── Route inputs ─────────────────────────────────────────────────────────
  // 🔥 تم التعديل لتطابق الـ Routes بالملي لكي يلقط الأنجلر القيم تلقائياً من الـ URL
  slug     = input.required<string>(); // بيلقط مكان :slug (مثل: 'egypt' أو 'jordan')
  cityName = input.required<string>(); // بيلقط مكان :cityName (مثل: 'cairo' أو 'petra')

  // ── Active tab ───────────────────────────────────────────────────────────
  activeTab = signal<'package' | 'day-tour'>('package');

  // ── City data (from DestinationService) ─────────────────────────────────
  cityData = computed<CityDetail | undefined>(() =>
    this.destinationService.getCityBySlug(this.slug(), this.cityName())
  );

  // ── Parent country name (for breadcrumb) ────────────────────────────────
  countryName = computed(() => {
    const dest = this.destinationService.getDestinationBySlug(this.slug());
    return dest?.name ?? this.slug().toUpperCase();
  });

  // ── All tours linked to this city (from tourIds[]) ──────────────────────
  allLinkedTours = computed<Tour[]>(() => {
    const ids = this.cityData()?.tourIds ?? [];
    return ids
      .map(id => this.tourService.getTourById(id))
      .filter((t): t is Tour => t !== undefined);
  });

  // ── Filtered tours by active tab ─────────────────────────────────────────
  filteredTours = computed<Tour[]>(() =>
    this.allLinkedTours().filter(t => t.type === this.activeTab())
  );

  // ── Counts per tab (used to show/hide tabs & badge numbers) ─────────────
  packageCount  = computed(() => this.allLinkedTours().filter(t => t.type === 'package').length);
  dayTourCount  = computed(() => this.allLinkedTours().filter(t => t.type === 'day-tour').length);

  // ── Tab switch ───────────────────────────────────────────────────────────
  setTab(tab: 'package' | 'day-tour'): void {
    this.activeTab.set(tab);
  }
}