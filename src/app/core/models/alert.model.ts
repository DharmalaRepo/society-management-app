export interface Alert {
  id?: string;
  title: string;
  message: string;  // ✅ This is the missing field
  date: string;
}
