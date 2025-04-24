import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.loginApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

    private getAuthHeaders(): HttpHeaders {
        const { username, password } = environment.basicAuth;
        const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
        return new HttpHeaders({ Authorization: basicAuth });
    }

  /* login(credentials: { username: string; password: string; societyId: string  }): Observable<any> {
    const { username, password } = credentials;
    const loginUrl = `${this.apiUrl}/api/users/login?username=${username}&password=${password}`;
    return this.http.post(loginUrl, {}).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token || 'mock-token');
        localStorage.setItem('username', username);
        this.router.navigate(['/dashboard']);
      })
    );
  } */


login(credentials: { username: string; password: string; societyId: string }): Observable<any> {
  const { username, societyId } = credentials;
  // Store mock user
    const user = { username, societyId: 'RGN303' };

  localStorage.setItem('user', JSON.stringify({ username, societyId }));
  this.router.navigate(['/dashboard']);

  return of({ success: true });
}
logout() {
  localStorage.clear();
  location.href = '/'; // redirect to login or root
}


}
