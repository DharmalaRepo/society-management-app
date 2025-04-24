export interface Poll {
  id?: string;
  customId?: number;
  question: string;
  options: string[];
  startDate: string;
  endDate: string;
  createdBy?: string;
  votes?: string[];
  status?: string;
  societyId: number;
  anonymous: boolean;
}
