import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { BlogHttpService } from 'src/app/services/http/blog-http.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogHttpService) { }

  blogs$: Observable<Blog[]> = this.blogService.getAll()

  ngOnInit(): void {
  }

}
