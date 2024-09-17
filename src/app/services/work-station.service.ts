import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {
  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}workstations`;

  constructor(private http: HttpClient) {}

  public getAllWorkStation(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public getWorkStationById(id: any): Observable<any> {
    return this.http.get<any>(`${this.href}/${id}`);
  }

  public addWorkStation(data: any): Observable<any> {
    return this.http.post(this.href, data);
  }

  public deleteWorkStation(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public updateWorkStation(data:any, id:any): Observable<any>{
    return this.http.patch(`${this.href}/${id}`,data)
  }

  public unblockWorkStation(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unblockWorkstation/${id}`);
  }
}
