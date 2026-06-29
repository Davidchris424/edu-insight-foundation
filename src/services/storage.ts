import { 
  School, 
  User, 
  Teacher, 
  Student, 
  Class, 
  Subject, 
  AcademicSession, 
  Term, 
  Score, 
  Payment, 
  InterventionLog 
} from '@/types/database';
import { 
  MOCK_SCHOOLS, 
  MOCK_USERS, 
  MOCK_STUDENTS,
  MOCK_TEACHERS,
  MOCK_SESSIONS,
  MOCK_TERMS,
  MOCK_CLASSES,
  MOCK_SUBJECTS
} from './mock-data';

const STORAGE_KEYS = {
  SCHOOLS: 'edu_schools',
  USERS: 'edu_users',
  TEACHERS: 'edu_teachers',
  STUDENTS: 'edu_students',
  CLASSES: 'edu_classes',
  SUBJECTS: 'edu_subjects',
  SESSIONS: 'edu_sessions',
  TERMS: 'edu_terms',
  SCORES: 'edu_scores',
  PAYMENTS: 'edu_payments',
  INTERVENTIONS: 'edu_interventions',
};

class StorageService {
  private getItem<T>(key: string, defaultValue: T[] = []): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private setItem<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.SCHOOLS)) {
      this.setItem(STORAGE_KEYS.SCHOOLS, MOCK_SCHOOLS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.setItem(STORAGE_KEYS.USERS, MOCK_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      this.setItem(STORAGE_KEYS.STUDENTS, MOCK_STUDENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEACHERS)) {
      this.setItem(STORAGE_KEYS.TEACHERS, MOCK_TEACHERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
      this.setItem(STORAGE_KEYS.SESSIONS, MOCK_SESSIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TERMS)) {
      this.setItem(STORAGE_KEYS.TERMS, MOCK_TERMS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
      this.setItem(STORAGE_KEYS.CLASSES, MOCK_CLASSES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      this.setItem(STORAGE_KEYS.SUBJECTS, MOCK_SUBJECTS);
    }
    // Initialize other tables as empty arrays if not present
    Object.values(STORAGE_KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        this.setItem(key, []);
      }
    });
  }

  getSchools(): School[] { return this.getItem(STORAGE_KEYS.SCHOOLS); }
  getUsers(): User[] { return this.getItem(STORAGE_KEYS.USERS); }
  getStudents(): Student[] { return this.getItem(STORAGE_KEYS.STUDENTS); }
  getTeachers(): Teacher[] { return this.getItem(STORAGE_KEYS.TEACHERS); }
  getClasses(): Class[] { return this.getItem(STORAGE_KEYS.CLASSES); }
  getSubjects(): Subject[] { return this.getItem(STORAGE_KEYS.SUBJECTS); }
  getSessions(): AcademicSession[] { return this.getItem(STORAGE_KEYS.SESSIONS); }
  getTerms(): Term[] { return this.getItem(STORAGE_KEYS.TERMS); }
  getScores(): Score[] { return this.getItem(STORAGE_KEYS.SCORES); }
  getPayments(): Payment[] { return this.getItem(STORAGE_KEYS.PAYMENTS); }
  getInterventions(): InterventionLog[] { return this.getItem(STORAGE_KEYS.INTERVENTIONS); }

  // Generic add helper
  addItem<T extends { id: string }>(key: string, item: T): void {
    const items = this.getItem<T>(key);
    this.setItem(key, [...items, item]);
  }

  upsertScore(score: Score): void {
    const scores = this.getScores();
    const index = scores.findIndex(s => 
      s.student_id === score.student_id && 
      s.subject_id === score.subject_id && 
      s.term_id === score.term_id &&
      s.class_id === score.class_id
    );

    if (index >= 0) {
      scores[index] = { ...scores[index], ...score };
      this.setItem(STORAGE_KEYS.SCORES, scores);
    } else {
      this.addItem(STORAGE_KEYS.SCORES, score);
    }
  }
}

export const storageService = new StorageService();
