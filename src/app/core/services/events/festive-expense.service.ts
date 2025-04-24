import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestiveExpense } from '../../models/events/festive-expense.model';

@Injectable({ providedIn: 'root' })
export class FestiveExpenseService {
  private apiUrl = '/api/festive-expenses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestiveExpense[]> {
    return this.http.get<FestiveExpense[]>(this.apiUrl);
  }

  getById(id: string): Observable<FestiveExpense> {
    return this.http.get<FestiveExpense>(`${this.apiUrl}/${id}`);
  }

  create(payload: FestiveExpense): Observable<FestiveExpense> {
    return this.http.post<FestiveExpense>(this.apiUrl, payload);
  }

  update(id: string, payload: FestiveExpense): Observable<FestiveExpense> {
    return this.http.put<FestiveExpense>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
