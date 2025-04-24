export interface Grievance {
  id?: string;
  societyId: string;
  residentId: string;
  grievanceDescription: string;
  category: string;
  severity: string;
  status: string;
  assignedTo: string;
  createdDate?: string;
  updatedDate?: string;
  customId?: number;
  active?: boolean;
}
