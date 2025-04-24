export interface Resident {
  id?: string;
  customId?: number;
  name: string;
  flatNumber: string;
  mobileNumber: string;
  email: string;
  whatsappNumber: string;
  residentType: string;
  residencyStatus: string;
  moveInDate?: string;
  moveOutDate?: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
  isActive?: number;
  societyId: number;
}
