# Student Management System

A comprehensive student management system built with Node.js, Express, React, and PostgreSQL, fully containerized with Docker.

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

### One-Command Setup

**Start the application:**

```powershell
docker-compose up --build -d
```

### Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:5007
- **Database**: localhost:5432 (school_mgmt/postgres/postgres)

### Default Login Credentials

- **Username**: `admin@school-admin.com`
- **Password**: `3OU4zn3q6Zh9`

---

## Recent Fixes & Improvements

### Problem 1: ~~Fix "Add New Notice" Page~~ RESOLVED

**Issue**: `/app/notices/add` - Description field wasn't being saved when clicking 'Save' button.
**Status**: **FIXED** - Notice creation now works properly with all fields including description.

### Problem 2: ~~Complete CRUD operation in Student management page~~ RESOLVED

**Issue**: `/src/modules/students/students-controller.js` - Missing CRUD operations for student management.
**Status**: **COMPLETED** - All CRUD operations implemented:

#### Implemented Features:

**Backend CRUD Operations:**

- **CREATE**: Add new students with profile information
- **READ**: Get all students with filtering capabilities
- **UPDATE**: Update student information
- **DELETE**: Delete student records
- **STATUS**: Activate/deactivate student accounts
