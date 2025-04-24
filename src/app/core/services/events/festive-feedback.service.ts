import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveFeedback } from '../../models/events/festive-feedback.model';

@Injectable({ providedIn: 'root' })
export class FestiveFeedbackService {
  private apiUrl = '/api/festive-feedbacks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveFeedback[]> {
    return this.http.get<FestiveFeedback[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveFeedback> {
    return this.http.get<FestiveFeedback>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveFeedback): Observable<FestiveFeedback> {
    return this.http.post<FestiveFeedback>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveFeedback): Observable<FestiveFeedback> {
    return this.http.put<FestiveFeedback>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
