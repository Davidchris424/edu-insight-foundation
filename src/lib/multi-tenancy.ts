import { useAuthStore } from '@/store/useAuthStore';

/**
 * Utility to filter data based on the current school ID.
 * This simulates the RLS (Row Level Security) that would happen in a database.
 */
export function filterBySchool<T extends { school_id?: string | null }>(
  data: T[],
  schoolId: string | null
): T[] {
  // Super Admin can see everything
  const role = useAuthStore.getState().role;
  if (role === 'SUPER_ADMIN') return data;
  
  if (!schoolId) return [];
  return data.filter((item) => item.school_id === schoolId);
}

/**
 * Utility to filter data based on the current teacher's assigned class.
 */
export function filterByClass<T extends { class_id?: string | null }>(
  data: T[],
  classId: string | null
): T[] {
  if (!classId) return data;
  return data.filter((item) => item.class_id === classId);
}
