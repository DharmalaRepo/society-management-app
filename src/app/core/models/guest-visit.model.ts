// guest-visit.model.ts
export interface GuestVisit {
  id?: string;
  customId?: number;
  guestName: string;
  contactNumber: string;
  checkInTime: string;
  checkOutTime?: string;
  visitingResidentId: number;
  flatNumber: string;
  purpose: string;
  status?: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
  isActive?: number;
  societyId: number;
}
