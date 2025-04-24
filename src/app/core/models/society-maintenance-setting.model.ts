export interface SocietyMaintenanceSetting {
  id?: string;
  customId: number;
  societyId: number;
  frequency: string;
  amount: number;
  dueDate: string;
  lateFee: number;
  isActive: number;
}
