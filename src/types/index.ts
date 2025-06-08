
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'coach' | 'parent';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  parentId: string;
  parentName: string;
  parentPhone: string;
  schedule: ScheduleSlot[];
  createdAt: Date;
}

export interface ScheduleSlot {
  id: string;
  studentId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'visitor';
  recordedBy: string; // coach id
  recordedAt: Date;
  notes?: string;
}

export interface WaitingListEntry {
  id: string;
  studentId: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  coachNotes?: string;
}
