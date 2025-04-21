import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = `${environment.residentApiUrl}/api/vehicles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(vehicle: any): Observable<any> {
    return this.http.post(this.baseUrl, vehicle);
  }

  update(id: string, vehicle: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vehicle);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
