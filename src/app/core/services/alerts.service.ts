import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private baseUrl = environment.residentApiUrl + '/api/alerts';

  constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const { username, password } = environment.basicAuth;
        const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
        return new HttpHeaders({ Authorization: basicAuth });
    }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, {
                                                                 headers: this.getAuthHeaders()
                                                               });
                                                             }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`), {
                                                               headers: this.getAuthHeaders()
                                                             });
                                                           }
}
