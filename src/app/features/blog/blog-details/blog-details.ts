import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss']
})
export class BlogDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  // عملنا signal يشيل المقال الحالي اللي هيتعرض
  currentPost = signal<BlogPost | undefined>(undefined);

  ngOnInit(): void {
    // التقاط الـ id من الـ URL
    const postId = this.route.snapshot.paramMap.get('id');
    
    if (postId) {
      // جلب المقال من السيرفس وتخزينه في الـ signal
      this.currentPost.set(this.blogService.getPostById(postId));
    }
  }
}