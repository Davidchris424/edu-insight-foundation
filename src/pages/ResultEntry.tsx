import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { storageService } from '@/services/storage';
import { AcademicSession, Term, Class, Subject, Student, Score } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ResultEntry: React.FC = () => {
  const { schoolId, user, assignedClassId } = useAuthStore();
  
  // Selection State
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>(assignedClassId || '');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Data State
  const [sessions, setSessions] = useState<AcademicSession[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [scores, setScores] = useState<Record<string, Partial<Score>>>({});

  // Initialize options
  useEffect(() => {
    if (schoolId) {
      const allSessions = storageService.getSessions().filter(s => s.school_id === schoolId);
      setSessions(allSessions);
      const currentSession = allSessions.find(s => s.is_current);
      if (currentSession) setSelectedSession(currentSession.id);

      const allClasses = storageService.getClasses().filter(c => c.school_id === schoolId);
      setClasses(allClasses);

      const allSubjects = storageService.getSubjects().filter(s => s.school_id === schoolId);
      setSubjects(allSubjects);
    }
  }, [schoolId]);

  // Update terms when session changes
  useEffect(() => {
    if (selectedSession) {
      const allTerms = storageService.getTerms().filter(t => t.session_id === selectedSession);
      setTerms(allTerms);
      const currentTerm = allTerms.find(t => t.is_current);
      if (currentTerm) setSelectedTerm(currentTerm.id);
    } else {
      setTerms([]);
      setSelectedTerm('');
    }
  }, [selectedSession]);

  // Fetch students and existing scores when filters change
  useEffect(() => {
    if (schoolId && selectedClass && selectedSubject && selectedTerm) {
      const allStudents = storageService.getStudents().filter(s => 
        s.school_id === schoolId && s.class_id === selectedClass
      );
      setStudents(allStudents);

      const allScores = storageService.getScores().filter(s => 
        s.school_id === schoolId && 
        s.class_id === selectedClass && 
        s.subject_id === selectedSubject && 
        s.term_id === selectedTerm
      );

      const scoreMap: Record<string, Partial<Score>> = {};
      allScores.forEach(s => {
        scoreMap[s.student_id] = s;
      });
      setScores(scoreMap);
    } else {
      setStudents([]);
      setScores({});
    }
  }, [schoolId, selectedClass, selectedSubject, selectedTerm]);

  const calculateGrade = (total: number) => {
    if (total >= 70) return 'A';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    if (total >= 45) return 'D';
    if (total >= 40) return 'E';
    return 'F';
  };

  const calculateRemarks = (grade: string) => {
    switch (grade) {
      case 'A': return 'Excellent';
      case 'B': return 'Very Good';
      case 'C': return 'Good';
      case 'D': return 'Fair';
      case 'E': return 'Pass';
      default: return 'Fail';
    }
  };

  const handleScoreChange = (studentId: string, field: 'ca_score' | 'exam_score', value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // Validation
    if (field === 'ca_score' && (numValue < 0 || numValue > 40)) return;
    if (field === 'exam_score' && (numValue < 0 || numValue > 60)) return;

    setScores(prev => {
      const current = prev[studentId] || {};
      const updated = { ...current, [field]: numValue };
      
      const total = (updated.ca_score || 0) + (updated.exam_score || 0);
      updated.total_score = total;
      updated.grade = calculateGrade(total);
      updated.remarks = calculateRemarks(updated.grade);
      
      return { ...prev, [studentId]: updated };
    });
  };

  const handleSave = () => {
    if (!schoolId || !user || !selectedClass || !selectedSubject || !selectedTerm) {
      toast.error('Please select all filters before saving.');
      return;
    }

    try {
      Object.entries(scores).forEach(([studentId, scoreData]) => {
        const score: Score = {
          id: scoreData.id || crypto.randomUUID(),
          school_id: schoolId,
          teacher_id: user.id,
          student_id: studentId,
          subject_id: selectedSubject,
          term_id: selectedTerm,
          class_id: selectedClass,
          ca_score: scoreData.ca_score || 0,
          exam_score: scoreData.exam_score || 0,
          total_score: scoreData.total_score || 0,
          grade: scoreData.grade || 'F',
          remarks: scoreData.remarks || 'Fail',
          created_at: scoreData.created_at || new Date().toISOString(),
        };
        storageService.upsertScore(score);
      });
      toast.success('Scores saved successfully.');
    } catch (error) {
      toast.error('Failed to save scores. Please try again.');
    }
  };

  const isFilterSelected = selectedSession && selectedTerm && selectedClass && selectedSubject;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Result Entry</h1>
          <p className="text-muted-foreground">Enter and manage student academic performance scores.</p>
        </div>
        <Button onClick={handleSave} disabled={!isFilterSelected || students.length === 0} className="gap-2">
          <Save className="h-4 w-4" />
          Save All Scores
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selection Filters</CardTitle>
          <CardDescription>Select the academic context for score entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session">Academic Session</Label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger id="session">
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name} {s.is_current ? '(Current)' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm} disabled={!selectedSession}>
                <SelectTrigger id="term">
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  {terms.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name} {t.is_current ? '(Current)' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isFilterSelected ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Selection Required</AlertTitle>
          <AlertDescription>
            Please select a session, term, class, and subject to begin entering scores.
          </AlertDescription>
        </Alert>
      ) : students.length === 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Students Found</AlertTitle>
          <AlertDescription>
            There are no students enrolled in the selected class.
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admission No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="w-[120px]">CA (40)</TableHead>
                    <TableHead className="w-[120px]">Exam (60)</TableHead>
                    <TableHead className="w-[80px]">Total</TableHead>
                    <TableHead className="w-[80px]">Grade</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const studentScore = scores[student.id] || {};
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.admission_number}</TableCell>
                        <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            max={40}
                            value={studentScore.ca_score ?? ''}
                            onChange={(e) => handleScoreChange(student.id, 'ca_score', e.target.value)}
                            placeholder="0-40"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            max={60}
                            value={studentScore.exam_score ?? ''}
                            onChange={(e) => handleScoreChange(student.id, 'exam_score', e.target.value)}
                            placeholder="0-60"
                          />
                        </TableCell>
                        <TableCell className="font-bold text-center">{studentScore.total_score || 0}</TableCell>
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            (studentScore.grade === 'A' || studentScore.grade === 'B') ? 'bg-green-100 text-green-800' :
                            (studentScore.grade === 'C' || studentScore.grade === 'D') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {studentScore.grade || 'F'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{studentScore.remarks || 'Fail'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-end gap-4">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Auto-calculating totals and grades
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save All Scores
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultEntry;
