
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
    pathMatch: 'full'
  },
  {
    path: 'destinations',
    loadComponent: () =>
      import('./features/destinations/destinations')
        .then(m => m.Destinations)
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./features/about-us/about-us')
        .then(m => m.AboutUs)
  },

  {
    path: 'tailor-made',
    loadComponent: () =>
      import('./features/tailor-made/tailor-made')
        .then(m => m.TailorMade)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact')
        .then(m => m.Contact)
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./features/tours/tours')
        .then(m => m.Tours)
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog')
        .then(m => m.Blog)
  },
  {
    path: '**',
    redirectTo: ''
  }
];