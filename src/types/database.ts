export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_OWNER' | 'SCHOOL_ADMIN' | 'TEACHER';

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  school_id: string | null; // null for Super Admin
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  school_id: string;
  staff_id: string;
  assigned_class_id?: string;
  subjects: string[]; // IDs of subjects taught
  created_at: string;
}

export interface Student {
  id: string;
  school_id: string;
  class_id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE';
  guardian_name: string;
  guardian_phone: string;
  created_at: string;
}

export interface Class {
  id: string;
  school_id: string;
  name: string; // e.g., Grade 10A
  level: string; // e.g., Senior Secondary
  teacher_id?: string;
  created_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code: string;
  created_at: string;
}

export interface AcademicSession {
  id: string;
  school_id: string;
  name: string; // e.g., 2023/2024
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface Term {
  id: string;
  session_id: string;
  name: string; // e.g., First Term
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface Score {
  id: string;
  school_id: string;
  student_id: string;
  teacher_id: string;
  subject_id: string;
  term_id: string;
  class_id: string;
  ca_score: number; // Continuous Assessment
  exam_score: number;
  total_score: number;
  grade: string;
  remarks: string;
  created_at: string;
}

export interface Payment {
  id: string;
  school_id: string;
  student_id: string;
  term_id: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'PARTIAL';
  payment_date?: string;
  payment_method?: string;
  created_at: string;
}

export interface InterventionLog {
  id: string;
  school_id: string;
  student_id: string;
  teacher_id: string;
  reason: string;
  intervention_type: string;
  outcome: string;
  date: string;
  created_at: string;
}

export interface Session {
  user: User;
  school_id: string | null;
  role: UserRole;
  assigned_class_id?: string;
}
