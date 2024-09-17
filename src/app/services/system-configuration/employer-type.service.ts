import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployerTypeService {
  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}employerTypes`;

  constructor(private http: HttpClient) {}

  public getAllEmployerType(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public getIEmployerTypeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.href}/${id}`);
  }

  public addEmployerType(employerType: any): Observable<any> {
    return this.http.post(this.href, employerType);
  }

  public deleteEmploerType(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public updateEmployerType(employerType:any, id:any): Observable<any>{
    return this.http.patch(`${this.href}/${id}`,employerType)
  }

  public unblockEmployerType(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unBlockEmployerType/${id}`);
  }
}
