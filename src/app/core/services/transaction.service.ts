import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = environment.financeApiUrl + '/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(transaction: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, transaction);
  }

  update(id: number, transaction: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}