import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../../models/resident/resident.model';
import { Vehicle } from '../../models/resident/vehicle.model';
import { AlertReminder } from '../../models/resident/alert-reminder.model';
import { BroadcastMessage } from '../../models/resident/broadcast-message.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:9093/api';

  // Resident APIs
  getAllResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${this.apiUrl}/residents`);
  }

  createResident(resident: Resident): Observable<any> {
    return this.http.post(`${this.apiUrl}/residents`, resident);
  }

  updateResident(residentId: string, resident: Resident): Observable<any> {
    return this.http.put(`${this.apiUrl}/residents/${residentId}`, resident);
  }

  activateResident(residentId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/residents/${residentId}/activate`, {});
  }

  deactivateResident(residentId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/residents/${residentId}/deactivate`, {});
  }

  getResidentDirectory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/residents/directory`);
  }

  // Vehicle APIs
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`);
  }

  createVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles`, vehicle);
  }

  getVehiclesByResident(residentId: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles/resident/${residentId}`);
  }

  getVehiclesByFlat(flatNumber: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles/flat/${flatNumber}`);
  }

  findVehicleByLast4Digits(last4Digits: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/verify/metadata/${last4Digits}`);
  }

  // Alert Reminders
  createAlertReminder(reminder: AlertReminder): Observable<any> {
    return this.http.post(`${this.apiUrl}/reminders`, reminder);
  }

  getUpcomingReminders(): Observable<AlertReminder[]> {
    return this.http.get<AlertReminder[]>(`${this.apiUrl}/reminders/upcoming`);
  }

  deleteAlertReminder(reminderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reminders/${reminderId}`);
  }

  // Broadcast Messages
  sendBroadcast(broadcast: BroadcastMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/broadcasts`, broadcast);
  }

  getAllBroadcasts(): Observable<BroadcastMessage[]> {
    return this.http.get<BroadcastMessage[]>(`${this.apiUrl}/broadcasts`);
  }

  getBroadcastsByFlat(flatNumber: string): Observable<BroadcastMessage[]> {
    return this.http.get<BroadcastMessage[]>(`${this.apiUrl}/broadcasts/flat/${flatNumber}`);
  }

  deleteBroadcast(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/broadcasts/${id}`);
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(`${this.apiUrl}/vehicles/${vehicle.vehicleId}`, vehicle);
  }

  deleteVehicle(vehicleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehicles/${vehicleId}`);
  }

  /* deleteBroadcast(messageId: string): void {
    this.service.deleteBroadcastMessage(messageId).subscribe({
      next: () => this.loadMessages(),
      error: (err:any) => console.error('Failed to delete message', err)
    }); */
  }
