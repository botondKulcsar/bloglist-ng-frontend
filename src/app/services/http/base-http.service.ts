import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<E> {

  BASE_URL = environment.apiUrl;
  entity: string = '';

  constructor(public http: HttpClient) { }

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(`${this.BASE_URL}${this.entity}`);
  }

  getById(id: string): Observable<E> {
    return this.http.get<E>(`${this.BASE_URL}${this.entity}/${id}`)
  }

  create(entity: E): Observable<E> {
    return this.http.post<E>(`${this.BASE_URL}${this.entity}`, entity)
  }

  updateById(id: string, payload: any): Observable<E> {
    return this.http.patch<E>(`${this.BASE_URL}${this.entity}/${id}`, payload)
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${this.entity}/${id}`)
  }

}
