import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogHttpService
  ) {}

  id: string = this.route.snapshot.params.id;

  // selectedBlog$: Observable<Blog> | undefined;

  blog?: Blog;

  newComment: string = '';

  ngOnInit(): void {
    this.getBlogDetails();
  }

  getBlogDetails(): void {
    // this.selectedBlog$ = this.blogService.getById(this.id)
    this.blogService
      .getById(this.id)
      .pipe(take(1))
      .subscribe(
        (blog: Blog) => {
          if (blog) {
            this.blog = blog;
          }
        },
        (error) => alert(error),
        () => console.log('getblogdetails complete')
      );
  }

  submitComment(): void {
    if (!this.newComment) {
      return;
    }
    // this.selectedBlog$ = this.blogService.postComment(this.id, this.newComment)
    this.blogService
      .postComment(this.id, this.newComment)
      .pipe(take(1))
      .subscribe(
        (likedBlog: Blog) => {
          if (this.blog) {
            this.blog.comments = likedBlog.comments;
          }
        },
        (error) => alert(error.message),
        () => (this.newComment = '')
      );
  }

  likeBlog(likes: number): void {
    this.blogService
      .updateById(this.id, { likes: ++likes })
      .pipe(take(1))
      .subscribe(
        (likedBlog: Blog) => {
          if (this.blog) {
            this.blog.likes = (this.blog?.likes ?? 0) + 1;
          }
        },
        (error) => alert(error.message)
      );
  }
}
