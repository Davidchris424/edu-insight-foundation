import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useFilteredData } from '@/hooks/use-filtered-data';
import { storageService } from '@/services/storage';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types/database';

export default function Dashboard() {
  const { user, schoolId } = useAuthStore();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const students = useFilteredData(allStudents);

  useEffect(() => {
    setAllStudents(storageService.getStudents());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.full_name}</h2>
        <p className="text-muted-foreground">
          {user?.role === 'SUPER_ADMIN' 
            ? 'EduInsight System Overview' 
            : `Overview for ${schoolId === 'school-1' ? 'Kano Model School' : 'Bompai Academy'}`}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Filtered by school isolation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students (Multi-tenant filtered)</CardTitle>
          <CardDescription>
            These records are automatically isolated based on your School ID.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Admission No.</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.first_name} {student.last_name}</TableCell>
                    <TableCell>{student.admission_number}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No students found for this school context.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
