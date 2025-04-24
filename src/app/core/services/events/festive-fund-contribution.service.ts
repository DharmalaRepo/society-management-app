import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveFundContribution } from '../../models/events/festive-fund-contribution.model';

@Injectable({ providedIn: 'root' })
export class FestiveFundContributionService {
  private apiUrl = '/api/festive-fund-contributions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveFundContribution[]> {
    return this.http.get<FestiveFundContribution[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveFundContribution> {
    return this.http.get<FestiveFundContribution>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveFundContribution): Observable<FestiveFundContribution> {
    return this.http.post<FestiveFundContribution>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveFundContribution): Observable<FestiveFundContribution> {
    return this.http.put<FestiveFundContribution>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
