// src/app/core/services/resident.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Guest } from '../models/guest.model';
import { Vehicle } from '../models/vehicle.model';
import { Alert } from '../models/alert.model';
import { Resident } from 'src/app/core/models/resident.model';

@Injectable({ providedIn: 'root' })
export class ResidentService {
  private baseUrl = environment.residentApiUrl + '/api/residents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(resident: any): Observable<any> {
    return this.http.post(this.baseUrl, resident);
  }

  update(id: string, resident: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, resident);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Guest
  getGuests(): Observable<Guest[]> { return this.http.get<Guest[]>(`${this.baseUrl}/api/guests`); }
  createGuest(guest: Guest): Observable<any> { return this.http.post(`${this.baseUrl}/api/guests`, guest); }
  updateGuest(id: string, guest: Guest): Observable<any> { return this.http.put(`${this.baseUrl}/api/guests/${id}`, guest); }
  deleteGuest(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/guests/${id}`); }

  // Messages
  getMessages(): Observable<Message[]> { return this.http.get<Message[]>(`${this.baseUrl}/api/messages`); }
  createMessage(msg: Message): Observable<any> { return this.http.post(`${this.baseUrl}/api/messages`, msg); }
  updateMessage(id: string, msg: Message): Observable<any> { return this.http.put(`${this.baseUrl}/api/messages/${id}`, msg); }
  deleteMessage(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/messages/${id}`); }

  // Vehicles
  getVehicles(): Observable<Vehicle[]> { return this.http.get<Vehicle[]>(`${this.baseUrl}/api/vehicles`); }
  createVehicle(vehicle: Vehicle): Observable<any> { return this.http.post(`${this.baseUrl}/api/vehicles`, vehicle); }
  updateVehicle(id: string, vehicle: Vehicle): Observable<any> { return this.http.put(`${this.baseUrl}/api/vehicles/${id}`, vehicle); }
  deleteVehicle(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/vehicles/${id}`); }

   getAlerts(): Observable<Alert[]> {
      return this.http.get<Alert[]>(`${this.baseUrl}/api/alerts`);
    }

    createAlert(alert: Alert): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/alerts`, alert);
    }

    updateAlert(id: string, alert: Alert): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/alerts/${id}`, alert);
    }

    deleteAlert(id: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/alerts/${id}`);
    }


    getResidents(): Observable<Resident[]> {
        return this.http.get<Resident[]>(`${this.baseUrl}/api/residents`);
      }

      createResident(payload: Resident): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/residents`, payload);
      }

      updateResident(id: string, payload: Resident): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/residents/${id}`, payload);
      }

      deleteResident(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/residents/${id}`);
      }
}
