import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostComponent } from '../models/post/post.component';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private url = 'http://localhost:8080/post';
  constructor(private http: HttpClient) {}

  add(post: PostComponent): Observable<any> {
    return this.http.post(this.url, post);
  }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll');
  }

  edit(post: PostComponent): Observable<any> {
    return this.http.post(this.url + '/' + post.id + '/update', post);
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null);
  }
}
