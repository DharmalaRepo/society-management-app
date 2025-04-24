import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BroadcastMessage } from '../models/resident/broadcast-message.model';
import { Guest } from '../models/resident/guest.model';
import { Vehicle } from '../models/resident/vehicle.model';
import { AlertReminder } from '../models/resident/alert-reminder.model';
import { Resident } from 'src/app/core/models/resident/resident.model';

@Injectable({ providedIn: 'root' })
export class ResidentService {
  private baseUrl = environment.residentApiUrl ;

  constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const { username, password } = environment.basicAuth;
        const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
        return new HttpHeaders({ Authorization: basicAuth });
    }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
                                                    headers: this.getAuthHeaders()
                                                  });
                                                }

  create(resident: any): Observable<any> {
    return this.http.post(this.baseUrl, resident, {
                                                        headers: this.getAuthHeaders()
                                                      });
                                                    }

  update(id: string, resident: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, resident, {
                                                                  headers: this.getAuthHeaders()
                                                                });
                                                              }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
                                                           headers: this.getAuthHeaders()
                                                         });
                                                       }

  // Guest
  getGuests(): Observable<Guest[]> { return this.http.get<Guest[]>(`${this.baseUrl}/api/guests`, {
        headers: this.getAuthHeaders()
      });
    }
  createGuest(guest: Guest): Observable<any> { return this.http.post(`${this.baseUrl}/api/guests`, guest, {
        headers: this.getAuthHeaders()
      });
    }
  updateGuest(id: string, guest: Guest): Observable<any> { return this.http.put(`${this.baseUrl}/api/guests/${id}`, guest, {
        headers: this.getAuthHeaders()
      });
    }
  deleteGuest(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/guests/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

  // Messages
  getMessages(): Observable<BroadcastMessage[]> { return this.http.get<BroadcastMessage[]>(`${this.baseUrl}/api/messages`, {
        headers: this.getAuthHeaders()
      });
    }
  createMessage(msg: BroadcastMessage): Observable<any> { return this.http.post(`${this.baseUrl}/api/messages`, msg, {
        headers: this.getAuthHeaders()
      });
    }
  updateMessage(id: string, msg: BroadcastMessage): Observable<any> { return this.http.put(`${this.baseUrl}/api/messages/${id}`, msg, {
        headers: this.getAuthHeaders()
      });
    }
  deleteMessage(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/messages/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

  // Vehicles
  getVehicles(): Observable<Vehicle[]> { return this.http.get<Vehicle[]>(`${this.baseUrl}/api/vehicles`, {
        headers: this.getAuthHeaders()
      });
    }
  createVehicle(vehicle: Vehicle): Observable<any> { return this.http.post(`${this.baseUrl}/api/vehicles`, vehicle, {
        headers: this.getAuthHeaders()
      });
    }
  updateVehicle(id: string, vehicle: Vehicle): Observable<any> { return this.http.put(`${this.baseUrl}/api/vehicles/${id}`, vehicle, {
                                                                                                                                           headers: this.getAuthHeaders()
                                                                                                                                         });
                                                                                                                                       }
  deleteVehicle(id: string): Observable<any> { return this.http.delete(`${this.baseUrl}/api/vehicles/${id}`, {
                                                                                                                   headers: this.getAuthHeaders()
                                                                                                                 });
                                                                                                               }

   getAlerts(): Observable<AlertReminder[]> {
      return this.http.get<AlertReminder[]>(`${this.baseUrl}/api/alerts`, {
                                                                        headers: this.getAuthHeaders()
                                                                      });
                                                                    }

    createAlert(alert: AlertReminder): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/alerts`, alert, {
                                                                       headers: this.getAuthHeaders()
                                                                     });
                                                                   }

    updateAlert(id: string, alert: AlertReminder): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/alerts/${id}`, alert, {
                                                                            headers: this.getAuthHeaders()
                                                                          });
                                                                        }

    deleteAlert(id: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/alerts/${id}`, {
                                                                        headers: this.getAuthHeaders()
                                                                      });
                                                                    }


    getResidents(): Observable<Resident[]> {
        return this.http.get<Resident[]>(`${this.baseUrl}/api/residents`, {
                                                                                headers: this.getAuthHeaders()
                                                                              });
                                                                            }

      createResident(payload: Resident): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/residents`, payload, {
                                                                              headers: this.getAuthHeaders()
                                                                            });
                                                                          }

      updateResident(id: string, payload: Resident): Observable<any> {
        return this.http.put(`${this.baseUrl}/api/residents/${id}`, payload, {
                                                                                   headers: this.getAuthHeaders()
                                                                                 });
                                                                               }

      deleteResident(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/api/residents/${id}`, {
                                                                             headers: this.getAuthHeaders()
                                                                           });
                                                                         }
}
