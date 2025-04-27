export interface SocietyRegistrationRequestDTO {
  societyMaster: SocietyMasterDTO;
  flats: SocietyFlatDTO[];
  amenities: SocietyAmenityDTO[];
  parkingSlots: SocietyParkingDTO[];
  maintenanceSetting: SocietyMaintenanceSettingDTO;
  expenseCategories: ExpenseCategoryDTO[];
  staffDepartments: StaffDepartmentDTO[];
}

export interface SocietyMasterDTO {
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

export interface SocietyFlatDTO {
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

export interface SocietyAmenityDTO {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  name: string;
  description: string;
  location: string;
  isActive?: number;
}

export interface SocietyParkingDTO {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  spotNumber: string;
  type: string;
  allocatedToFlatNumber: string;
  isActive?: number;
  occupied?: boolean;
}

export interface SocietyMaintenanceSettingDTO {
  id?: string;
  customId?: number;
  societyIdentifier?: string;
  frequency: string;
  amount: number;
  dueDate: string;
  lateFee: number;
  isActive?: number;
}

export interface ExpenseCategoryDTO {
  societyIdentifier?: string;
  categoryName: string;
  description: string;
}

export interface StaffDepartmentDTO {
  societyIdentifier?: string;
  departmentName: string;
  description: string;
}
