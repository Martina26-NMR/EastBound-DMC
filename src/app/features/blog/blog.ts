import { Component, inject } from '@angular/core';
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
  blogService = inject(BlogService);
  
  // تصدير الـ Signals للـ HTML مباشرة لكود أنظف وأسرع
  featured = this.blogService.featuredPost;
  recents = this.blogService.recentPosts;
  
  categories = ['All Articles', 'Travel Guides', 'Experiences', 'Culture', 'Food', 'Tips', 'Destinations'];
}