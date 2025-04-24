import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveThankYouNote } from '../../models/events/festive-thankyou-note.model';

@Injectable({ providedIn: 'root' })
export class FestiveThankyouNoteService {
  private apiUrl = '/api/festive-thankyou-notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveThankYouNote[]> {
    return this.http.get<FestiveThankYouNote[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveThankYouNote> {
    return this.http.get<FestiveThankYouNote>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveThankYouNote): Observable<FestiveThankYouNote> {
    return this.http.post<FestiveThankYouNote>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveThankYouNote): Observable<FestiveThankYouNote> {
    return this.http.put<FestiveThankYouNote>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
