# SAFAI — Swachhata Abhiyan Digital Platform

> **"A click towards cleanliness."**

SAFAI is a modern, dark-themed civic-tech digital platform that enables citizens to report urban cleanliness issues, participate in community cleanup drives, track issue resolution in real-time, inspect public sanitation statistics, and earn reward points for contributing to a cleaner city.

---

## 👥 Student Team Members

- **Prayash Ranjan Dash** — *Role: Frontend Developer*
  - React.js frontend architecture, UI components, responsive layout, dark theme design, forms, routing, and frontend REST API integration.
- **Gyana Ranjan Kar** — *Role: Backend Developer*
  - Django REST Framework backend, JWT authentication, RESTful endpoints, business logic for complaints, drives, vehicles, and rewards.
- **Isha Yadav** — *Role: Database, Integration & Project Support*
  - PostgreSQL database design, Django ORM model relationships, backend-frontend API integration, testing, documentation, and project coordination.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router 6, Axios, Tailwind CSS, Lucide React Icons
- **Backend**: Python 3.10+, Django 4.2, Django REST Framework (DRF), SimpleJWT, django-cors-headers, Pillow
- **Database**: PostgreSQL / Django ORM
- **Architecture**: Decoupled Single Page Application (SPA) communicating via RESTful JSON APIs.

```
React Frontend (Vite)  ──[Axios REST API]──>  Django REST Framework  ──[Django ORM]──>  PostgreSQL Database
```

---

## 📁 Project Structure

```
safai-project/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/             # Django settings, urls, wsgi, asgi
│   ├── accounts/           # User model & JWT authentication APIs
│   ├── complaints/         # Complaint management & status tracking
│   ├── cleanup_drives/     # Community cleanup drive registrations
│   ├── waste_management/  # Vehicle fleet tracking & ward management
│   ├── analytics/          # Public stats, ward scores & hotspot analytics
│   └── rewards/            # Citizen reward points & community leaderboard
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── components/     # Reusable dark theme UI components
│       ├── context/        # AuthContext state management
│       ├── services/       # Axios API services
│       └── pages/          # 14 complete application pages
└── README.md
```

---

## 🗄️ PostgreSQL Setup

1. Install PostgreSQL on your system.
2. Create a new database:
   ```sql
   CREATE DATABASE safai_db;
   CREATE USER postgres WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE safai_db TO postgres;
   ```

---

## ⚙️ Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   - **Windows**:
     ```cmd
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables by creating `.env` from `.env.example`:
   ```env
   SECRET_KEY=django-insecure-safai-super-secret-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   USE_POSTGRES=True
   DB_NAME=safai_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```
5. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Run the Django development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be running at `http://localhost:8000/`.

---

## 💻 Frontend Setup (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`.

---

## 📡 Key API Endpoints

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register/` | Register new user account |
| **Auth** | `POST` | `/api/auth/login/` | Obtain JWT access & refresh tokens |
| **Auth** | `GET` | `/api/auth/profile/` | Fetch current user profile |
| **Complaints**| `GET/POST` | `/api/complaints/` | List or submit cleanliness complaints |
| **Complaints**| `GET/PATCH`| `/api/complaints/<id>/` | View or update complaint status |
| **Complaints**| `POST` | `/api/complaints/<id>/feedback/` | Submit feedback for resolved complaint |
| **Drives** | `GET/POST` | `/api/drives/` | List or create cleanup drives |
| **Drives** | `POST` | `/api/drives/<id>/join/` | Join a community drive |
| **Vehicles** | `GET` | `/api/vehicles/` | View vehicle fleet & GPS routes |
| **Analytics**| `GET` | `/api/analytics/stats/` | Fetch platform public statistics |
| **Analytics**| `GET` | `/api/analytics/hotspots/` | View waste hotspot risk analytics |
| **Rewards** | `GET` | `/api/rewards/leaderboard/` | View community points leaderboard |
