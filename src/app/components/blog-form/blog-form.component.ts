import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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
    console.log(form.value)
    // todo get authenticated user and post new blog to server
    this.blogSub = this.blogService.create({ ...form.value, likes: 0 })
      .subscribe(
        savedBlog => {
          if (savedBlog) {
            form.reset();
          }
        },
        err => alert(err.message),
        () => {
          // this.blogService.getAll().subscribe()
        }
      )
  }

}
