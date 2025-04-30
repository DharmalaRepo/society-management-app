import { Injectable } from '@angular/core';
import { SocietyDetailsResponseDTO, SocietyFlat } from 'src/app/core/models/society-registration/society-details.model';

const STORAGE_KEY = 'societyDetails';

@Injectable({
  providedIn: 'root'
})
export class SocietyConfigService {
  private configData?: SocietyDetailsResponseDTO;

  constructor() {
      // Load from localStorage if present
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          this.configData = JSON.parse(saved) as SocietyDetailsResponseDTO;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

  setSocietyDetails(data: SocietyDetailsResponseDTO): void {
    this.configData = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  clearSocietyDetails(): void {
      this.configData = undefined;
      localStorage.removeItem(STORAGE_KEY);
    }

  getFlats() {
    return this.configData?.flats ?? [];
  }

  getBlocks() {
    return [...new Set(this.getFlats().map(f => f.blockName))].filter(Boolean);
  }

  getFloors() {
    return [...new Set(this.getFlats().map(f => f.floor))].filter(Boolean);
  }

  getFlatBlockFloorLabels(): string[] {
    return this.getFlats().map(flat => {
      const block = flat.blockName || 'BLK';
      const floor = flat.floor || 'FLR';
      const number = flat.flatNumber || 'FLAT';
      return `${block}-${floor}-${number}`;
    });
  }

  getFlatDropdownOptions(): { label: string, value: string }[] {
    return this.getFlats().map(flat => ({
      label: `${flat.blockName}-${flat.floor}-${flat.flatNumber}`,
      value: flat.flatNumber
    }));
  }


  getParkingSpots() {
    return this.configData?.parkingSlots ?? [];
  }

  getAmenities() {
    return this.configData?.amenities ?? [];
  }

  getExpenseCategories() {
    return this.configData?.expenseCategories ?? [];
  }

  getStaffDepartments() {
    return this.configData?.staffDepartments ?? [];
  }

  getMaintenanceSetting() {
    return this.configData?.maintenanceSetting;
  }

  getRawConfig() {
    return this.configData;
  }
}
