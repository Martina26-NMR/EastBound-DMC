import { Component, inject,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.scss']
})
export class Blog {
private blogService = inject(BlogService);

  // 1. تعريف الـ Categories اللي الـ HTML بيدور عليها
  categories = ['All Articles', 'Culture', 'Guides', 'Inspiration'];

  // 2. تتبع الـ Category الشغال حالياً (عشان الـ Active class يشتغل صح)
  activeCategory = signal<string>('All Articles');

  featured = this.blogService.featuredPost;
  recents = this.blogService.recentPosts;

  // ميثود لتغيير الـ Category لما تضغطي عليه
  selectCategory(category: string) {
    this.activeCategory.set(category);
  }
}