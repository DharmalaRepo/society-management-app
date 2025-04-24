export interface SocietyMaster {
  id?: string;
  customId: number;
  name: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  isActive: number;
}
