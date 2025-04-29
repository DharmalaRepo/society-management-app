export interface SocietyDetailsResponseDTO {
    societyMaster: SocietyMaster;
    flats: SocietyFlat[];
    amenities: SocietyAmenity[];
    parkingSlots: SocietyParking[];
    maintenanceSetting: SocietyMaintenanceSetting;
    expenseCategories: ExpenseCategory[];
    staffDepartments: StaffDepartment[];
}

export interface SocietyMaster {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  name: string;
  registrationNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  isActive?: number;
}

export interface SocietyFlat {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  flatNumber: string;
  blockName: string;
  floor: string;
  type: string;
  areaInSqFt: number;
  isActive?: number;
  occupied?: boolean;
}

export interface SocietyAmenity {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  name: string;
  description: string;
  location: string;
  isActive?: number;
}

export interface SocietyParking {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  spotNumber: string;
  type: string;
  allocatedToFlatNumber: string;
  isActive?: number;
  occupied?: boolean;
}

export interface SocietyMaintenanceSetting {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  frequency: string;
  amount: number;
  dueDate: string;
  lateFee: number;
  isActive?: number;
}

export interface ExpenseCategory {
  societyIdentifier?: string;
  categoryName: string;
  description: string;
}

export interface StaffDepartment {
  societyIdentifier?: string;
  departmentName: string;
  description: string;
}
