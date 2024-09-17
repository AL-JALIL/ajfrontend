import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}userAccounts`;

  constructor(private http: HttpClient) {}
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public addUser(user: any): Observable<any> {
    return this.http.post(this.href, user);
  }

  public getUserById(id: any) {
    return this.http.get<any>(`${this.href}/${id}`);
  }

  public updateUser(user: any,id: any): Observable<any> {
    return this.http.put(`${this.href}/${id}`, user);
  }

  public blockUser(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public activateUser(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unBlockUser/${id}`)
  }

  public getLogs(): Observable<any>{
    return this.http.get(`${this.baseUrl}logsFunction`)
  }
}
