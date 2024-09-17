import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap} from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl: string = `${environment.baseUrl}`;
  private href = `${this.baseUrl}locations`;

  constructor(private http: HttpClient) {}

  public getAllLocation(): Observable<any> {
    return this.http.get<any>(this.href);
  }

  public addLocation(location: any): Observable<any> {
    const req = new HttpRequest('POST', this.href, location, {
      reportProgress: true // Enable progress tracking
    });
    return this.http.request(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // Calculate and log progress percentage
            if (event.total) {
              const percentDone = Math.round((100 * event.loaded) / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
          }
        })
      )
  }

  public deleteLocation(id:any): Observable<any>{
    return this.http.delete(`${this.href}/${id}`);
  }

  public unblockLocation(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}unBlockLocation/${id}`);
  }

  public updateLocation(user:any, id:any): Observable<any>{
    return this.http.patch(`${this.href}/${id}`,user)
  }

  public getShehia(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getShehias`);
  }
}
