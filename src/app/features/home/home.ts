
import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { HomeDestinations } from './components/home-destinations/home-destinations';
import { WhyUs } from './components/why-us/why-us';
import { PopularTours } from './components/popular-tours/popular-tours';
import { HomeTailorMade } from './components/home-tailor-made/home-tailor-made';
import { Testimonials } from './components/testimonials/testimonials';
import { Cta } from './components/cta/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    HomeDestinations,
    WhyUs,
    PopularTours,
    HomeTailorMade,
    Testimonials,
    Cta
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}