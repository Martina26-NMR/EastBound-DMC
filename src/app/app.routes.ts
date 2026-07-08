import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
    title: 'Eastbound DMC'
  },
  {
    path: 'destinations',
    loadComponent: () =>
      import('./features/destinations/destinations')
        .then(m => m.Destinations),
    title: 'Our Destinations | Eastbound DMC'
  },
  {
    path: 'destinations/:slug',
    loadComponent: () => 
      import('./features/country-detail/country-detail').then(m => m.CountryDetail),
    title: 'Explore Destination | Eastbound DMC'
  },
 
  {
    path: 'destinations/:slug/:cityName',
    loadComponent: () => 
      import('./features/destinations/city-detail/city-detail').then(m => m.CityDetailComponent),
    title: 'Explore City | Eastbound DMC'
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
        .then(m => m.TailorMade),
    title: 'Tailor-Made Journey | Eastbound DMC'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact')
        .then(m => m.Contact),
    title: 'Contact Us | Eastbound DMC'
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./features/tours/tours')
        .then(m => m.Tours),
    title: 'Our Tours & Packages | Eastbound DMC'
  },
 
  {
   
  path: 'tours/:id', 
  loadComponent: () => import('./features/destinations/tour-detail/tour-detail').then(m => m.TourDetailComponent) ,

    title: 'Tour Details | Eastbound DMC'
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog')
        .then(m => m.Blog)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];