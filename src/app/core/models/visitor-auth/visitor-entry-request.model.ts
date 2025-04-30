export interface VisitorEntryRequest {
  visitorName: string;
  visitorMobile: string;
  visitorEmail?: string;
  vehicleNumber?: string;
  purpose: string;
  flatId: string;
  flatNumber: string;
  blockNumber: string;
  societyIdentifier: string;
  createdBy: string;
  createdByRole: string;
  photoUrl?: string;
}
