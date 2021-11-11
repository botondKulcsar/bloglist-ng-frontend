import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './models/blog';
import { User } from './models/user';
import { BlogHttpService } from './services/http/blog-http.service';
import { UserHttpService } from './services/http/user-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private blogService: BlogHttpService,
    private userService: UserHttpService
    ) {}

  blogs$: Observable<Blog[]> = this.blogService.getAll()
  users$: Observable<User[]> = this.userService.getAll()
}
