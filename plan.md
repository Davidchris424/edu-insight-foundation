# EduInsight - Teacher Result Entry Module Implementation

Extension of the EduInsight platform to allow teachers to enter and manage student scores.

## Scope Summary
- Implementation of a "Teacher Result Entry" page.
- Selection flows for Session, Term, Class, Subject, and Student.
- Score entry interface with automatic validation.
- Integration with the existing `localStorage` storage service.
- Multi-tenancy enforcement (linking scores to `School_ID`, `Teacher_ID`, etc.).

## Non-Goals
- Real-time collaborative grading.
- Bulk CSV/Excel score upload (can be a future phase).
- Report card generation/PDF export (out of scope for result entry).

## Assumptions
- The application continues to use `localStorage` via `storageService`.
- Teachers are already associated with specific classes/subjects in the mock data or via the UI.
- The `Score` type in `src/types/database.ts` is the source of truth for the data structure.

## Affected Areas
- `src/pages/ResultEntry.tsx`: New page for score entry.
- `src/services/storage.ts`: Add `updateScore` or `addScore` methods if needed (generic `addItem` exists).
- `src/components/layout/Sidebar.tsx`: Add "Result Entry" navigation item for teachers.
- `src/App.tsx`: Register the new route.

## Phases

### Phase 1: Storage Service Enhancements
- Update `src/services/storage.ts` to include specific methods for fetching sessions, terms, classes, and subjects filtered by the current context if necessary (though generic getters exist).
- Ensure `addItem` and a new `updateItem` (or similar) are available for scores.
- **Owner:** `frontend_engineer`

### Phase 2: Result Entry UI Development
- Create `src/pages/ResultEntry.tsx`.
- Implement selection dropdowns for:
    - Session (AcademicSession)
    - Term
    - Class
    - Subject
- Implement a student list/table where scores can be entered for the selected filters.
- **Owner:** `frontend_engineer`

### Phase 3: Validation & Persistence
- Implement score range validation (e.g., CA 0-40, Exam 0-60).
- Automatic calculation of `total_score`.
- Grade calculation logic (based on standard scale).
- Save/Update logic to `storageService`.
- **Owner:** `frontend_engineer`

### Phase 4: Integration & Navigation
- Add the "Result Entry" route to `src/App.tsx`.
- Update `src/components/layout/Sidebar.tsx` to include the link for users with the `TEACHER` role.
- **Owner:** `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of the Result Entry module and integration.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Build the teacher result entry module using the existing `localStorage` architecture.
- **Files:** 
    - `src/pages/ResultEntry.tsx` (New)
    - `src/services/storage.ts` (Update for save/update logic)
    - `src/components/layout/Sidebar.tsx` (Navigation update)
    - `src/App.tsx` (Route registration)
- **Depends on:** none
- **Acceptance criteria:**
    - Teachers can navigate to "Result Entry".
    - Dropdowns correctly list Sessions, Terms, Classes, and Subjects.
    - Score entry validates ranges and calculates totals/grades.
    - Saving persistence works (verified by reloading or checking `localStorage`).
    - Data is correctly tagged with `school_id`, `student_id`, `subject_id`, etc.
