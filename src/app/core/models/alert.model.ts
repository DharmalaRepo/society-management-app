export interface Alert {
  id?: string;
  customId?: number;
  title: string;
  message: string;
  triggerDate: string;
  recipients: string[];
  createdBy?: string;
  deliveryMethod: string;
  isActive?: number;
  societyId: number;
  sent?: boolean;
}
