import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivePoll } from '../../models/events/festive-poll.model';

@Injectable({ providedIn: 'root' })
export class FestivePollService {
  private apiUrl = '/api/festive-polls';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestivePoll[]> {
    return this.http.get<FestivePoll[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestivePoll> {
    return this.http.get<FestivePoll>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestivePoll): Observable<FestivePoll> {
    return this.http.post<FestivePoll>(this.apiUrl, payload);
  }

  update(id: string, payload: FestivePoll): Observable<FestivePoll> {
    return this.http.put<FestivePoll>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
