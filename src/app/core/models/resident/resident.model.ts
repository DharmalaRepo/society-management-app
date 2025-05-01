export interface FamilyMember {
  name: string;
  relationship: string;
  contact: string;
  dependent: boolean;
}

export interface Resident {
  residentId?: string;
  name: string;
  blockNumber: string;
  flatNumber: string;
  mobileNumber: string;
  email?: string;
  whatsappNumber?: string;
  residentType: 'OWNER' | 'TENANT';
  residencyStatus: 'ACTIVE' | 'INACTIVE' | 'MOVED_OUT';
  moveInDate?: string;
  moveOutDate?: string;
  showInDirectory: boolean;
  familyMembers?: FamilyMember[];
}
