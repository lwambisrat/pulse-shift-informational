# Deployment Guide for Greens Mtaani

## Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

---

### 2. Install Dependencies

#### Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Frontend (React)
```bash
cd ../frontend
npm install
```

---

### 3. Environment Variables

**Backend**:  
- Copy `.env.example` to `.env` and update with your database, secret key, and API credentials.

**Frontend**:  
- Copy `.env.example` to `.env` and update with the correct API base URL and other settings.

---

### 4. Database Setup

**Backend**:
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser  
```

---

### 5. Running the Application

#### Backend (Django API)
```bash
cd backend
python manage.py runserver
```
The API should be available at `http://localhost:8000/`.

#### Frontend (React)
```bash
cd frontend
npm start
```
The app will be available at `http://localhost:3000/`.

---