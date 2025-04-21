import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private baseUrl = environment.financeApiUrl + '/api/budgets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(budget: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, budget);
  }

  update(id: number, budget: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, budget);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}