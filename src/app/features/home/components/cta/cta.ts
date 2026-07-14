import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.html',
  styleUrls: ['./cta.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Cta {

}