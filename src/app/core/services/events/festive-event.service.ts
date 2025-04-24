import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveEvent } from '../../../core/models/events/festive-event.model';

@Injectable({
  providedIn: 'root',
})
export class FestiveEventService {
  private baseUrl = '/api/festive-events';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveEvent[]> {
    return this.http.get<FestiveEvent[]>(this.baseUrl);
  }

  getById(id: string): Observable<FestiveEvent> {
    return this.http.get<FestiveEvent>(`${this.baseUrl}/${id}`);
  }

  create(event: FestiveEvent): Observable<FestiveEvent> {
    return this.http.post<FestiveEvent>(this.baseUrl, event);
  }

  update(id: string, event: FestiveEvent): Observable<FestiveEvent> {
    return this.http.put<FestiveEvent>(`${this.baseUrl}/${id}`, event);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
