import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogHttpService
  ) { }

  id: string = this.route.snapshot.params.id;

  selectedBlog$: Observable<Blog> | undefined

  newComment: string = '';

  ngOnInit(): void {
    this.getBlogDetails();
  }

  getBlogDetails(): void {
    this.selectedBlog$ = this.blogService.getById(this.id)
  }

  submitComment(): void {
    if (!this.newComment) {
      return;
    }
    this.selectedBlog$ = this.blogService.postComment(this.id, this.newComment)
    this.newComment = ''
  }

  likeBlog(likes: number): void {
    this.selectedBlog$ = this.blogService.updateById(this.id, { likes: ++likes })
  }

}
