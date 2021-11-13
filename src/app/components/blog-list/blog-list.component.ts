import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
// import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogHttpService) { }

  // blogs$: Observable<Blog[]> = this.blogService.getAll()

  @ViewChild(MatTable) table!: MatTable<any>


  blogs: Blog[] = []

  displayedColumns: string[] = ['title', 'author']

  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs(): void {
    this.blogService.getAll()
      .pipe(take(1))
      .subscribe(
        (bloglist: Blog[]) => this.blogs = bloglist,
        error => alert(error.message),
        () => console.log('received bloglist from backend')
      )
  }

  addNewBlog(blog: Blog): void {
    // this.blogs = [ ...this.blogs, blog ];
    this.blogs.push(blog);
    this.table.renderRows();
  }

}
