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

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      console.log(window.innerWidth); 
      
    }
  }
  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}