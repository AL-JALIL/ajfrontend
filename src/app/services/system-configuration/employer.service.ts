import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}employers`;

  constructor(private http: HttpClient) {}

  public getAllEmployer(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public getIEmployerById(id: any): Observable<any> {
    return this.http.get<any>(`${this.href}/${id}`);
  }

  public addEmployer(employer: any): Observable<any> {
    return this.http.post(this.href, employer);
  }

  public deleteEmploer(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public updateEmployer(employer:any, id:any): Observable<any>{
    return this.http.patch(`${this.href}/${id}`,employer)
  }

  public unblockEmployer(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unBlockEmployer/${id}`);
  }
}
