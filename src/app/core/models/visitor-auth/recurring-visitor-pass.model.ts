export interface RecurringVisitorPass {
  id?: string;  // Optional for creation, required for updates
  visitorName: string;
  visitorMobile: string;
  flatId: string;
  flatNumber: string;
  blockNumber: string;
  purpose: string;
  allowedDays: string[]; // e.g., ['Monday', 'Wednesday', 'Friday']
  timeRangeStart: string; // e.g., '08:00'
  timeRangeEnd: string;   // e.g., '18:00'
  enabled: boolean;
  createdBy: string;
  createdByRole: string;
  societyIdentifier: string;

  // Optional tracking info
  createdDate?: string;
  modifiedDate?: string;
}
