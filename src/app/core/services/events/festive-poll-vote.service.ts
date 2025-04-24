import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivePollVote } from '../../models/events/festive-poll-vote.model';

@Injectable({ providedIn: 'root' })
export class FestivePollVoteService {
  private apiUrl = '/api/festive-poll-votes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestivePollVote[]> {
    return this.http.get<FestivePollVote[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestivePollVote> {
    return this.http.get<FestivePollVote>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestivePollVote): Observable<FestivePollVote> {
    return this.http.post<FestivePollVote>(this.apiUrl, payload);
  }

  update(id: string, payload: FestivePollVote): Observable<FestivePollVote> {
    return this.http.put<FestivePollVote>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
