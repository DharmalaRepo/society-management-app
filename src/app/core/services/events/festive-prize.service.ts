import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivePrize } from '../../models/events/festive-prize.model';

@Injectable({ providedIn: 'root' })
export class FestivePrizeService {
  private apiUrl = '/api/festive-prizes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestivePrize[]> {
    return this.http.get<FestivePrize[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestivePrize> {
    return this.http.get<FestivePrize>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestivePrize): Observable<FestivePrize> {
    return this.http.post<FestivePrize>(this.apiUrl, payload);
  }

  update(id: string, payload: FestivePrize): Observable<FestivePrize> {
    return this.http.put<FestivePrize>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
