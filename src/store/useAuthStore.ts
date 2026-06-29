import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, Session } from '@/types/database';

interface AuthState {
  user: User | null;
  schoolId: string | null;
  role: UserRole | null;
  assignedClassId: string | null;
  isAuthenticated: boolean;
  login: (session: Session) => void;
  logout: () => void;
  setSchool: (schoolId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      schoolId: null,
      role: null,
      assignedClassId: null,
      isAuthenticated: false,
      login: (session) => set({
        user: session.user,
        schoolId: session.school_id,
        role: session.role,
        assignedClassId: session.assigned_class_id,
        isAuthenticated: true,
      }),
      logout: () => set({
        user: null,
        schoolId: null,
        role: null,
        assignedClassId: null,
        isAuthenticated: false,
      }),
      setSchool: (schoolId) => set({ schoolId }),
    }),
    {
      name: 'edu-insight-auth',
    }
  )
);
