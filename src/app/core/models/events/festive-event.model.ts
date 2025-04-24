export interface FestiveEvent {
  id?: string;
  customId?: number;
  occasionId: string;
  committeeId: string;
  societyId: string;
  eventName: string;
  eventDate: string;
  venue?: string;
  description?: string;
  poc?: string[];
}