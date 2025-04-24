import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grievance } from 'src/app/core/models/grievances/grievance.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GrievanceService {

   private baseUrl = environment.grievanceApiUrl + '/api/grievances';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const username = 'admin'; // use environment/secure vault in real apps
    const password = 'admin123';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    return new HttpHeaders({ Authorization: basicAuth });
  }

  getGrievancesByStatus(societyId: string, status: string): Observable<Grievance[]> {
    return this.http.get<Grievance[]>(`${this.baseUrl}/status?societyId=${societyId}&status=${status}`, {
      headers: this.getAuthHeaders()
    });
  }

  getResidentGrievances(residentId: string, status: string): Observable<Grievance[]> {
    return this.http.get<Grievance[]>(`${this.baseUrl}/resident?residentId=${residentId}&status=${status}`, {
      headers: this.getAuthHeaders()
    });
  }

  logGrievance(grievance: Grievance): Observable<Grievance> {
    return this.http.post<Grievance>(`${this.baseUrl}/log`, grievance, {
      headers: this.getAuthHeaders()
    });
  }

  updateGrievanceStatus(grievanceId: string, status: string, assignedTo: string): Observable<Grievance> {
    return this.http.put<Grievance>(`${this.baseUrl}/update/${grievanceId}?status=${status}&assignedTo=${assignedTo}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  assignGrievance(grievanceId: string, staffId: string): Observable<Grievance> {
    return this.http.put<Grievance>(`${this.baseUrl}/assign/${grievanceId}?staffId=${staffId}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  getGrievanceById(id: string): Observable<Grievance> {
    return this.http.get<Grievance>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
