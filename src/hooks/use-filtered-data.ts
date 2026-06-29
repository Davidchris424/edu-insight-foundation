import { useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { filterBySchool, filterByClass } from '@/lib/multi-tenancy';

/**
 * Hook to automatically filter a dataset based on the current user's multi-tenancy context.
 */
export function useFilteredData<T extends { school_id?: string | null; class_id?: string | null }>(
  data: T[]
) {
  const { schoolId, role, assignedClassId } = useAuthStore();

  return useMemo(() => {
    let filtered = filterBySchool(data, schoolId);
    
    // For teachers, further filter by assigned class if applicable
    if (role === 'TEACHER' && assignedClassId) {
      filtered = filterByClass(filtered, assignedClassId);
    }
    
    return filtered;
  }, [data, schoolId, role, assignedClassId]);
}
