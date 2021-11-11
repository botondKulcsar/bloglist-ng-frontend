import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService extends BaseHttpService<Blog> {

  constructor(public http: HttpClient) {
    super(http);
    this.entity = 'blogs';
   }

   postComment(id: string, comment: string): Observable<Blog> {
    return this.http.post<Blog>(`${this.BASE_URL}${this.entity}/${id}/comments`, { comment })
   }
}
