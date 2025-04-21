import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private baseUrl = `${environment.eventApiUrl}/api/festive-events`;

  constructor(private http: HttpClient) {}

  getEvents(societyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/occasion/${societyId}`);
  }

  create(event: any): Observable<any> {
    return this.http.post(this.baseUrl, event);
  }

  update(id: string, event: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, event);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}