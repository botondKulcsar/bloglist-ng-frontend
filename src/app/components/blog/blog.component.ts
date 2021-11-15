import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogHttpService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  id: string = this.route.snapshot.params.id;

  // selectedBlog$: Observable<Blog> | undefined;

  blog!: Blog;

  ownBlog: boolean = false;

  user?: any;
  authSub!: Subscription;

  newComment: string = '';

  ngOnInit(): void {
    this.getBlogDetails();
    this.authSub = this.authService.userLoggedIn.subscribe(
      user => this.user = user,
      err => console.error(err)
    )
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
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
            if (this.blog.user){
              this.ownBlog = this.blog.user.name === this.user.name;
            } 
          }
        },
        (error) => alert(error),
        () => {}
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  submitComment(): void {
    if (!this.user) {
      this.openDialog();
      return;
    }
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
    if (!this.user) {
      this.openDialog();
      return;
    }
    this.blogService
      .updateById(this.id, { likes: ++likes })
      .pipe(take(1))
      .subscribe(
        (likedBlog: Blog) => {
          if (this.blog) {
            this.blog.likes = likedBlog.likes;
          }
        },
        (error) => alert(error.message)
      );
  }

  removeBlog(): void {
    if(confirm('Are you sure you want to PERMANENTLY delete this blog?')) {
      this.blogService.deleteById(this.blog.id)
        .pipe(take(1))
        .subscribe(
          () => console.log(`blog with id=${this.blog.id} has been deleted`),
          err => console.error(err),
          () => {this.router.navigate(['/blogs'])}
        )
    } else {
      return;
    }
  }
}
