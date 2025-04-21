import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitorToken } from '../models/visitortoken.model';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private baseUrl = '/api/visitor';

  constructor(private http: HttpClient) {}

  generateToken(data: { name: string; mobile: string; purpose: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/generate-token`, data);
  }

  getTokenById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/visitor/tokens/${id}`);
  }

  updateToken(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/visitor/tokens/${id}`, payload);
  }

  verifyToken(tokenId: string): Observable<{ valid: boolean; token?: VisitorToken }> {
    return this.http.get<{ valid: boolean; token?: VisitorToken }>(`${this.baseUrl}/api/visitor-tokens/verify/${tokenId}`);
  }

  getAllTokens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/visitor/tokens`);
  }

  deleteToken(tokenId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/visitor/tokens/${tokenId}`);
  }

  createToken(payload: VisitorToken): Observable<any> {
     return this.http.post(`${this.baseUrl}/api/visitor/tokens`, payload);
   }
   getTokenList(): Observable<VisitorToken[]> {
     return this.http.get<VisitorToken[]>(`${this.baseUrl}/api/visitor-tokens`);
   }



}
