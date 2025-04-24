import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveVolunteer } from '../../models/events/festive-volunteer.model';

@Injectable({ providedIn: 'root' })
export class FestiveVolunteerService {
  private apiUrl = '/api/festive-volunteers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveVolunteer[]> {
    return this.http.get<FestiveVolunteer[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveVolunteer> {
    return this.http.get<FestiveVolunteer>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveVolunteer): Observable<FestiveVolunteer> {
    return this.http.post<FestiveVolunteer>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveVolunteer): Observable<FestiveVolunteer> {
    return this.http.put<FestiveVolunteer>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
