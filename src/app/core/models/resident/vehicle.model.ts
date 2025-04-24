export interface Vehicle {
  id?: string;
  customId?: number;
  vehicleNumber: string;
  vehicleType: string;
  brand: string;
  color: string;
  residentId: string;
  flatNumber: string;
  createdBy?: string;
  modifiedBy?: string;
  isActive?: number;
  createdDate?: string;
  modifiedDate?: string;
  societyId: number;
}
