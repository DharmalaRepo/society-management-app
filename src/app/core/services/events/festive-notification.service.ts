import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveNotification } from '../../models/events/festive-notification.model';

@Injectable({ providedIn: 'root' })
export class FestiveNotificationService {
  private apiUrl = '/api/festive-notifications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveNotification[]> {
    return this.http.get<FestiveNotification[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveNotification> {
    return this.http.get<FestiveNotification>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveNotification): Observable<FestiveNotification> {
    return this.http.post<FestiveNotification>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveNotification): Observable<FestiveNotification> {
    return this.http.put<FestiveNotification>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
