import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit, OnDestroy {

  constructor(
    private blogService: BlogHttpService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  @Output() updateBlogList = new EventEmitter<Blog>()

  blogSub?: Subscription
  authSub?: Subscription

  visible: boolean = false;

  title: string = '';
  author: string = '';
  url: string = '';

  user?: any

  ngOnInit(): void {
    this.authSub = this.authService.userLoggedIn.subscribe(
      user => this.user = user
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  ngOnDestroy(): void {
    if (this.blogSub) {
      this.blogSub.unsubscribe()
    }
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }

  showForm(): void {
    if (this.user) {
      this.visible = !this.visible;
    } else {
      this.openDialog();
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
