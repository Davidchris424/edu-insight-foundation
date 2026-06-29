import { Student, School, User } from '@/types/database';

export const MOCK_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: 'Kano Model School',
    address: '123 State Road',
    city: 'Kano',
    state: 'Kano',
    country: 'Nigeria',
    created_at: new Date().toISOString(),
  },
  {
    id: 'school-2',
    name: 'Bompai Academy',
    address: '456 Bompai Road',
    city: 'Kano',
    state: 'Kano',
    country: 'Nigeria',
    created_at: new Date().toISOString(),
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@kanomodel.com',
    role: 'SCHOOL_ADMIN',
    school_id: 'school-1',
    full_name: 'Amina Lawal',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-2',
    email: 'teacher@kanomodel.com',
    role: 'TEACHER',
    school_id: 'school-1',
    full_name: 'Musa Bello',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-3',
    email: 'super@eduinsight.com',
    role: 'SUPER_ADMIN',
    school_id: null,
    full_name: 'EduInsight Admin',
    created_at: new Date().toISOString(),
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student-1',
    school_id: 'school-1',
    class_id: 'class-1',
    admission_number: 'ADM-001',
    first_name: 'Aliyu',
    last_name: 'Ibrahim',
    date_of_birth: '2010-05-15',
    gender: 'MALE',
    guardian_name: 'Ibrahim Adamu',
    guardian_phone: '08012345678',
    created_at: new Date().toISOString(),
  },
  {
    id: 'student-2',
    school_id: 'school-1',
    class_id: 'class-1',
    admission_number: 'ADM-002',
    first_name: 'Fatima',
    last_name: 'Sani',
    date_of_birth: '2011-03-20',
    gender: 'FEMALE',
    guardian_name: 'Sani Musa',
    guardian_phone: '08087654321',
    created_at: new Date().toISOString(),
  },
  {
    id: 'student-3',
    school_id: 'school-2',
    class_id: 'class-2',
    admission_number: 'ADM-101',
    first_name: 'Umar',
    last_name: 'Faruk',
    date_of_birth: '2010-11-10',
    gender: 'MALE',
    guardian_name: 'Faruk Abdullahi',
    guardian_phone: '08011122233',
    created_at: new Date().toISOString(),
  }
];
