import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserComponent } from '../models/user/user.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private url = 'htto://localhost:8080/user';
  constructor(private http: HttpClient) {}

  add(user: UserComponent): Observable<any> {
    return this.http.post(this.url, user);
  }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/total');
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getByMail(mail: string): Observable<any> {
    return this.http.get(this.url + '/mail/' + mail);
  }

  edit(user: UserComponent): Observable<any> {
    return this.http.post(this.url + '/' + user.id + '/update', user);
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null);
  }
}
