import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouncilService {
  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}councils`;

  constructor(private http: HttpClient) {}

  public getAllCouncil(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public getCouncil(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getCouncils`);
  }

  public getCouncilById(id: any): Observable<any> {
    return this.http.get<any>(`${this.href}/${id}`);
  }

  public addCouncil(user: any): Observable<any> {
    return this.http.post(this.href, user);
  }

  public deleteCouncil(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public updateCouncil(user:any, id:any): Observable<any>{
    return this.http.patch(`${this.href}/${id}`,user)
  }

  public unblockCouncil(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unBlockCouncil/${id}`);
  }
}
