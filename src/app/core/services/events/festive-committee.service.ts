import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FestiveCommittee } from 'src/app/core/models/events/festive-committee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FestiveCommitteeService {
  private readonly apiUrl = '/api/festive/committees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveCommittee[]> {
    return this.http.get<FestiveCommittee[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveCommittee> {
    return this.http.get<FestiveCommittee>(`${this.apiUrl}/${id}`);
  }

  create(data: FestiveCommittee): Observable<FestiveCommittee> {
    return this.http.post<FestiveCommittee>(this.apiUrl, data);
  }

  update(id: string, data: FestiveCommittee): Observable<FestiveCommittee> {
    return this.http.put<FestiveCommittee>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
