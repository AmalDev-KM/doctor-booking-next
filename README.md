# 🩺 Doctor Appointment Booking System

A full-stack appointment booking platform built with **Next.js**, **MongoDB**, and **TypeScript**, designed with scalable backend architecture and CI/CD practices.

This project demonstrates production-style structuring with layered backend design, authentication, middleware protection, and automated build validation using GitHub Actions.

---

## 🚀 Tech Stack

### Frontend & Backend

* Next.js (App Router)
* TypeScript
* TailwindCSS

### Backend Architecture

* MongoDB + Mongoose
* JWT Authentication (HttpOnly Cookies)
* Joi Validation
* Layered Architecture:

  * Routes
  * Controllers
  * Services
  * Validations
  * Middleware
  * Types

### DevOps

* GitHub Actions CI Pipeline
* ESLint
* Type Checking
* Production Build Verification

---

## 🧱 Project Structure

```
src/
│
├── app/api/                # API Routes
│
├── controllers/            # Request handling logic
├── services/               # Business logic
├── validations/            # Joi schemas
├── middlewares/            # Auth & Role guards
├── models/                 # Mongoose models
├── lib/                    # DB connection
├── utils/                  # Helpers & responses
├── types/                  # Shared TypeScript types
```

---

## ✨ Features Implemented

* User Registration
* Login with JWT
* HttpOnly Cookie Authentication
* Role-based Authorization Middleware
* Secure Password Storage (bcrypt)
* Structured API Responses
* MongoDB Connection Caching
* CI Pipeline Build Validation

---

## 🔐 Authentication Flow

1. User logs in
2. Server validates credentials
3. JWT issued
4. Token stored as **HttpOnly cookie**
5. Middleware verifies token for protected routes

---

## 🛠️ Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd doctor-booking
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Create `.env.local`

```
MONGODB_URI=mongodb://127.0.0.1:27017/doctor_booking
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

---

## 🏗️ Build Project

```bash
npm run build
```

---

## ✅ CI Pipeline

A GitHub Actions pipeline automatically runs on push:

* Dependency install
* Lint check
* Type check
* Next.js production build

Located at:

```
.github/workflows/ci.yml
```

---

## 🔒 Middleware Protection

### Require Login

```ts
withAuth(req, handler)
```

### Require Role

```ts
withRole(req, ["admin"], handler)
```

---

## 📌 Future Enhancements

* Doctor Profile Module
* Appointment Scheduling Engine
* Availability Slot System
* Email Notifications
* Payment Integration
* Admin Dashboard
* Refresh Token System
* Integration Tests
* Docker Deployment

---

## 👨‍💻 Author

**AmalDev K M**

Tech enthusiast passionate about building scalable full-stack systems and exploring AI engineering.

---

## 📜 License

This project is for learning and portfolio demonstration.
