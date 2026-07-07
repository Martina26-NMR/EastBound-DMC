import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourService, Tour } from '../../core/services/tour.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tours.html',
  styleUrls: ['./tours.scss']
})
export class Tours {
  private tourService = inject(TourService);

  // ── SIGNALS FOR FILTERS ──────────────────────────────────────────────────
  selectedDestinations = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);
  selectedDurations = signal<string[]>([]);
  maxPrice = signal<number>(3000);
  sortBy = signal<string>('recommended');

  // جلب كل الرحلات من السيرفس مباشرة
  allTours = computed(() => this.tourService.tours());

  // ── FILTER LOGIC (COMPUTED) ──────────────────────────────────────────────
  filteredTours = computed(() => {
    let tours = this.allTours();

    // 1. فلترة حسب الـ Destination
    if (this.selectedDestinations().length > 0) {
      tours = tours.filter(t => 
        this.selectedDestinations().some(dest => t.destinationId.toLowerCase().includes(dest.toLowerCase()))
      );
    }

    // 2. فلترة حسب الـ Tour Type
    if (this.selectedTypes().length > 0) {
      tours = tours.filter(t => this.selectedTypes().includes(t.type)); // 'package' أو 'day-tour'
    }

    // 3. فلترة حسب الـ Duration (المدة بالأيام)
    if (this.selectedDurations().length > 0) {
      tours = tours.filter(t => {
        const days = t.durationDays; // تأكدي أن الخاصية دي موجودة كـ number في الـ interface
        return this.selectedDurations().some(range => {
          if (range === '1-3') return days >= 1 && days <= 3;
          if (range === '4-7') return days >= 4 && days <= 7;
          if (range === '8-10') return days >= 8 && days <= 10;
          if (range === '10+') return days > 10;
          return true;
        });
      });
    }

    // 4. فلترة حسب رينج السعر
    tours = tours.filter(t => t.price <= this.maxPrice());

    // 5. الترتيب (Sorting)
    if (this.sortBy() === 'priceLow') {
      tours = [...tours].sort((a, b) => a.price - b.price);
    } else if (this.sortBy() === 'priceHigh') {
      tours = [...tours].sort((a, b) => b.price - a.price);
    }

    return tours;
  });

  // ── TOGGLE FILTER METHODS ────────────────────────────────────────────────
  toggleDestination(dest: string) {
    const current = this.selectedDestinations();
    this.selectedDestinations.set(
      current.includes(dest) ? current.filter(d => d !== dest) : [...current, dest]
    );
  }

  toggleType(type: string) {
    const current = this.selectedTypes();
    this.selectedTypes.set(
      current.includes(type) ? current.filter(t => t !== type) : [...current, type]
    );
  }

  toggleDuration(range: string) {
    const current = this.selectedDurations();
    this.selectedDurations.set(
      current.includes(range) ? current.filter(r => r !== range) : [...current, range]
    );
  }

  resetFilters() {
    this.selectedDestinations.set([]);
    this.selectedTypes.set([]);
    this.selectedDurations.set([]);
    this.maxPrice.set(3000);
    this.sortBy.set('recommended');
  }
}