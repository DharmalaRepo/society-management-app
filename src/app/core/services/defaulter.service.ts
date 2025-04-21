import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DefaulterService {
  private baseUrl = environment.financeApiUrl + '/api/defaulters';

  constructor(private http: HttpClient) {}

  getAll(societyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?societyId=${societyId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}