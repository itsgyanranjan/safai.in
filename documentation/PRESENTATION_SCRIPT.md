# SAFAI — Swachhata Abhiyan Digital Platform
## Complete Presentation & Viva Preparation Guide

---

> **Document Purpose**: This file serves as an exhaustive technical handbook, presentation script, viva question bank, rapid revision guide, and debugging log for **SAFAI (Swachhata Abhiyan Digital Platform)**. Every explanation is grounded directly in the production source code.

---

## TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Project Development Journey](#2-project-development-journey)
3. [Complete Technology Stack](#3-complete-technology-stack)
4. [Project Folder Structure](#4-project-folder-structure)
5. [React Frontend Explanation](#5-react-frontend-explanation)
6. [Django Backend Explanation](#6-django-backend-explanation)
7. [Database Design](#7-database-design)
8. [Complete API Explanation](#8-complete-api-explanation)
9. [Authentication Architecture](#9-authentication-architecture)
10. [User Roles & Permissions](#10-user-roles--permissions)
11. [End-to-End Project Workflow](#11-end-to-end-project-workflow)
12. [AI Features & Algorithms](#12-ai-features--algorithms)
13. [Security Architecture](#13-security-architecture)
14. [Performance & Scalability](#14-performance--scalability)
15. [Challenges Faced](#15-challenges-faced)
16. [Future Scope](#16-future-scope)
17. [10–15 Minute Presentation Speaking Script](#17-1015-minute-presentation-speaking-script)
18. [100 Comprehensive Viva Questions & Detailed Answers](#18-100-comprehensive-viva-questions--detailed-answers)
19. [Rapid Revision: One Hour Before Presentation](#19-rapid-revision-one-hour-before-presentation)
20. [Development Challenges, Errors & Debugging Journey](#20-development-challenges-errors--debugging-journey)

---

## 1. PROJECT OVERVIEW

### What is SAFAI?
**SAFAI** (*Swachhata Abhiyan Digital Platform*) is a modern, full-stack, dark-themed civic-tech digital web application built to revolutionize urban waste management and civic cleanliness operations. The name SAFAI aligns with India's national cleanliness vision (*Swachh Bharat Abhiyan*) with the tag line **"A click towards cleanliness."**

It bridges the gap between **Citizens**, **Municipal Administrators (BMC/Municipal Authorities)**, and **Field Sanitation Workers** through real-time grievance reporting, AI-driven waste analytics, automated workforce assignment, route optimization, community cleanup drive organization, and a gamified citizen reward system.

### Why Was This Project Developed?
Traditional urban municipal grievance systems suffer from critical bottlenecks:
- **Lack of Transparency**: Citizens file complaints without knowing if or when a worker has been dispatched.
- **Manual & Inefficient Worker Dispatch**: Admins manually sort through hundreds of raw complaints without priority scoring, leading to delayed responses in critical/medical areas.
- **Duplicate & False Reports**: Multiple citizens report the same waste pile, causing duplicate worker deployments and wasted fuel.
- **Low Public Engagement**: Citizens lack incentive to keep their surroundings clean or participate in civic drives.
- **Absence of Data-Driven Decision Making**: Municipal authorities lack predictive tools to identify high-risk waste accumulation hotspots before public health issues arise.

SAFAI was created to eliminate these inefficiencies by providing an intelligent, transparent, and automated digital ecosystem.

### Real-World Problem Solved
1. **Response Time Reduction**: Automates issue category and priority assignment, reducing dispatch delays.
2. **Duplicate Suppression**: Uses geospatial clustering (Haversine formula within 300m) to group duplicate reports.
3. **Resource Optimization**: AI-based worker recommendation matches nearby available field staff based on workload, and vehicle route optimization saves fuel.
4. **Public Accountability & Trust**: Live status tracking (*Submitted $\rightarrow$ Assigned $\rightarrow$ In Progress $\rightarrow$ Resolved*) with mandatory before/after photo verification.
5. **Civic Gamification**: Citizens earn **Swachhata Reward Points** for reporting issues, taking quizzes, and joining cleanup drives, redeemable for digital certificates and leaderboard recognition.

### Project Objectives
- Build a **Decoupled Single Page Application (SPA)** using React (Vite) and Django REST Framework.
- Implement **Role-Based Access Control (RBAC)** across three distinct user roles: Citizen, Admin, and Field Worker.
- Construct **9 AI/Algorithmic Services** covering NLP category prediction, multi-factor priority scoring, geospatial duplicate detection, hotspot analysis, cleanliness scoring, worker recommendation, route optimization, image classification, and a natural language chatbot assistant.
- Provide a responsive, dark-themed UI adhering to modern design principles with glassmorphism and subtle animations.

### Major Modules
1. **User Authentication & Role Management Module (`accounts`)**
2. **Complaint Management & Track Operations (`complaints`)**
3. **Field Worker Management & Proof Verification (`accounts` / `complaints`)**
4. **Community Cleanup Drives & Certification (`cleanup_drives`)**
5. **Waste Management, Vehicle Fleet & Ward Operations (`waste_management`)**
6. **Analytics, Hotspots & Public Dashboard (`analytics`)**
7. **Swachhata Rewards & Community Leaderboard (`rewards`)**
8. **AI Engine & Algorithmic Intelligence (`ai_engine`)**
9. **Awareness Hub, Environmental Quizzes & Education (`awareness`)**

---

## 2. PROJECT DEVELOPMENT JOURNEY

```
Requirement Analysis
       │
       ▼
System Architecture & API Design
       │
       ▼
UI/UX Design & Component Wireframing (React + Tailwind CSS)
       │
       ▼
Database Schema Design (PostgreSQL / Django ORM)
       │
       ▼
Backend Core Implementation (Django & Django REST Framework)
       │
       ▼
JWT Authentication & Role Security Implementation
       │
       ▼
Frontend-Backend API Integration (Axios Services & State Management)
       │
       ▼
AI Engine & Algorithmic Modules Implementation
       │
       ▼
Field Worker Portal & Proof Verification Integration
       │
       ▼
End-to-End Testing & Bug Fixing
       │
       ▼
Documentation & Production Deployment Preparation
```

### Phase-by-Phase Breakdown

1. **Requirement Analysis**: Identified key domain challenges in municipal waste management, finalized user roles (Citizen, Admin, Field Worker), and defined software requirements.
2. **System Architecture Design**: Selected a decoupled SPA architecture. React handles the UI presentation layer, communicating via HTTP REST APIs to Django REST Framework, backed by PostgreSQL.
3. **UI/UX & Component Wireframing**: Created a unified dark theme design system (`#0B0F14` background, green accents `#22C55E`, glassmorphism cards). Built reusable UI primitives (`StatCard`, `ComplaintCard`, `DriveCard`, `StatusTimeline`, `InteractiveMap`).
4. **Database Schema Design**: Designed ER diagrams for 20 database models including custom `User` inheriting from `AbstractUser`, `WorkerProfile`, `Complaint`, `Assignment`, `Feedback`, `CleanupDrive`, `Certificate`, `Vehicle`, `Ward`, and `Hotspot`.
5. **Backend Core Implementation**: Initialized Django app modules (`accounts`, `complaints`, `cleanup_drives`, `waste_management`, `analytics`, `rewards`, `ai_engine`, `awareness`). Built ModelSerializers and APIViews (ListCreate, RetrieveUpdateDestroy, Custom APIViews).
6. **JWT Authentication & Security**: Integrated `djangorestframework-simplejwt`. Replaced username-based authentication with email-based login using custom `BaseUserManager`. Built permission guards (`IsAuthenticated`, `IsAuthenticatedOrReadOnly`).
7. **Frontend-Backend API Integration**: Built Axios service layer (`api.js` with Bearer request interceptor, `authService.js`, `complaintService.js`, `workerService.js`, `aiService.js`). Added local storage fallback handlers for smooth demo resilience.
8. **AI Engine Development**: Implemented 9 custom algorithms in Python (`ai_engine/services.py`): keyword NLP classification, risk priority matrix, Haversine geospatial proximity, 14-day rolling window hotspot detection, ward score formula, worker load-balancing algorithm, daily vehicle route optimization, vision heuristic pipeline, and chatbot Q&A.
9. **Field Worker Portal**: Added dedicated worker authentication, task acceptance, and before/after image upload proof verification workflow.
10. **Testing & Refinement**: Performed API testing via Postman/Swagger, role permission validation, cross-browser frontend testing, and responsive UI layout validation.

---

## 3. COMPLETE TECHNOLOGY STACK

### 1. React (v18.2.0)
- **What is it?**: An open-source declarative JavaScript library for building user interfaces using component-based architecture.
- **Why chosen?**: Provides Virtual DOM for fast rendering, component reusability, modular code structure, and a strong ecosystem.
- **Better than alternatives?**: Superior component lifecycle and state management compared to Vanilla JS or jQuery; lighter and more flexible than Angular.
- **How used in SAFAI**: Powers the entire client frontend UI, managing page views, interactive components, state (`AuthContext`), and dynamic DOM updating.

### 2. Vite (v4.4.5)
- **What is it?**: Next-generation frontend build tool and development server created by Evan You.
- **Why chosen?**: Uses native ES modules (ESM) in browser during development, offering near-instantaneous Server Start and Hot Module Replacement (HMR).
- **Better than alternatives?**: Significantly faster than Create React App (Webpack), which suffers from long build times and slow reloads.
- **How used in SAFAI**: Serves as dev server (`npm run dev`), handles JSX compilation, module bundling, environment variable injection (`import.meta.env`), and production build generation (`dist/`).

### 3. Tailwind CSS (v3.3.3)
- **What is it?**: A utility-first CSS framework providing low-level styling classes directly inside HTML/JSX.
- **Why chosen?**: Allows rapid UI development without writing custom CSS selectors, enforces responsive layout design, and minimizes CSS bundle size.
- **Better than alternatives?**: Avoids CSS class name collisions typical in raw CSS; cleaner and more customizable than Bootstrap.
- **How used in SAFAI**: Styles every page, card, button, modal, glassmorphism container, and animation with dark theme colors (`bg-[#0B0F14]`, `text-[#22C55E]`, `border-[#1F2937]`).

### 4. React Router DOM (v6.15.0)
- **What is it?**: Standard routing library for React single-page applications.
- **Why chosen?**: Enables client-side page navigation without full browser refreshes, supporting nested routes and route protection guards.
- **Better than alternatives?**: Outperforms legacy window location reloads by maintaining app state and offering dynamic parameter matching (`/complaints/:id`).
- **How used in SAFAI**: Configures public routes (`/`, `/report-issue`, `/stats`, `/awareness-hub`), authenticated citizen routes (`/dashboard`, `/my-reports`), worker routes (`/worker/dashboard`), and protected admin routes (`/admin-dashboard`, `/manage-workers`).

### 5. Axios (v1.5.0)
- **What is it?**: Promise-based HTTP client for browser and Node.js.
- **Why chosen?**: Provides automatic JSON parsing, request/response interceptors, request cancellation, and robust error handling.
- **Better than alternatives?**: Simpler interceptor syntax and clearer error structures than raw browser `fetch()`.
- **How used in SAFAI**: Configured in `services/api.js` to send requests to Django endpoints (`/api/`), automatically attaching JWT `Bearer <token>` headers via request interceptors.

### 6. Python (v3.10+)
- **What is it?**: High-level, interpreted programming language known for readability and vast libraries.
- **Why chosen?**: Excellent back-end support, rapid development capabilities, and standard choice for AI/data logic implementation.
- **How used in SAFAI**: Core execution language for Django backend, ORM operations, REST APIs, and the AI algorithm engine.

### 7. Django (v4.2 LTS)
- **What is it?**: High-level Python web framework enforcing the Model-View-Template (MVT) pattern.
- **Why chosen?**: Batteries-included approach providing built-in ORM, administrative panel, security protections (CSRF, XSS, SQLi), and custom user model support.
- **Better than alternatives?**: Provides far more out-of-the-box infrastructure and built-in security than Flask or Express.js.
- **How used in SAFAI**: Serves as the web backend engine hosting database models, settings, media files, and app modules.

### 8. Django REST Framework - DRF (v3.14.0)
- **What is it?**: Powerful toolkit built on top of Django for creating RESTful APIs.
- **Why chosen?**: Provides ModelSerializers, class-based generic views, authentication schemes, permissions framework, and interactive browsable API / Swagger integration.
- **How used in SAFAI**: Converts Django model querysets into JSON payloads and handles HTTP methods (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`).

### 9. JWT Authentication (`djangorestframework-simplejwt` v5.3.0)
- **What is it?**: JSON Web Token authentication plugin for DRF.
- **Why chosen?**: Stateless authentication mechanism ideal for decoupled SPA architecture. No backend session storage required.
- **How used in SAFAI**: Generates 24-hour Access Tokens and 7-day Refresh Tokens upon login. Clients store tokens in LocalStorage and send them via `Authorization: Bearer <token>` HTTP headers.

### 10. PostgreSQL & Django ORM
- **What is it?**: PostgreSQL is an enterprise-class open-source relational database (RDBMS). Django ORM is an abstraction layer that interacts with the DB using Python classes instead of raw SQL.
- **Why chosen?**: PostgreSQL provides ACID compliance, strong data integrity, spatial query readiness (PostGIS compatibility), and high performance.
- **How used in SAFAI**: Stores user profiles, complaints, assignments, cleanup drives, certificates, vehicles, wards, and AI analytics data.

### 11. Tooling Ecosystem
- **Git & GitHub**: Version control system and remote repository hosting for team collaboration, branch management, and commit tracking.
- **VS Code**: Primary Integrated Development Environment (IDE) configured with ESLint, Python extension, and Tailwind Intellisense.
- **Postman / Swagger (`drf-yasg`)**: Used for API endpoint testing, header inspection, payload verification, and automated API documentation generation (`/swagger/`, `/redoc/`).

---

## 4. PROJECT FOLDER STRUCTURE

```
safai-project/
├── backend/
│   ├── manage.py                  # Django CLI management script
│   ├── requirements.txt           # Python backend dependencies
│   ├── .env.example               # Template for environment variables
│   ├── config/                    # Django core project configuration
│   │   ├── settings.py            # Global settings (DB, Installed Apps, JWT, CORS)
│   │   ├── urls.py                # Main URL routing table & Swagger endpoints
│   │   ├── wsgi.py / asgi.py      # WSGI/ASGI entrypoints for deployment
│   ├── accounts/                  # App 1: Custom User & Worker Profiles
│   │   ├── models.py              # User (AbstractUser), WorkerProfile
│   │   ├── views.py               # RegisterView, LoginView, ProfileView
│   │   ├── serializers.py        # UserSerializer, RegisterSerializer
│   │   └── urls.py                # Auth URL patterns (/api/auth/)
│   ├── complaints/                # App 2: Complaint Management & Proof
│   │   ├── models.py              # Complaint, Assignment, Feedback
│   │   ├── views.py               # ComplaintListCreateView, FeedbackView
│   │   ├── serializers.py        # ComplaintSerializer, FeedbackSerializer
│   │   └── urls.py                # Complaint URL patterns (/api/complaints/)
│   ├── cleanup_drives/            # App 3: Community Cleanup Drives
│   │   ├── models.py              # CleanupDrive, DriveRegistration, Certificate
│   │   ├── views.py               # Drive views, Join/Leave, Certificate issue
│   │   ├── serializers.py        # Drive & Certificate Serializers
│   │   └── urls.py                # Drive URL patterns (/api/drives/)
│   ├── waste_management/          # App 4: Vehicle Fleet & Ward Operations
│   │   ├── models.py              # Vehicle, Ward
│   │   ├── views.py               # VehicleListView, WardListView
│   │   ├── serializers.py        # Vehicle & Ward Serializers
│   │   └── urls.py                # Vehicle URL patterns (/api/vehicles/)
│   ├── analytics/                 # App 5: Public Statistics & Hotspots
│   │   ├── views.py               # PublicStatsView, WardScoresView, HotspotsView
│   │   └── urls.py                # Analytics URL patterns (/api/analytics/)
│   ├── rewards/                   # App 6: Leaderboard & Swachhata Points
│   │   ├── models.py              # Reward model
│   │   ├── views.py               # UserRewardsView, LeaderboardView
│   │   └── urls.py                # Rewards URL patterns (/api/rewards/)
│   ├── ai_engine/                 # App 7: AI Engine & Algorithmic Services
│   │   ├── models.py              # Hotspot, Recommendation, AIReport, PredictionHistory
│   │   ├── services.py            # 9 Core AI Algorithms & Logic
│   │   ├── views.py               # API endpoints for AI services
│   │   └── urls.py                # AI URL patterns (/api/ai/)
│   └── awareness/                 # App 8: Educational Campaigns & Quizzes
│       ├── models.py              # Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article
│       ├── views.py               # ViewSets & SubmitQuizView
│       └── urls.py                # Awareness URL patterns (/api/awareness/)
│
├── frontend/                      # React SPA Frontend
│   ├── package.json               # Node.js dependencies & scripts
│   ├── vite.config.js             # Vite config & API proxy settings
│   ├── tailwind.config.js         # Custom colors, theme extensions, fonts
│   ├── index.html                 # Root HTML entrypoint
│   └── src/                       # React Source Code
│       ├── main.jsx               # React DOM root render
│       ├── App.jsx                # Router setup, global layout, providers
│       ├── index.css              # Tailwind base directives & custom scrollbars
│       ├── context/
│       │   └── AuthContext.jsx    # React Context for auth state & helper functions
│       ├── services/
│       │   ├── api.js             # Axios instance & request JWT interceptor
│       │   ├── authService.js     # Auth API calls & local storage backup
│       │   ├── complaintService.js# Complaint API calls & persistent fallback
│       │   ├── workerService.js   # Worker assignment & task status API calls
│       │   ├── aiService.js       # AI API calls (predictions, route, chat)
│       │   └── ...                # analyticsService, driveService, rewardService
│       ├── components/            # Reusable UI components
│       │   ├── Navbar.jsx         # Responsive navigation bar with role links
│       │   ├── Footer.jsx         # Dark-themed footer
│       │   ├── ProtectedRoute.jsx # Role-based route guard component
│       │   ├── StatCard.jsx       # Animated stat counter component
│       │   ├── ComplaintCard.jsx  # Complaint card with badge status
│       │   ├── DriveCard.jsx      # Cleanup drive event card
│       │   ├── StatusTimeline.jsx # Visual timeline (Submitted -> Resolved)
│       │   ├── InteractiveMap.jsx # Interactive Leaflet map container
│       │   └── ai/
│       │       ├── SafaiAiChatbot.jsx   # Global floating AI chatbot widget
│       │       ├── HotspotCard.jsx      # Waste hotspot analytics card
│       │       ├── PredictionCard.jsx   # AI category/priority preview card
│       │       └── ...                  # WardScoreCard, TrendChart, WeeklyReportCard
│       └── pages/                 # 22 Full Application Pages
│           ├── Home.jsx           # Hero page, live stats, feature showcase
│           ├── ReportIssue.jsx    # Citizen complaint reporting form with AI pre-fill
│           ├── CitizenDashboard.jsx# Personal tracking dashboard for citizens
│           ├── AdminDashboard.jsx # Admin management portal & system metrics
│           ├── ManageComplaints.jsx# Admin complaint assignment interface
│           ├── ManageWorkers.jsx  # Worker allocation & performance tracking
│           ├── WorkerDashboard.jsx# Worker task dashboard & task acceptor
│           ├── WorkerTaskDetails.jsx# Task detail view with before/after image upload
│           ├── AIDashboard.jsx    # Complete AI control center & hotspot map
│           ├── AwarenessHub.jsx   # Interactive quiz, posters, & eco tips
│           └── ...                # Rewards, CleanupDrives, PublicStats, About, Login, Register
```

---

## 5. REACT FRONTEND EXPLANATION

### Component Architecture
The frontend is built using modular React functional components. State flows top-down via props or is shared globally using React Context.

```
[App.jsx]
   ├── AuthProvider (AuthContext)
   │     ├── Navbar
   │     ├── Routes (Page Components)
   │     │     ├── Home
   │     │     ├── ReportIssue ──> [PredictionCard]
   │     │     ├── CitizenDashboard ──> [ComplaintCard], [StatusTimeline]
   │     │     ├── AdminDashboard ──> [HotspotCard], [WardScoreCard]
   │     │     ├── WorkerDashboard ──> [TaskCard]
   │     │     └── AIDashboard ──> [TrendChart], [WeeklyReportCard]
   │     ├── SafaiAiChatbot (Global Floating Widget)
   │     └── Footer
```

### Routing & Route Protection (`ProtectedRoute.jsx`)
Routes are managed by `React Router 6`. Protected routes are wrapped inside `ProtectedRoute.jsx`:
```jsx
export const ProtectedRoute = ({ requireAdmin, requireWorker }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;
  if (requireWorker && user.role !== 'FIELD_WORKER') return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};
```

### State Management (`AuthContext.jsx`)
`AuthContext` provides global authentication state (`user`, `loading`, `login`, `register`, `logout`, `isAdmin`, `isWorker`) to the entire application using React's `useContext` hook:
- On mount, `useEffect` reads stored user data from `localStorage.getItem('safai_user')`.
- On login/register, token and user data are persisted to `localStorage`.

### API Communications & Interceptors (`api.js`)
Axios creates a centralized HTTP client instance configured with `baseURL: '/api/'` and a 5000ms timeout. A request interceptor automatically injects the JWT token:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('safai_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
```

---

## 6. DJANGO BACKEND EXPLANATION

### App-Based Architecture
The backend is structured into 8 modular Django apps registered in `INSTALLED_APPS` inside `settings.py`:
1. `accounts`: Manages custom User authentication model and worker profile metadata.
2. `complaints`: Handles grievance logging, status updating, worker task assignments, and citizen feedback.
3. `cleanup_drives`: Manages community volunteer cleanup events, user registrations, and QR-verified digital certificates.
4. `waste_management`: Tracks municipal garbage collection vehicles and ward cleanliness data.
5. `analytics`: Computes city public statistics, ward cleanliness rankings, and hotspot risk lists.
6. `rewards`: Manages citizen reward points and the community leaderboard.
7. `ai_engine`: Implements the 9 AI services, algorithmic helper functions, and database tables for AI logs.
8. `awareness`: Educational campaigns, eco-tips, articles, and interactive quiz submission engine.

### Data Validation & Serializers
DRF `ModelSerializer` instances validate incoming HTTP request payloads before touching the database:
- `RegisterSerializer`: Validates email uniqueness and hashes passwords using `User.objects.create_user()`.
- `ComplaintSerializer`: Converts complaint objects to JSON, exposing `reported_by_name` via read-only fields and nesting `FeedbackSerializer`.

### Media Upload Handling
Images (complaint photos, worker proof photos, worker profiles) are managed via Django's file storage system:
- `MEDIA_URL = '/media/'`
- `MEDIA_ROOT = BASE_DIR / 'media'`
- Configured in `urls.py` to serve static media files during development when `settings.DEBUG = True`.

---

## 7. DATABASE DESIGN

### Schema & Entity Relationships

```
                     ┌───────────────────┐
                     │    accounts.User  │
                     └─────────┬─────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │ 1:1                   │ 1:N                   │ 1:N
       ▼                       ▼                       ▼
┌──────────────┐      ┌─────────────────┐     ┌──────────────────┐
│WorkerProfile │      │    Complaint    │     │DriveRegistration │
└──────────────┘      └────────┬────────┘     └──────────────────┘
                               │
                     ┌─────────┴─────────┐
                     │ 1:1               │ 1:1
                     ▼                   ▼
            ┌─────────────────┐ ┌─────────────────┐
            │   Assignment    │ │    Feedback     │
            └─────────────────┘ └─────────────────┘
```

### Table Specifications

1. **`User` (`accounts_user`)**:
   - `id` (PK, Auto), `email` (Unique), `name` (VarChar 150), `role` (Choice: CITIZEN, ADMIN, FIELD_WORKER), `reward_points` (Integer, default=0), `password` (Hashed), `is_staff`, `is_active`.

2. **`WorkerProfile` (`accounts_workerprofile`)**:
   - `id` (PK), `user_id` (FK to User, 1:1, Unique), `employee_id` (VarChar 50, Unique), `phone` (VarChar 20), `department` (VarChar 100), `assigned_zone` (VarChar 150), `profile_photo` (ImageField), `status` (Choice: Available, Busy, On Leave).

3. **`Complaint` (`complaints_complaint`)**:
   - `id` (PK), `complaint_id` (VarChar 20, Unique, e.g., `SAF-2026-48912`), `category` (Choice), `description` (Text), `image` (ImageField), `latitude` (Float), `longitude` (Float), `address` (VarChar 255), `ward` (VarChar 100), `priority` (Choice: LOW, MEDIUM, HIGH), `status` (Choice: SUBMITTED, ASSIGNED, IN_PROGRESS, RESOLVED), `reported_by_id` (FK to User), `assigned_team` (VarChar 100), `created_at`, `updated_at`.

4. **`Assignment` (`complaints_assignment`)**:
   - `id` (PK), `complaint_id` (FK to Complaint, 1:1, Unique), `worker_id` (FK to User), `assigned_by_id` (FK to User, Nullable), `assigned_at`, `accepted_at`, `completed_at`, `completion_notes`, `before_image`, `after_image`, `status` (Assigned, Accepted, In Progress, Completed, Verified).

5. **`Feedback` (`complaints_feedback`)**:
   - `id` (PK), `complaint_id` (FK to Complaint, 1:1), `user_id` (FK to User), `rating` (Integer 1-5), `comment` (Text), `created_at`.

6. **`CleanupDrive` (`cleanup_drives_cleanupdrive`)**:
   - `id` (PK), `title` (VarChar 200), `description` (Text), `location` (VarChar 255), `date` (Date), `time` (VarChar 100), `max_participants` (Integer).

7. **`DriveRegistration` (`cleanup_drives_driveregistration`)**:
   - `id` (PK), `user_id` (FK to User), `cleanup_drive_id` (FK to CleanupDrive). Unique Together constraint: (`user`, `cleanup_drive`).

8. **`Certificate` (`cleanup_drives_certificate`)**:
   - `id` (PK), `certificate_id` (VarChar 50, Unique, e.g., `CERT-2026-9812`), `user_id` (FK to User), `cleanup_drive_id` (FK to CleanupDrive), `issued_at`, `qr_code_hash` (SHA-256 hash digest).

9. **`Vehicle` (`waste_management_vehicle`)**:
   - `id` (PK), `vehicle_number` (VarChar 50, Unique), `driver` (VarChar 100), `latitude`, `longitude`, `route`, `status` (Active, Delayed, Maintenance).

10. **`Ward` (`waste_management_ward`)**:
    - `id` (PK), `name` (VarChar 100, Unique), `cleanliness_score` (Integer), `total_complaints`, `resolved_complaints`.

11. **`Hotspot` (`ai_engine_hotspot`)**:
    - `id` (PK), `ward` (VarChar 100), `area` (VarChar 150), `risk_level` (HIGH, MEDIUM, LOW), `complaint_count`, `primary_category`, `reason`, `updated_at`.

### Why PostgreSQL?
- **ACID Compliance**: Guarantees Atomicity, Consistency, Isolation, and Durability for all database transactions.
- **Relational Integrity**: Foreign key constraints ensure cascading deletions and references are enforced.
- **Production Scalability**: Efficient indexing, connection pooling, and PostGIS geospatial extensions.

---

## 8. COMPLETE API EXPLANATION

| App | Method | Endpoint | Purpose | Auth Level | Key Request Fields | Key Response Fields |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Accounts** | `POST` | `/api/auth/register/` | Register new user | Public | `email`, `name`, `password`, `role` | `user`, `access`, `refresh` |
| **Accounts** | `POST` | `/api/auth/login/` | Obtain JWT tokens | Public | `email`, `password` | `user`, `access`, `refresh` |
| **Accounts** | `GET` | `/api/auth/profile/` | Fetch user profile | Bearer JWT | None | User profile object |
| **Complaints**| `GET` | `/api/complaints/` | List complaints | Public/Bearer| Query: `mine=true` | Array of Complaint objects |
| **Complaints**| `POST` | `/api/complaints/` | Submit complaint | Bearer JWT | `category`, `description`, `image`, `latitude`, `longitude`, `address`, `ward`, `priority` | Created Complaint object (+50 pts) |
| **Complaints**| `GET` | `/api/complaints/<id>/` | Complaint details | Public/Bearer| None | Complaint detail with feedback |
| **Complaints**| `PATCH`| `/api/complaints/<id>/` | Update status/team | Bearer JWT | `status`, `assigned_team` | Updated Complaint object |
| **Complaints**| `POST` | `/api/complaints/<id>/feedback/` | Submit feedback | Bearer JWT | `rating`, `comment` | Feedback object (+20 pts) |
| **Drives** | `GET` | `/api/drives/` | List cleanup drives| Public | None | Array of drive objects |
| **Drives** | `POST` | `/api/drives/<id>/join/` | Join cleanup drive | Bearer JWT | None | Success message (+100 pts) |
| **Drives** | `GET` | `/api/drives/certificates/` | View certificates | Bearer JWT | None | Array of certificate objects |
| **Vehicles** | `GET` | `/api/vehicles/` | List vehicle fleet | Public | None | Array of Vehicle objects |
| **Analytics**| `GET` | `/api/analytics/stats/` | City public stats | Public | None | Cleanliness score, issue counts |
| **Analytics**| `GET` | `/api/analytics/hotspots/` | Risk hotspots | Public | None | High-risk ward hotspot list |
| **Rewards** | `GET` | `/api/rewards/leaderboard/`| Top citizens | Public | None | Ranked leaderboard array |
| **AI Engine** | `POST` | `/api/ai/predict-category/` | AI category prediction | Public | `description` | `category`, `confidence` |
| **AI Engine** | `POST` | `/api/ai/predict-priority/` | AI priority prediction | Public | `description`, `category`, `address` | `priority`, `confidence`, `reason` |
| **AI Engine** | `POST` | `/api/ai/check-duplicate/` | Duplicate detector | Public | `latitude`, `longitude`, `ward`, `category` | `is_duplicate_detected`, `matches` |
| **AI Engine** | `GET` | `/api/ai/cleanliness-score/`| Ward score calculation| Public | None | Ward scores array with grades |
| **AI Engine** | `POST` | `/api/ai/recommend-worker/`| Worker load balancer| Public | `complaint_id` | `worker_name`, `score`, `reason` |
| **AI Engine** | `GET` | `/api/ai/route-optimization/`| Vehicle route planner| Public | `vehicle_id` | `todays_route`, `total_stops` |
| **AI Engine** | `POST` | `/api/ai/chat/` | AI chatbot Q&A | Public/Bearer| `message` | `reply`, `options` |
| **Awareness** | `POST` | `/api/awareness/quiz/submit/`| Quiz evaluation | Public/Bearer| `answers: {q_id: opt}` | `score_percentage`, `earned_points` |

---

## 9. AUTHENTICATION ARCHITECTURE

### JWT Architecture & Tokens
SAFAI implements **JSON Web Token (JWT)** stateless authentication:
- **Access Token**: Short-lived cryptographic token (24-hour expiration) passed in HTTP headers for API authorization.
- **Refresh Token**: Long-lived token (7-day expiration) used to request new Access Tokens without forcing re-login.

```
Client (React)                              Backend (Django DRF)
      │                                              │
      ├─── POST /api/auth/login/ (Credentials) ────>│
      │                                              │ Validate user & password
      │<── Response 200 { access, refresh, user } ───┤
      │                                              │
(Store in LocalStorage)                              │
      │                                              │
      ├─── GET /api/complaints/ (Bearer <access>) ──>│
      │                                              │ Verify Token Signature
      │<── Response 200 OK (Protected Data) ─────────┤
```

### Password Security & Hashing
Passwords are never stored in plain text. Django uses **PBKDF2 with a SHA256 hash** and 320,000 salt iterations by default, ensuring resistant storage against brute-force and rainbow table attacks.

---

## 10. USER ROLES & PERMISSIONS

### 1. Citizen (`CITIZEN`)
- **Capabilities**: Submit complaints with photo/location, track personal complaint resolution timelines, submit ratings/feedback, join community cleanup drives, attempt environmental quizzes, view public analytics, earning **Swachhata Reward Points**.
- **Permissions**: Access to public routes and authenticated citizen routes (`/dashboard`, `/report-issue`, `/my-reports`, `/rewards`, `/my-certificates`).

### 2. Field Worker (`FIELD_WORKER`)
- **Capabilities**: Log into dedicated worker portal (`/worker/login`), view assigned sanitation tasks, update task state (*Accepted $\rightarrow$ In Progress $\rightarrow$ Resolved*), upload mandatory **Before & After completion proof photos**, and view personal profile metadata.
- **Permissions**: Restricted to worker portal routes (`/worker/dashboard`, `/worker/tasks/:id`).

### 3. Municipal Admin (`ADMIN`)
- **Capabilities**: View full city-wide administrative metrics, review active complaints, assign complaints to field workers using AI recommendations, manage vehicle routes, track worker status, trigger AI weekly operations reports, and manage municipal cleanup drives.
- **Permissions**: Full access to admin portals (`/admin-dashboard`, `/manage-complaints`, `/vehicles-teams`, `/manage-workers`). Guarded by `requireAdmin={true}` in `ProtectedRoute.jsx`.

---

## 11. END-TO-END PROJECT WORKFLOW

```
1. Citizen Registration & Login
   └── Citizen creates account with Email & Password. Server returns JWT Access Token.

2. Complaint Filing with AI Assistance
   └── Citizen types issue description on /report-issue page.
   └── AI predict-category endpoint pre-selects category ("Overflowing Dustbin").
   └── AI predict-priority endpoint calculates priority ("HIGH").
   └── AI check-duplicate scans within 300m radius to alert user if issue was already reported.
   └── Citizen uploads photo and submits. (+50 Swachhata Points awarded).

3. Admin Dispatch & AI Worker Recommendation
   └── Admin sees new complaint on /manage-complaints dashboard.
   └── Admin clicks "Get AI Worker Recommendation".
   └── AI engine ranks available workers based on zone proximity, current task count, and availability.
   └── Admin clicks "Assign Task" to dispatch the recommended worker. Complaint status turns "ASSIGNED".

4. Worker Execution & Proof Verification
   └── Worker logs into /worker/login and sees task on /worker/dashboard.
   └── Worker accepts task (Status: "IN_PROGRESS").
   └── Worker arrives on site, cleans area, and uploads "After Cleanup" proof photo on /worker/tasks/:id.
   └── Worker marks task completed. Complaint status updates to "RESOLVED".

5. Citizen Feedback & Reward Settlement
   └── Citizen sees "RESOLVED" status and before/after verification photos on Citizen Dashboard.
   └── Citizen submits 5-star rating and feedback comment (+20 Bonus Points awarded).
   └── Citizen appears on the Community Leaderboard.
```

---

## 12. AI FEATURES & ALGORITHMS

### 1. Natural Language Category Classifier (`predict_category`)
- **Logic**: Evaluates raw description text against keyword frequency vectors across 5 categories (`Overflowing Dustbin`, `Missed Waste Collection`, `Street Cleaning`, `Open Dumping`, `Garbage Accumulation`). Weighs word lengths ($>5$ chars count double).
- **Confidence Formula**:
  $$\text{Confidence} = \min\left(0.95, \, 0.70 + (\text{Highest Score} \times 0.08)\right)$$

### 2. Multi-Factor Priority Scoring Engine (`predict_priority`)
- **Logic**: Evaluates context sensitivity:
  - High risk terms (`hospital`, `medical waste`, `hazard`, `epidemic` $+3$ points).
  - Medical/hazard context ($+4$ points).
  - Category penalty (`Open Dumping` $+2$ points).
  - High complaint frequency ($ \ge 3 $ complaints at location in last 7 days $+3$ points).
- **Threshold**: Score $ \ge 4 \rightarrow \text{HIGH}$, Score $ \ge 2 \rightarrow \text{MEDIUM}$, else $\text{LOW}$.

### 3. Geospatial Duplicate Detection (`detect_duplicate_complaints`)
- **Logic**: Uses the spherical **Haversine Formula** to compute distance between newly reported latitude/longitude $(lat_1, lon_1)$ and active unresolved complaints $(lat_2, lon_2)$:
  $$a = \sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1) \cdot \cos(\phi_2) \cdot \sin^2\left(\frac{\Delta \lambda}{2}\right)$$
  $$c = 2 \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1-a}\right), \quad d = R \cdot c \quad (R = 6,371,000\text{m})$$
- If distance $d \le 300\text{m}$ and category matches, it triggers a duplicate flag.

### 4. Waste Hotspot Risk Analytics (`detect_hotspots`)
- **Logic**: Scans a rolling 14-day window of complaints grouped by municipal ward.
- **Risk Assignment**: $ \ge 15$ complaints or $ \ge 10$ pending $\rightarrow \text{HIGH}$, $ \ge 6$ complaints $\rightarrow \text{MEDIUM}$, else $\text{LOW}$.

### 5. Ward Cleanliness Scoring Formula (`calculate_cleanliness_score`)
- **Formula**:
  $$\text{Score} = \max\left(50, \, \min\left(100, \, \text{Base Clearance Rate} + \text{Drive Bonus} - \text{High Priority Penalty}\right)\right)$$
  - $\text{Base Clearance Rate} = \left(\frac{\text{Resolved Complaints}}{\text{Total Complaints}}\right) \times 100$
  - $\text{Drive Bonus} = \min(10, \text{Cleanup Drives Count} \times 3)$
  - $\text{High Priority Penalty} = \text{Unresolved High Priority Count} \times 4$

### 6. Smart Worker Load Balancer (`recommend_worker_for_complaint`)
- **Logic**: Ranks workers by evaluating:
  1. Zone Match ($+30$ points if worker zone matches complaint ward).
  2. Availability ($+15$ points if Available, $-10$ if Busy).
  3. Workload Penalty ($-8$ points per active assigned task).
  4. Complaint Urgency ($+5$ points for HIGH priority).

### 7. Vehicle Route Optimization (`generate_daily_route`)
- **Logic**: Sorts unresolved complaints by priority and geospatial nearest-neighbor proximity, generating ordered collection stops, arrival time estimates, and total kilometer distance.

### 8. Vision Waste Classifier (`analyze_image`)
- **Logic**: Computer vision heuristic pipeline analyzing uploaded image file patterns to confirm waste presence and generate confidence metrics.

### 9. SAFAI AI Assistant / Chatbot (`process_chat_query`)
- **Logic**: Rule-based natural language parser supporting dynamic database lookups (user's personal complaints, live ward scores, upcoming cleanup drives) with interactive suggestion chips.

---

## 13. SECURITY ARCHITECTURE

1. **JWT Stateless Authentication**: Prevents session hijacking and CSRF vulnerabilities.
2. **Role-Based Access Control (RBAC)**: Enforced both on client (`ProtectedRoute.jsx`) and server (`permissions.IsAuthenticated`, `IsAdminUser`).
3. **Password Security**: Standard PBKDF2 hashing with salt iterations.
4. **Input Sanitization & ORM Injection Defense**: Django ORM uses parameterized SQL queries, neutralizing SQL Injection (SQLi) attacks.
5. **CORS Headers**: `django-cors-headers` restricts unauthorized cross-origin requests.
6. **Environment Variable Isolation**: Secret keys and DB credentials isolated inside `.env`.

---

## 14. PERFORMANCE & SCALABILITY

1. **Vite ES Modules**: Provides instant HMR during development and optimized tree-shaken production bundles.
2. **Database Query Optimization**: Django ORM querysets use `.select_related()` and `.prefetch_related()` to eliminate $N+1$ query problems.
3. **Client-Side Caching**: LocalStorage caches static user metadata and persistent fallback arrays for offline resilience.
4. **Asynchronous API Architecture**: Decoupled architecture allows independent scaling of frontend (CDN static hosting) and backend (gunicorn/PostgreSQL).

---

## 15. CHALLENGES FACED

1. **CORS Policy Restrictions**: Solved by configuring `CORS_ALLOW_ALL_ORIGINS = True` and adding `corsheaders.middleware.CorsMiddleware` at top of Django middleware stack.
2. **Geospatial Distance Calculations**: Solved by implementing the mathematical Haversine formula in pure Python using `math.radians` and `math.atan2`.
3. **Role-Based Guards**: Solved by building a flexible `ProtectedRoute` component accepting `requireAdmin` and `requireWorker` boolean flags.
4. **JWT Expiration & User Persistence**: Solved by syncing token state in LocalStorage with Axios request interceptors.

---

## 16. FUTURE SCOPE

1. **Deep Learning Computer Vision**: Upgrade image classification from heuristic pipeline to a fine-tuned ResNet / YOLOv8 model for real-time trash detection.
2. **IoT Smart Bin Integration**: Connect ultrasonic fill-level sensors to transmit real-time bin status via MQTT/WebSockets.
3. **Live GPS Vehicle Fleet Tracking**: Integrate Leaflet.js with WebSockets for real-time garbage truck movement on map.
4. **Native Mobile App**: Port frontend to React Native or Flutter for Android/iOS push notifications.

---

## 17. 10–15 MINUTE PRESENTATION SPEAKING SCRIPT

### [SLIDE 1: Title Slide & Introduction]
> "Good morning respected external examiners, internal guide, and teachers. Today, our team is proud to present our final year project: **SAFAI — Swachhata Abhiyan Digital Platform**, under the tagline *'A click towards cleanliness.'* My name is Prayash Ranjan Dash, and alongside my project teammates Gyana Ranjan Kar and Isha Yadav, we have engineered an AI-powered, dark-themed civic technology web application aimed at solving real-world municipal waste management issues."

### [SLIDE 2: Problem Statement & Motivation]
> "In most Indian cities, civic cleanliness grievance systems suffer from three major issues: lack of transparency, manual worker dispatch without priority scoring, and zero public incentives for citizens. Citizens report garbage, but never know when it will be cleaned. Municipal admins sort through hundreds of reports manually. SAFAI solves this by creating a transparent, automated 3-way ecosystem connecting Citizens, Municipal Admins, and Field Workers."

### [SLIDE 3: System Architecture & Technology Stack]
> "As shown on the architecture diagram, SAFAI is built as a Decoupled Single Page Application. On the frontend, we used React 18, Vite, React Router 6, and Tailwind CSS. The client communicates via RESTful JSON APIs using Axios. On the backend, we utilized Python with Django 4.2 and Django REST Framework, backed by a PostgreSQL database and secured with JWT Authentication."

### [SLIDE 4: Core Citizen Workflow & Filing Complaints]
> "Let us look at the citizen flow. When a citizen files an issue on our `/report-issue` page, our backend AI engine automatically analyzes their text description to predict the category and assign priority. Furthermore, our Haversine geospatial algorithm checks within a 300-meter radius to detect duplicate complaints before submission, preventing wasted municipal trips. Citizens earn 50 Swachhata Reward Points upon reporting."

### [SLIDE 5: Admin Portal & Smart AI Worker Recommendation]
> "On the Admin Dashboard, municipal authorities get a bird's-eye view of high-risk waste hotspots, ward cleanliness scores, and active complaints. When dispatching a worker, the admin doesn't have to guess. Our AI Worker Recommendation Engine ranks field staff based on zone proximity, current active workload, and availability, allowing 1-click intelligent dispatch."

### [SLIDE 6: Field Worker Portal & Proof Verification]
> "SAFAI introduces a dedicated Field Worker Portal. Workers log in, accept assigned tasks, navigate to the site, perform cleanup, and upload mandatory before-and-after proof photographs. Once verified, the complaint is marked RESOLVED, and the citizen receives a notification to provide rating and feedback."

### [SLIDE 7: AI Engine & Algorithmic Intelligence]
> "Our AI engine contains 9 specialized algorithms: NLP category prediction, multi-factor priority scoring, Haversine geospatial duplicate detection, 14-day rolling window hotspot analytics, ward cleanliness scoring, worker load balancing, vehicle route optimization, vision classification, and a natural language chatbot assistant."

### [SLIDE 8: Rewards, Awareness Hub & Conclusion]
> "To drive citizen participation, SAFAI incorporates a gamified rewards system with a public leaderboard, cleanup drive registrations, QR-verified digital certificates, and an environmental quiz hub. In conclusion, SAFAI transforms passive urban citizens into active cleanliness champions while empowering municipal authorities with data-driven AI tools. Thank you, and we are now open for your questions."

---

## 18. 100 COMPREHENSIVE VIVA QUESTIONS & DETAILED ANSWERS

### Section A: React & Frontend Development (Q1 – Q20)

#### Q1: What is React and why did you choose it for SAFAI?
**Answer**: React is an open-source component-based JavaScript library for building user interfaces. We chose React because its Virtual DOM offers fast rendering performance, component reusability makes code modular, and client-side routing enables a seamless single-page application experience.

#### Q2: What is the Virtual DOM and how does it work?
**Answer**: The Virtual DOM is an in-memory lightweight representation of the real DOM. When component state changes, React creates a new Virtual DOM tree, compares it with the previous tree using a diffing algorithm (Reconciliation), and batch-updates only the changed elements in the real DOM.

#### Q3: Why did you use Vite instead of Create React App (CRA)?
**Answer**: Vite uses native ES modules during development, providing near-instantaneous server startup and hot module replacement (HMR) regardless of application size. CRA relies on Webpack, which bundles the entire application before serving, resulting in significantly slower build and reload times.

#### Q4: How does State Management work in your project?
**Answer**: We use a hybrid approach: local component state (`useState`) for page-specific logic, global state (`AuthContext`) for user authentication and tokens, and `localStorage` for persisting session tokens across browser reloads.

#### Q5: What is React Context API and how is it used in `AuthContext.jsx`?
**Answer**: React Context API provides a way to pass data through the component tree without passing props manually down every level (prop drilling). In `AuthContext.jsx`, we wrap the application in `AuthProvider` to expose `user`, `login`, `logout`, `isAdmin`, and `isWorker` globally.

#### Q6: What are React Hooks? Name the ones used in your project.
**Answer**: Hooks are functions that let functional components use state and lifecycle features. In SAFAI, we used `useState` (local state), `useEffect` (side effects & API fetching), `useContext` (accessing AuthContext), `useNavigate` (programmatic routing), and `useParams` (extracting route parameters).

#### Q7: How do Protected Routes work in React Router 6?
**Answer**: In `ProtectedRoute.jsx`, we wrap protected route elements. The component checks `AuthContext` for `user`. If unauthenticated, it redirects to `/login` using `<Navigate />`. If `requireAdmin` is true and `user.role !== 'ADMIN'`, it redirects to `/dashboard`.

#### Q8: What is Tailwind CSS and what are its advantages?
**Answer**: Tailwind CSS is a utility-first CSS framework. Its advantages include rapid styling directly inside JSX, zero CSS class collisions, automated unused CSS purging in production builds, and built-in responsive breakpoint classes (`sm:`, `md:`, `lg:`).

#### Q9: What is Axios and why is it preferred over native `fetch()`?
**Answer**: Axios is a promise-based HTTP client. It is preferred over `fetch()` because it automatically serializes JSON data, supports request/response interceptors, handles HTTP error status codes more cleanly, and supports request timeouts.

#### Q10: How do Axios Interceptors work in your application?
**Answer**: In `services/api.js`, `api.interceptors.request.use` intercepts every outgoing HTTP request before it leaves the browser, checks `localStorage` for `safai_token`, and attaches it to the `Authorization` header as `Bearer <token>`.

#### Q11: What is a Single Page Application (SPA)?
**Answer**: An SPA is a web application that loads a single HTML page (`index.html`) and dynamically updates page content as the user interacts with the app, without requiring full page reloads from the server.

#### Q12: How do you handle forms in React?
**Answer**: Controlled components manage form inputs by binding input values to React `useState` state variables and updating them via `onChange` event handlers.

#### Q13: What is JSX?
**Answer**: JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows developers to write HTML-like markup directly inside JavaScript files, which Babel/Vite transpiles into `React.createElement()` calls.

#### Q14: How is responsiveness achieved in your UI?
**Answer**: We use Tailwind CSS flexbox, grid layouts, and responsive utility classes (e.g., `grid-cols-1 md:grid-cols-3`) to ensure seamless rendering across mobile, tablet, and desktop screens.

#### Q15: What is the purpose of `useEffect` with an empty dependency array `[]`?
**Answer**: An empty dependency array `[]` ensures the effect callback runs exactly once after the initial component mount, simulating `componentDidMount`.

#### Q16: How do you handle conditional rendering in React?
**Answer**: We use ternary operators (`condition ? <ComponentA /> : <ComponentB />`) and logical AND operators (`condition && <Component />`) inside JSX.

#### Q17: How is image uploading handled on the React frontend?
**Answer**: An `<input type="file" accept="image/*">` reads the file object, appends it to a `FormData` instance, and posts it via Axios with `Content-Type: multipart/form-data`.

#### Q18: What is the purpose of `localStorage` in your app?
**Answer**: `localStorage` persists the JWT access token (`safai_token`), user profile metadata (`safai_user`), and offline fallback arrays across browser refreshes and tab closures.

#### Q19: What is `import.meta.env` in Vite?
**Answer**: It is Vite's mechanism for reading environment variables defined in `.env` files (e.g., `import.meta.env.VITE_API_BASE_URL`).

#### Q20: How do key props work in React lists?
**Answer**: Keys (e.g., `key={complaint.id}`) give elements a stable identity, helping React's diffing algorithm identify which items have changed, been added, or been removed.

---

### Section B: Django Backend & Python (Q21 – Q40)

#### Q21: What is Django and what architecture does it follow?
**Answer**: Django is a high-level Python web framework that follows the Model-View-Template (MVT) architecture pattern. In our decoupled REST setup, Django handles Models, Serializers, and APIViews (acting as MVC).

#### Q22: What is Django REST Framework (DRF)?
**Answer**: DRF is a powerful toolkit for Django that simplifies building RESTful APIs by providing Serializers, ViewSets, APIViews, Authentication, and Permission classes.

#### Q23: Why did you customize the default User model in Django?
**Answer**: Default Django user models use `username` for authentication. We created a custom `User` class inheriting from `AbstractUser` to use `email` as the unique primary identifier and add custom fields like `role` and `reward_points`.

#### Q24: What is `CustomUserManager` in `accounts/models.py`?
**Answer**: It is a custom manager class inheriting from `BaseUserManager` that overrides `create_user()` and `create_superuser()` to normalize emails and handle user creation without requiring a username.

#### Q25: What is the difference between `APIView`, `generics.ListCreateAPIView`, and `ModelViewSet`?
**Answer**: 
- `APIView`: Low-level view class where you explicitly define HTTP method handlers (`get`, `post`).
- `generics.ListCreateAPIView`: Pre-built generic view handling GET (list) and POST (create).
- `ModelViewSet`: High-level viewset providing full CRUD endpoints (`list`, `create`, `retrieve`, `update`, `destroy`).

#### Q26: What are Django Serializers?
**Answer**: Serializers convert complex Python objects/Django querysets into JSON payloads for HTTP responses, and deserialize incoming JSON payloads back into validated Python primitives/models.

#### Q27: What is `ReadOnlyField` in DRF serializers?
**Answer**: `ReadOnlyField` exposes model properties or related field attributes (e.g., `reported_by_name = serializers.ReadOnlyField(source='reported_by.name')`) in the JSON output without expecting them in incoming POST payloads.

#### Q28: How does Django handle database migrations?
**Answer**: `python manage.py makemigrations` inspects `models.py` changes and generates Python migration scripts inside `migrations/`. `python manage.py migrate` executes these scripts against the database to alter tables.

#### Q29: What is `settings.py` used for in Django?
**Answer**: It contains all global project configurations including installed applications, middleware stack, database connections, password validators, JWT settings, CORS policy, and static/media file paths.

#### Q30: How does CORS work and how is it configured in Django?
**Answer**: CORS (Cross-Origin Resource Sharing) is a browser security mechanism restricting cross-domain HTTP requests. We configured `django-cors-headers` middleware and set `CORS_ALLOW_ALL_ORIGINS = True` to allow React (`localhost:5173`) to communicate with Django (`localhost:8000`).

#### Q31: What is the purpose of `related_name` in Django ForeignKey fields?
**Answer**: `related_name` specifies the attribute name used for reverse ORM relationships from the target model back to the source model (e.g., `reported_by = models.ForeignKey(User, related_name='complaints')` allows `user.complaints.all()`).

#### Q32: What is the difference between `null=True` and `blank=True` in Django models?
**Answer**: `null=True` sets `NULL` on the database table column. `blank=True` controls form/serializer validation, allowing the field to be submitted as empty.

#### Q33: How are media files (images) handled in Django?
**Answer**: Image fields store file paths in the database, while the physical image files are saved in `MEDIA_ROOT` (`backend/media/`). In development, static media routes serve files at `MEDIA_URL` (`/media/`).

#### Q34: What is `drf-yasg`?
**Answer**: `drf-yasg` is a library that automatically generates interactive OpenAPI/Swagger and ReDoc API documentation endpoints (`/swagger/`, `/redoc/`) from DRF URL routing and serializers.

#### Q35: How do permission classes work in DRF?
**Answer**: Permission classes inspect `request.user` before executing view code. Examples: `permissions.AllowAny` (public), `permissions.IsAuthenticated` (logged in users), `permissions.IsAuthenticatedOrReadOnly` (read public, write authenticated).

#### Q36: How do you save custom logic during model `.save()`?
**Answer**: We override the model's `save()` method. For example, in `Complaint.save()`, if `complaint_id` is blank, we auto-generate a unique ID like `SAF-2026-89412` before calling `super().save()`.

#### Q37: What is `select_related()` vs `prefetch_related()` in Django ORM?
**Answer**:
- `select_related()`: Performs an SQL `JOIN` for single-valued relationships (ForeignKey, OneToOne).
- `prefetch_related()`: Performs separate queries and joins in Python for multi-valued relationships (ManyToMany, Reverse ForeignKey).

#### Q38: What is `wsgi.py` and `asgi.py`?
**Answer**: WSGI (Web Server Gateway Interface) handles synchronous Python web application serving. ASGI (Asynchronous Server Gateway Interface) supports async protocols like WebSockets and HTTP/2.

#### Q39: What is `python-dotenv`?
**Answer**: A Python module that reads key-value pairs from a `.env` file and sets them as environment variables accessed via `os.environ.get()`.

#### Q40: What is the purpose of `urls.py` in Django?
**Answer**: It acts as the routing table (URL dispatcher), mapping incoming HTTP URL paths to specific Django view functions or APIViews.

---

### Section C: Database & PostgreSQL (Q41 – Q55)

#### Q41: Why was PostgreSQL chosen over MySQL or SQLite?
**Answer**: PostgreSQL provides enterprise ACID compliance, superior spatial data support (PostGIS), JSONB indexing capabilities, robust concurrent query performance, and strict data integrity.

#### Q42: What is an ORM and what are its advantages?
**Answer**: An Object-Relational Mapper (ORM) maps database tables to programming language classes. Advantages include writing database queries in Python instead of raw SQL, automatic SQL injection prevention, and seamless database vendor portability.

#### Q43: Explain the database relationship between `User` and `WorkerProfile`.
**Answer**: It is a **One-To-One (1:1)** relationship implemented using `models.OneToOneField`. Each worker profile belongs to exactly one user account, and each worker user has one profile.

#### Q44: Explain the relationship between `User` and `Complaint`.
**Answer**: It is a **One-To-Many (1:N)** relationship implemented via `models.ForeignKey`. One citizen can file multiple complaints, but each complaint is reported by one user.

#### Q45: How is a composite unique constraint implemented in Django?
**Answer**: Using `unique_together` inside the model's `Meta` class (e.g., `unique_together = ('user', 'cleanup_drive')` in `DriveRegistration` prevents duplicate drive sign-ups).

#### Q46: What is a Primary Key (PK) and Foreign Key (FK)?
**Answer**: A Primary Key is a unique identifier column for a database record. A Foreign Key is a column that establishes a link to the Primary Key of another table.

#### Q47: What is database indexing and why is it important?
**Answer**: Indexing creates a data structure (e.g., B-Tree) that speeds up data retrieval operations on a database table at the cost of additional write time and storage space.

#### Q48: How are spatial coordinates (Latitude & Longitude) stored in SAFAI?
**Answer**: Stored as `models.FloatField(null=True, blank=True)` columns on `Complaint` and `Vehicle` models.

#### Q49: What is ACID compliance in database management?
**Answer**: ACID stands for Atomicity (all-or-nothing), Consistency (valid state transitions), Isolation (concurrent transaction independence), and Durability (committed data persistence).

#### Q50: How do database migrations maintain schema history?
**Answer**: Django tracks executed migrations in a special system table named `django_migrations`, ensuring database instances apply new migrations in exact chronological sequence.

#### Q51: What is the default primary key type in Django 4.2?
**Answer**: `models.BigAutoField`, which uses 64-bit auto-incrementing integers supporting up to $9 \times 10^{18}$ records.

#### Q52: How do you perform aggregate queries in Django ORM?
**Answer**: Using `.aggregate()` and `.annotate()` with Django DB functions like `Count()`, `Avg()`, `Sum()`, and `Max()`.

#### Q53: What happens when a user is deleted if `on_delete=models.CASCADE` is set?
**Answer**: All related child records (e.g., all complaints reported by that user) are automatically deleted from the database to prevent orphaned records.

#### Q54: What is `on_delete=models.SET_NULL`?
**Answer**: When the referenced parent record is deleted, the foreign key column on child records is set to `NULL` (requires `null=True`).

#### Q55: How is SQLite supported as a fallback in SAFAI?
**Answer**: In `settings.py`, we check `USE_POSTGRES = os.environ.get('USE_POSTGRES') == 'True'`. If false, `DATABASES` falls back to `django.db.backends.sqlite3` for effortless offline development.

---

### Section D: REST APIs & JWT Authentication (Q56 – Q70)

#### Q56: What is a RESTful API?
**Answer**: Representational State Transfer (REST) is an architectural style for network applications using stateless HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) to perform operations on URI-identified resources.

#### Q57: What is the difference between `PUT` and `PATCH`?
**Answer**: `PUT` replaces the entire resource payload with new data. `PATCH` updates only specified fields of a resource without touching other fields.

#### Q58: What are HTTP Status Codes? Give examples used in SAFAI.
**Answer**: Standardized numerical responses returned by servers:
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Payload validation failed.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Authenticated user lacks role permission.
- `404 Not Found`: Resource does not exist.

#### Q59: What is JSON Web Token (JWT) structure?
**Answer**: A JWT is a string formatted into 3 Base64URL-encoded parts separated by dots: `Header.Payload.Signature`.
1. **Header**: Token type and hashing algorithm (HS256).
2. **Payload**: Claims (user ID, expiration, role).
3. **Signature**: Cryptographic hash verifying token authenticity.

#### Q60: Why are JWTs stateless?
**Answer**: The server validates token signatures using its secret key without querying a session database or storing state in memory.

#### Q61: What is the Bearer Authentication Scheme?
**Answer**: An HTTP authentication scheme where clients pass credentials in the `Authorization` request header formatted as: `Authorization: Bearer <JWT_ACCESS_TOKEN>`.

#### Q62: How does Token Refreshing work?
**Answer**: When an Access Token expires (24h), the client posts the Refresh Token (7d) to `/api/auth/token/refresh/` to receive a new valid Access Token without forcing the user to re-enter credentials.

#### Q63: What payload data is stored inside SAFAI's JWT token?
**Answer**: Standard claims (`user_id`, `exp`, `iat`) and custom claims configured in SimpleJWT serializers.

#### Q64: What is API Endpoint Serialization?
**Answer**: The process of taking Django model instances and converting them into JSON objects matching designated schema definitions.

#### Q65: What is Swagger UI and how is it used in SAFAI?
**Answer**: Swagger UI (`/swagger/`) renders interactive web documentation for testing endpoints, viewing payload schemas, and trying out API calls directly in the browser.

#### Q66: How do query parameters differ from URL path parameters?
**Answer**: Path parameters identify a specific resource (e.g., `/api/complaints/5/`). Query parameters filter resources (e.g., `/api/complaints/?mine=true`).

#### Q67: What is Payload Validation in DRF?
**Answer**: Serializers run `.is_valid(raise_exception=True)`, checking field types, required presence, and custom validation rules before allowing creation or update.

#### Q68: How do you handle file uploads via REST API?
**Answer**: Requests must use `multipart/form-data` encoding instead of `application/json`. DRF views access uploaded files via `request.FILES`.

#### Q69: What is API Rate Limiting / Throttling?
**Answer**: A security mechanism restricting the number of API requests a client can make within a given timeframe to prevent abuse and Denial of Service (DoS) attacks.

#### Q70: How does stateless JWT compare to session-based auth?
**Answer**: Session-based auth stores session IDs on the server (Redis/DB) and cookies on the client. JWT stores all signed claims inside the token client-side, enabling easier horizontal scaling across microservices.

---

### Section E: AI Engine & Algorithmic Features (Q71 – Q85)

#### Q71: Explain the AI Category Prediction Algorithm in detail.
**Answer**: `predict_category()` calculates word frequency matching against 5 pre-defined keyword lists. Long keywords ($>5$ chars) receive double weight. The highest-scoring category is returned with a calculated confidence percentage up to 95%.

#### Q72: How does the Priority Scoring Algorithm work?
**Answer**: `predict_priority()` assigns points based on: high-risk keyword presence ($+3$), medical/hazard context ($+4$), open dumping category ($+2$), and repeated complaints at location ($+3$). Total score $ \ge 4$ assigns HIGH priority.

#### Q73: Explain the Haversine formula used in Duplicate Detection.
**Answer**: Haversine computes great-circle distances between two coordinate points on a sphere. If an unresolved complaint exists within 300 meters with matching category or address, it flags a duplicate report.

#### Q74: How are Waste Hotspots detected?
**Answer**: `detect_hotspots()` aggregates complaints over a rolling 14-day window per municipal ward. Wards with $ \ge 15$ complaints or $ \ge 10$ pending are classified as HIGH-risk hotspots.

#### Q75: How is the Ward Cleanliness Score computed?
**Answer**: Calculated as: $\text{Base Resolution Rate} + \text{Cleanup Drive Bonus} - \text{High Priority Pending Penalty}$. Scores range from 50% to 100% and assign letter grades (A+, A, B, C).

#### Q76: Explain the Smart Worker Load Balancer algorithm.
**Answer**: `recommend_worker_for_complaint()` evaluates worker candidates based on assigned zone match ($+30$), Availability status ($+15$), active workload penalty ($-8$ per active task), and complaint urgency ($+5$ for HIGH priority).

#### Q77: How does Vehicle Route Optimization work?
**Answer**: `generate_daily_route()` takes unresolved complaints, sorts them by priority and nearest-neighbor distance from vehicle coordinates, and constructs an ordered daily route itinerary with arrival time estimates.

#### Q78: How is the SAFAI AI Assistant Chatbot implemented?
**Answer**: `process_chat_query()` uses pattern-matching NLP to detect user intent (reporting issues, ward scores, cleanup drives, personal complaint status) and dynamically queries database models to formulate interactive replies.

#### Q79: How does the AI Vision Classifier work?
**Answer**: `analyze_image()` is a computer vision pipeline analyzing image filenames and metadata heuristics to evaluate waste confidence scores and suggested municipal actions.

#### Q80: What is the Weekly AI Operations Report?
**Answer**: `generate_weekly_report()` compiles a 7-day executive summary of total complaints, resolution rates, highest-activity categories, and high-risk wards for municipal authorities.

#### Q81: Why use mathematical heuristics over heavy ML models for this stage?
**Answer**: Rule-based heuristics run deterministically with zero latency, low memory footprint, no GPU requirements, and zero external API costs, providing reliable performance for presentation environments.

#### Q82: How can your NLP classifier be upgraded in the future?
**Answer**: By fine-tuning a Transformer model like BERT or DistilBERT on labeled civic grievance datasets or calling the Gemini API for semantic embedding classification.

#### Q83: How can the Vision engine be upgraded?
**Answer**: By integrating a YOLOv8 object detection model or ResNet CNN fine-tuned on custom urban waste image datasets (TACO dataset).

#### Q84: How is duplicate complaint detection exposed on the frontend?
**Answer**: When a citizen enters location/address details in `ReportIssue.jsx`, the frontend triggers `aiService.checkDuplicate()`, rendering an alert banner if a duplicate is found nearby.

#### Q85: What is the purpose of `PredictionHistory` model?
**Answer**: It logs raw input text, predicted categories, priorities, and confidence scores into PostgreSQL for future AI model retraining and audit logging.

---

### Section F: System Design, Security & Viva Readiness (Q86 – Q100)

#### Q86: How did you implement Role-Based Access Control (RBAC)?
**Answer**: On the backend, custom permissions and serializer validations restrict endpoints. On the frontend, `ProtectedRoute` components inspect `user.role` from `AuthContext` to restrict page routing.

#### Q87: How are passwords hashed in Django?
**Answer**: Using PBKDF2 with SHA-256 algorithm and salt iterations, generating salted hash digests stored in `accounts_user.password`.

#### Q88: How is SQL Injection prevented in SAFAI?
**Answer**: Django ORM uses parameterized queries, escaping all user input arguments before passing SQL strings to PostgreSQL.

#### Q89: How is Cross-Site Scripting (XSS) prevented?
**Answer**: React automatically escapes values rendered in JSX before inserting them into the DOM, neutralizing script tag injection.

#### Q90: What environment variables are stored in `.env`?
**Answer**: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `USE_POSTGRES`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT`.

#### Q91: How does the Field Worker proof verification workflow work?
**Answer**: Workers upload an "After Cleanup" image when completing a task. Admins review before/after images on `ManageComplaints.jsx` before marking the assignment verified.

#### Q92: How are Digital Certificates generated for cleanup drives?
**Answer**: In `Certificate.save()`, a unique certificate ID (`CERT-2026-XXXX`) and an immutable SHA-256 hash digest (`qr_code_hash`) are auto-calculated from user and drive IDs.

#### Q93: What is the Swachhata Rewards point structure?
**Answer**: Citizen reporting issue ($+50$ pts), submitting feedback ($+20$ pts), joining cleanup drive ($+100$ pts), drive verification certificate ($+150$ pts), quiz completion (up to $+100$ pts).

#### Q94: How does the offline fallback mechanism work in frontend services?
**Answer**: If Django API calls fail (e.g. backend down), Axios catch blocks log a warning and return persistent fallback arrays from `localStorage`, ensuring UI pages remain functional for demonstrations.

#### Q95: What was the hardest bug encountered during development?
**Answer**: Resolving CORS policy blocks on multipart image uploads and synchronizing custom JWT role claims across React route guards.

#### Q96: How would you scale SAFAI to handle 1,000,000 users?
**Answer**: Deploy frontend to CDN edge servers, scale Django instances horizontally behind an Nginx load balancer, introduce Redis caching for analytics endpoints, and use PostgreSQL read-replicas.

#### Q97: What is the difference between synchronous and asynchronous code execution?
**Answer**: Synchronous code executes sequentially, blocking subsequent commands until current completion. Asynchronous code executes tasks in the background without blocking the main execution thread.

#### Q98: What Git branching strategy was used?
**Answer**: Feature-branch workflow: core changes were developed on feature branches and merged into the main development branch via Pull Requests after testing.

#### Q99: What unit testing approaches can be applied to SAFAI?
**Answer**: Django `TestCase` for backend API endpoint testing, and `React Testing Library` / `Jest` for frontend component rendering and user interaction tests.

#### Q100: What is your biggest personal takeaway from building SAFAI?
**Answer**: Gaining end-to-end practical mastery of full-stack engineering: designing decoupled SPA architectures, crafting RESTful APIs with DRF, building stateless JWT authentication, designing relational PostgreSQL schemas, and implementing pragmatic algorithmic solutions.

---

## 19. RAPID REVISION: ONE HOUR BEFORE PRESENTATION

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    SAFAI — SWACHHATA ABHIYAN DIGITAL PLATFORM                  │
│                        1-HOUR RAPID REVISION CHEAT SHEET                        │
└─────────────────────────────────────────────────────────────────────────────────┘

1. SYSTEM ARCHITECTURE & TECH STACK
   • Architecture: Decoupled Single Page Application (SPA).
   • Frontend: React 18, Vite, React Router 6, Tailwind CSS, Axios, Lucide Icons.
   • Backend: Python 3.10+, Django 4.2, Django REST Framework (DRF), SimpleJWT, CORS.
   • Database: PostgreSQL (Production) / SQLite3 (Dev Fallback) via Django ORM.
   • Auth: Stateless JWT (24h Access Token, 7d Refresh Token, Bearer scheme).

2. CORE USER ROLES & ROUTING GUARDS
   • CITIZEN: Reports issues (+50 pts), tracks status, leaves ratings (+20 pts), joins drives (+100 pts).
   • FIELD WORKER: Logins at /worker/login, accepts tasks, uploads before/after proof images.
   • ADMIN: Accesses /admin-dashboard, views hotspots, dispatches workers via AI recommendation.

3. KEY REPOSITORIES & FOLDER PATHS
   • Frontend Config: /frontend/src/App.jsx, /frontend/src/context/AuthContext.jsx
   • HTTP Interceptor: /frontend/src/services/api.js
   • Backend Settings: /backend/config/settings.py, /backend/config/urls.py
   • Core AI Logic: /backend/ai_engine/services.py

4. DATABASE MODELS (20 MODELS)
   • accounts: User (AbstractUser with email auth & role), WorkerProfile (1:1 with User)
   • complaints: Complaint (SAF-2026-XXXXX), Assignment (1:1 with Complaint), Feedback
   • cleanup_drives: CleanupDrive, DriveRegistration (unique_together), Certificate (SHA-256 hash)
   • waste_management: Vehicle (GPS coords), Ward (cleanliness score)
   • ai_engine: Hotspot, Recommendation, AIReport, PredictionHistory
   • awareness: Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article

5. SUMMARY OF 9 AI SERVICES (ai_engine/services.py)
   1. predict_category: Keyword frequency & weight matrix NLP.
   2. predict_priority: Priority scoring (medical hazard, high-risk terms, complaint frequency).
   3. detect_duplicate_complaints: Haversine distance formula within 300m radius.
   4. detect_hotspots: 14-day rolling window ward aggregation & risk classification.
   5. calculate_cleanliness_score: Resolution ratio + drive bonus - pending high priority penalty.
   6. recommend_worker_for_complaint: Zone proximity, active workload, availability status.
   7. generate_daily_route: Vehicle route optimization (priority & proximity ordering).
   8. analyze_image: Computer vision waste classification heuristic pipeline.
   9. process_chat_query: SAFAI AI Assistant chatbot with dynamic database lookup.

6. COMMANDS TO RUN APP
   • Backend: cd backend -> venv\Scripts\activate -> python manage.py runserver (Port 8000)
   • Frontend: cd frontend -> npm run dev (Port 5173)
```

---

## 20. DEVELOPMENT CHALLENGES, ERRORS & DEBUGGING JOURNEY

### Category 1: Frontend & Integration Challenges

#### 1. CORS Policy Block on API Requests
- **Problem**: React frontend (`localhost:5173`) failed to fetch API data from Django backend (`localhost:8000`), raising `Access to XMLHttpRequest at 'http://localhost:8000/api/' from origin 'http://localhost:5173' has been blocked by CORS policy`.
- **Root Cause**: Browsers enforce Same-Origin Policy. Django backend was missing cross-origin headers.
- **Diagnosis**: Checked browser developer tools console and network tab; identified missing `Access-Control-Allow-Origin` response header.
- **Solution**: Installed `django-cors-headers`, added `'corsheaders.middleware.CorsMiddleware'` to the top of `MIDDLEWARE` in `settings.py`, and set `CORS_ALLOW_ALL_ORIGINS = True`.
- **Lesson Learned**: Always configure CORS middleware at the very beginning of decoupled SPA project setups.

#### 2. Axios Request Authorization Header Loss
- **Problem**: Protected endpoints returned `401 Unauthorized` even after user logged in successfully.
- **Root Cause**: Token was stored in LocalStorage but individual component fetch requests failed to attach the `Authorization: Bearer <token>` header manually.
- **Diagnosis**: Inspected HTTP request headers in Chrome DevTools Network tab; `Authorization` key was absent.
- **Solution**: Implemented a central Axios request interceptor in `services/api.js` that automatically attaches the `Bearer` token to every outgoing request.
- **Lesson Learned**: Use centralized HTTP client instances with interceptors instead of repeating header configuration across components.

#### 3. React Router Infinite Redirect Loop on Protected Routes
- **Problem**: Accessing `/dashboard` resulted in browser freezing due to an infinite re-render/redirect loop.
- **Root Cause**: `ProtectedRoute.jsx` evaluated `user` state before `AuthContext` finished reading `localStorage` on initial page load (`loading = true`).
- **Diagnosis**: React DevTools showed rapid mounting/unmounting of `<Navigate to="/login" />`.
- **Solution**: Added a `loading` state to `AuthContext`. `ProtectedRoute` returns a loading spinner while `loading === true` before checking `user`.
- **Lesson Learned**: Always account for asynchronous initial state restoration in authentication contexts.

#### 4. Multipart Form Data Upload Failures
- **Problem**: Submitting complaints with photos failed with `400 Bad Request` or empty image fields on the backend.
- **Root Cause**: Request payload was sent as standard `application/json` string instead of `FormData` with `multipart/form-data`.
- **Diagnosis**: Checked backend Django serializer errors: `Expected a file, but got str`.
- **Solution**: Updated `complaintService.createComplaint()` to wrap input fields and image files inside a JavaScript `FormData` object and set `headers: { 'Content-Type': 'multipart/form-data' }`.
- **Lesson Learned**: Binary file uploads require `FormData` encoding and explicit `multipart/form-data` content headers.

---

### Category 2: Backend & Database Challenges

#### 5. Custom User Model Migration Conflict
- **Problem**: Running `python manage.py migrate` threw `django.db.migrations.exceptions.InconsistentMigrationHistory`.
- **Root Cause**: App initial migrations ran using default Django `auth.User` before `AUTH_USER_MODEL = 'accounts.User'` was configured in `settings.py`.
- **Diagnosis**: Django migration dependency graph failed when mapping foreign keys to `accounts.User`.
- **Solution**: Flushed development database, deleted old migration files in `accounts/migrations/`, re-ran `makemigrations accounts` and `migrate`.
- **Lesson Learned**: Custom user models must be defined and configured in `settings.py` BEFORE executing the initial database migration.

#### 6. JWT Expiration & Token Refresh Handling
- **Problem**: Users were abruptly logged out after short periods during active testing.
- **Root Cause**: Default SimpleJWT access token lifetime was set to 5 minutes.
- **Diagnosis**: Inspected decoded JWT token payload at `jwt.io`; `exp` timestamp was 300 seconds from `iat`.
- **Solution**: Configured `SIMPLE_JWT` settings in `settings.py` to extend `ACCESS_TOKEN_LIFETIME = timedelta(days=1)` and `REFRESH_TOKEN_LIFETIME = timedelta(days=7)`.
- **Lesson Learned**: Tailor JWT expiration lifetimes according to client application security and usability requirements.

#### 7. Division by Zero in Cleanliness Scoring Algorithm
- **Problem**: Calling `/api/ai/cleanliness-score/` threw `ZeroDivisionError: float division by zero` when testing on empty wards.
- **Root Cause**: Wards with zero reported complaints resulted in `resolved / total` division by zero (`0 / 0`).
- **Diagnosis**: Inspected Django backend terminal traceback pointing to line in `calculate_cleanliness_score()`.
- **Solution**: Added a zero check (`if total == 0: return score = 95`) before evaluating clearance ratios.
- **Lesson Learned**: Always guard mathematical formulas against zero division edge cases when processing dynamic database aggregations.

#### 8. PostgreSQL Connection Refused (`psycopg2.OperationalError`)
- **Problem**: Backend server failed to start with `psycopg2.OperationalError: could not connect to server: Connection refused`.
- **Root Cause**: PostgreSQL service was stopped on local machine, or environment variables in `.env` were wrong.
- **Diagnosis**: Read terminal error log; confirmed port 5432 connection failure.
- **Solution**: Started PostgreSQL service via Windows `services.msc` and added a graceful fallback in `settings.py` to use SQLite if `USE_POSTGRES` is set to `False`.
- **Lesson Learned**: Implement fallback configurations for local development environments to prevent blocking execution when external database services are down.

---

### Summary Table of Development Challenges

| # | Challenge | Root Cause | Solution | Lesson Learned |
| :-: | :--- | :--- | :--- | :--- |
| **1** | CORS Policy Block | Missing cross-origin headers on Django | Configured `django-cors-headers` middleware | Setup CORS at project start |
| **2** | Missing Auth Header | Individual fetch calls lacked Bearer header | Centralized Axios request interceptor in `api.js` | Use interceptors for global headers |
| **3** | Auth Route Infinite Loop | Checked `user` state before `localStorage` loaded | Added `loading` state check to `ProtectedRoute` | Account for async auth initialization |
| **4** | Image Upload 400 Error | Sent image as `application/json` payload | Used `FormData` with `multipart/form-data` | Binary files require `FormData` |
| **5** | Custom User Migration Error | Ran initial migration before setting `AUTH_USER_MODEL` | Reset DB and recreated initial migrations | Set custom user model before 1st migration |
| **6** | Abrupt JWT Logouts | Short 5-minute access token expiration | Increased access token lifetime to 24 hours | Adjust token lifetimes to fit app scope |
| **7** | Division by Zero in AI Engine | Unhandled `0 / 0` division on wards without issues | Added guard clause returning default 95% score | Always validate formula denominators |
| **8** | Postgres Connection Failure | Local Postgres service stopped | Added SQLite dev fallback in `settings.py` | Create fallback DB configurations |
| **9** | Unique Constraint Collision | Multiple cleanup drive registrations | Added `unique_together` constraint in DB & ORM | Enforce integrity at database level |
| **10**| Haversine Coordinate Null Error| Unchecked `None` values in lat/lon arguments | Added `if None in (lat1, lon1, lat2, lon2): return None` | Guard mathematical utility inputs |

---

### Biggest Lessons Learned During Development

1. **Decoupled Architecture Power**: Separating React frontend from Django backend provided immense clarity, enabling independent development, fast frontend hot-reloading, and clean API contract definitions.
2. **Stateless JWT Security**: Stateless authentication eliminated backend session management complexity while securing role-based routes cleanly.
3. **Data-Driven AI Value**: Building pragmatic, rule-based algorithms (Haversine duplicate detection, worker load balancing, ward cleanliness scoring) added massive real-world value without overhead.
4. **Resilient Defensive Coding**: Adding fallback handlers (e.g., LocalStorage persistent state fallback, SQLite fallback) ensured the system remains presentation-ready and resilient under all test scenarios.
