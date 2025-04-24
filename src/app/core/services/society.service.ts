import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocietyMaster } from '../models/society-master.model';
import { SocietyFlat } from '../models/society-flat.model';
import { SocietyAmenity } from '../models/society-amenity.model';
import { SocietyParking } from '../models/society-parking.model';
import { SocietyMaintenanceSetting } from '../models/society-maintenance-setting.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocietyService {
  private baseUrl = `${environment.societyApiUrl}/api`;

  constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const { username, password } = environment.basicAuth;
        const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
        return new HttpHeaders({ Authorization: basicAuth });
    }

    // ────── Society Master ──────
    getSocieties(): Observable<SocietyMaster[]> {
      return this.http.get<SocietyMaster[]>(`${this.baseUrl}/societies`, {
        headers: this.getAuthHeaders()
      });
    }

    createSociety(society: SocietyMaster): Observable<SocietyMaster> {
      return this.http.post<SocietyMaster>(`${this.baseUrl}/societies`, society, {
        headers: this.getAuthHeaders()
      });
    }

    updateSociety(id: string, society: SocietyMaster): Observable<SocietyMaster> {
      return this.http.put<SocietyMaster>(`${this.baseUrl}/societies/${id}`, society, {
        headers: this.getAuthHeaders()
      });
    }

    deleteSociety(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/societies/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

    // ────── Flats ──────
    getFlats(): Observable<SocietyFlat[]> {
      return this.http.get<SocietyFlat[]>(`${this.baseUrl}/flats/getAll`, {
        headers: this.getAuthHeaders()
      });
    }

    createFlat(flat: SocietyFlat): Observable<SocietyFlat> {
      return this.http.post<SocietyFlat>(`${this.baseUrl}/flats`, flat, {
        headers: this.getAuthHeaders()
      });
    }

    updateFlat(id: string, flat: SocietyFlat): Observable<SocietyFlat> {
      return this.http.put<SocietyFlat>(`${this.baseUrl}/flats/${id}`, flat, {
        headers: this.getAuthHeaders()
      });
    }

    deleteFlat(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/flats/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

    // ────── Amenities ──────
    getAmenities(): Observable<SocietyAmenity[]> {
      return this.http.get<SocietyAmenity[]>(`${this.baseUrl}/amenities`, {
        headers: this.getAuthHeaders()
      });
    }

    createAmenity(amenity: SocietyAmenity): Observable<SocietyAmenity> {
      return this.http.post<SocietyAmenity>(`${this.baseUrl}/amenities`, amenity, {
        headers: this.getAuthHeaders()
      });
    }

    updateAmenity(id: string, amenity: SocietyAmenity): Observable<SocietyAmenity> {
      return this.http.put<SocietyAmenity>(`${this.baseUrl}/amenities/${id}`, amenity, {
        headers: this.getAuthHeaders()
      });
    }

    deleteAmenity(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/amenities/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

    // ────── Parking ──────
    getParkings(): Observable<SocietyParking[]> {
      return this.http.get<SocietyParking[]>(`${this.baseUrl}/parking`, {
        headers: this.getAuthHeaders()
      });
    }

    createParking(parking: SocietyParking): Observable<SocietyParking> {
      return this.http.post<SocietyParking>(`${this.baseUrl}/parking`, parking, {
        headers: this.getAuthHeaders()
      });
    }

    updateParking(id: string, parking: SocietyParking): Observable<SocietyParking> {
      return this.http.put<SocietyParking>(`${this.baseUrl}/parking/${id}`, parking, {
        headers: this.getAuthHeaders()
      });
    }

    deleteParking(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/parking/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

    // ────── Maintenance ──────
    getMaintenance(): Observable<SocietyMaintenanceSetting[]> {
      return this.http.get<SocietyMaintenanceSetting[]>(`${this.baseUrl}/maintenance-settings`, {
        headers: this.getAuthHeaders()
      });
    }

    createMaintenance(setting: SocietyMaintenanceSetting): Observable<SocietyMaintenanceSetting> {
      return this.http.post<SocietyMaintenanceSetting>(`${this.baseUrl}/maintenance-settings`, setting, {
        headers: this.getAuthHeaders()
      });
    }

    updateMaintenance(id: string, setting: SocietyMaintenanceSetting): Observable<SocietyMaintenanceSetting> {
      return this.http.put<SocietyMaintenanceSetting>(`${this.baseUrl}/maintenance-settings/${id}`, setting, {
        headers: this.getAuthHeaders()
      });
    }

    deleteMaintenance(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/maintenance-settings/${id}`, {
        headers: this.getAuthHeaders()
      });
    }
  }
