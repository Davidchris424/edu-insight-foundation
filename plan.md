# EduInsight - Student Performance Intelligence Platform Foundation

Building the foundation for a production-ready SaaS application for student performance analytics.

## Scope Summary
- Scalable database schema design (multi-tenant)
- Secure authentication framework with RBAC (Super Admin, School Owner, Administrator, Teacher)
- Multi-tenancy isolation logic via `School_ID`
- Modern dashboard layout architecture
- Reusable folder structure and base components

## Non-Goals
- Implementation of actual analytics/charts
- Payment system implementation
- AI features
- Full CRUD for all tables (foundation only)
- Real-time notifications

## Assumptions
- The application is a React SPA using Vite.
- Persistence will be simulated via `localStorage` or a mock state for this foundation phase, but the schema will be designed to be Postgres-ready.
- Multi-tenancy will be enforced at the data-access layer.

## Affected Areas
- `src/types/`: Database and domain models
- `src/store/`: Auth and multi-tenancy state management
- `src/components/layout/`: Dashboard shell and navigation
- `src/lib/`: Multi-tenant filtering and auth utilities
- `src/hooks/`: Data fetching hooks with automatic filtering

## Phases

### Phase 1: Architecture & Type Definitions
- Establish the folder structure (`components/`, `hooks/`, `lib/`, `services/`, `store/`, `types/`).
- Define TypeScript interfaces for all database entities:
  - `School`, `User`, `Teacher`, `Student`, `Class`, `Subject`, `AcademicSession`, `Term`, `Score`, `Payment`, `InterventionLog`.
- Define `UserRole` enum and `Session` interface.
- **Owner:** `frontend_engineer`

### Phase 2: Multi-Tenant Auth Store
- Implement a mock authentication service.
- Create a global store (using Zustand or simple Context) to hold:
    - `user`: Current logged-in user details.
    - `schoolId`: The active tenant ID.
    - `role`: The user's role for RBAC.
    - `assignedClassId`: Specific to Teachers.
- **Owner:** `frontend_engineer`

### Phase 3: Modern Dashboard Shell (UI Foundation)
- Design a responsive Sidebar/Navbar layout using Shadcn UI components.
- Implement Role-Based Navigation:
    - Sidebar items visible based on `user.role`.
- Create placeholder views for "Dashboard", "Students", "Classes", and "Settings".
- **Owner:** `frontend_engineer`

### Phase 4: Data Layer Utilities
- Create a helper utility/hook `useFilteredData` that automatically applies `schoolId` to any data operation.
- Implement basic mock services for fetching data that respect the `schoolId` filter.
- **Owner:** `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of types, auth state, layout, and multi-tenant utilities.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Build the entire structural foundation including types, global state for multi-tenancy, and the dashboard layout.
- **Files:** 
    - `src/types/database.ts` (Entity definitions)
    - `src/store/useAuthStore.ts` (Auth and tenant state)
    - `src/components/layout/DashboardLayout.tsx` (Main shell)
    - `src/components/layout/Sidebar.tsx` (RBAC navigation)
    - `src/lib/multi-tenancy.ts` (Filtering logic)
- **Depends on:** none
- **Acceptance criteria:**
    - App starts and shows a login/dashboard entry point.
    - TypeScript types cover all requested tables.
    - Changing the `schoolId` in the store would theoretically filter data.
    - Sidebar items change based on the assigned role in the mock state.
    - Layout is responsive and follows modern SaaS patterns.
