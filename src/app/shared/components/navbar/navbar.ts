import { Component, inject, PLATFORM_ID, OnInit,signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],

})
export class Navbar implements OnInit {
  // بنعمل inject للـ Platform ID الحالي
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // بنعمل تشيك: لو إحنا جوه المتصفح، استخدم window براحتك بدون أيرور
    if (isPlatformBrowser(this.platformId)) {
      
      // ⚠️ حطي الكود اللي كان ضارب عندك هنا جوه الـ If دي ⚠️
      // مثال:
      console.log(window.innerWidth); 
      
    }
  }
  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}