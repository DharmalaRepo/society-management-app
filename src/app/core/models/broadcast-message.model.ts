// broadcast-message.model.ts
export interface BroadcastMessage {
  id?: string;
  customId?: number;
  title: string;
  message: string;
  audience: string;
  flatNumbers: string[];
  sentBy?: string;
  sentAt?: string;
  deliveryMethod: string;
  isActive?: number;
  societyId: number;
}
