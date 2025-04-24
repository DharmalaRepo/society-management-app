export interface SocietyParking {
  id?: string;
  customId: number;
  societyId: number;
  spotNumber: string;
  type: string;
  allocatedToFlatNumber: string;
  isActive: number;
  occupied: boolean;
}
