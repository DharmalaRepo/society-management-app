export interface Staff {
  id: string;
  name: string;
  role: string;
  department?: string;
  phone?: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
}

export interface Attendance {
  id?: string;
  staffId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
}

export interface Rating {
  id?: string;
  staffId: string;
  rating: number;
  remarks?: string;
  date: string;
}
