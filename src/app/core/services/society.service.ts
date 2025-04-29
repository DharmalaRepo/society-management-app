import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocietyMasterDTO } from 'src/app/core/models/society-registration/society-registration.model';
import { SocietyDetailsResponseDTO } from 'src/app/core/models/society-registration/society-details.model';
import { SocietyFlat } from 'src/app/core/models/society-registration/society-details.model';
import { SocietyAmenity } from 'src/app/core/models/society-registration/society-details.model';
import { SocietyParking } from 'src/app/core/models/society-registration/society-details.model';
import { SocietyMaintenanceSetting } from 'src/app/core/models/society-registration/society-details.model';
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
    getSocietyDetails(): Observable<SocietyDetailsResponseDTO> {
      return this.http.get<SocietyDetailsResponseDTO>(`${this.baseUrl}/societies/getSocietyDetails`, {
        headers: this.getAuthHeaders()
      });
    }

    createSociety(society: SocietyMasterDTO): Observable<SocietyMasterDTO> {
      return this.http.post<SocietyMasterDTO>(`${this.baseUrl}/societies`, society, {
        headers: this.getAuthHeaders()
      });
    }

    updateSociety(id: string, society: SocietyMasterDTO): Observable<SocietyMasterDTO> {
      return this.http.put<SocietyMasterDTO>(`${this.baseUrl}/societies/${id}`, society, {
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
      return this.http.get<SocietyAmenity[]>(`${this.baseUrl}/amenities/getAll`, {
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
    getParkingSlots(): Observable<SocietyParking[]> {
      return this.http.get<SocietyParking[]>(`${this.baseUrl}/parking/getAll`, {
        headers: this.getAuthHeaders()
      });
    }

    createParkingSlot(parking: SocietyParking): Observable<SocietyParking> {
      return this.http.post<SocietyParking>(`${this.baseUrl}/parking`, parking, {
        headers: this.getAuthHeaders()
      });
    }

    updateParkingSlot(id: string, parking: SocietyParking): Observable<SocietyParking> {
      return this.http.put<SocietyParking>(`${this.baseUrl}/parking/${id}`, parking, {
        headers: this.getAuthHeaders()
      });
    }

    deleteParkingSlot(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/parking/${id}`, {
        headers: this.getAuthHeaders()
      });
    }

    // ────── Maintenance ──────
    getMaintenance(): Observable<SocietyMaintenanceSetting[]> {
      return this.http.get<SocietyMaintenanceSetting[]>(`${this.baseUrl}/maintenance-settings/getAll`, {
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
