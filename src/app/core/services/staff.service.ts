import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Task, Attendance, Rating, Staff } from '../models/staff.model';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private baseUrl = `${environment.staffApiUrl}/api/staff`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/api/staff/tasks`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/staff/tasks`, task);
  }

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/api/staff/attendance`);
  }

  updateAttendance(id: string, payload: Attendance): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/staff/attendance/${id}`, payload);
  }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/api/staff/ratings`);
  }

  submitRating(rating: Rating): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/staff/ratings`, rating);
  }

  markAttendance(payload: Attendance): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/staff/attendance`, payload);
  }

  deleteStaff(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/staff/${id}`);
  }

  createStaff(staff: Staff): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/staff`, staff);
  }

  updateStaff(id: string, staff: Staff): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/staff/${id}`, staff);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/api/staff`);
  }



}
