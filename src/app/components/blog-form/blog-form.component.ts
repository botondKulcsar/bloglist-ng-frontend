import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit, OnDestroy {

  constructor(
    private blogService: BlogHttpService
  ) { }

  @Output() updateBlogList = new EventEmitter<Blog>()

  blogSub?: Subscription

  visible: boolean = false;

  title: string = '';
  author: string = '';
  url: string = '';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.blogSub) {
      this.blogSub.unsubscribe()
    }
  }

  onSubmit(form: NgForm): void {

    this.blogSub = this.blogService.create({ ...form.value, likes: 0 })
      .subscribe(
        (savedBlog: Blog) => {
          if (savedBlog) {
            this.updateBlogList.emit(savedBlog)
            form.reset();
          }
        },
        err => alert(err.message),
        () => {}
      )
  }

}
