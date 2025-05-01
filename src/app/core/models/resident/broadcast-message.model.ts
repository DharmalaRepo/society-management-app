export interface BroadcastMessage {
  broadcastId?: string;
  title: string;
  message: string;
  audience: string;
  flatNumbers: string[];
  deliveryMethods: string[];
}
