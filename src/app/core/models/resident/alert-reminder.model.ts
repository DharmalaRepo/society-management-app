export interface AlertReminder {
  reminderId?: string;
  title: string;
  message: string;
  triggerDate: string; // ISO format
  deliveryMethods: string[];
  residentId: string;
}
