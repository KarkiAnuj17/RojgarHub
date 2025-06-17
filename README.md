# RojgarHub

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Phases & Progress](#project-phases--progress)
- [Getting Started](#getting-started)
- [Contact](#contact)

## About

RojgarHub is a MERN stack job portal inspired by leading platforms such as LinkedIn, Indeed, and Naukri.com. Our mission is to bridge the gap between job seekers and employers by providing a seamless platform for posting and applying to job opportunities. RojgarHub empowers candidates to find jobs tailored to their skills and interests, while enabling employers to discover the right talent efficiently.

## Features

### Core Features

- **User & Employer Authentication:** Secure registration and login for both job seekers and employers.
- **Company Registration & Verification:** Employers can register their organizations for verification.
- **Job Listing Management:** Verified employers can post and manage job openings.
- **Advanced Job Search:** Job seekers can search and filter jobs by location, role, experience, and more.
- **Job Application Flow:** Candidates can easily apply to jobs and track application status.
- **Application Notifications:** Automated email notifications for application status updates.
- **Profile Management:** Users can build and manage professional profiles, including resumes and skills.
- **Resume Upload & Parsing:** Upload resumes and extract key information automatically.
- **Saved Jobs & Alerts:** Users can bookmark jobs and set up job alerts.
- **Company Profiles:** Employers can create rich profiles to showcase their brand and work culture.
- **Interview Scheduling:** In-app scheduling for interviews and notifications.
- **Admin Dashboard:** Admin panel for managing users, jobs, and reports.

## Technology Stack

RojgarHub is built using the following technologies:

### Frontend

- **Next.js:** React framework for performance, SSR, and SSG.
- **App Router:** Next.js's latest routing paradigm.
- **Shadcn UI:** Modern components built with Radix UI and Tailwind CSS.
- **Formik:** Form state management and validation.
- **Yup:** Schema-based value parsing and validation.
- **Axios:** Promise-based HTTP client for API requests.
- **Redux:** State management for complex workflows.

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Minimalist web framework for Node.js.
- **Mongoose:** MongoDB ODM for schema modeling.
- **bcrypt:** Secure password hashing.
- **jsonwebtoken (JWT):** Token-based authentication.

### Database

- **MongoDB:** NoSQL, Document-oriented Database.

## Project Phases & Progress

The development of RojgarHub is organized into clear phases to ensure a robust and scalable platform.

### Phase 1: Core Authentication, Job Posting & Basic Search (Currently in Progress)

**Goal:** Establish fundamental user and employer authentication, enable company registration, and basic job posting/search functionality.

**Frontend:**
- ✅ User Registration & Login pages.
- ✅ Employer Registration & Login pages.
- ✅ Basic Logout functionality.
- ⬜ Company Profile Creation & Verification Form.
- ✅ Job Posting Interface for Employers.
- ⬜ Job Search & Filter UI for Job Seekers.

**Backend:**
- ✅ User Registration Endpoint: New users can sign up.
    - Checks for existing emails.
    - Passwords hashed using bcrypt.
- ✅ User Login Endpoint: Authenticates users and generates JWT on success.
- ✅ Employer Registration & Login Endpoints.
- ✅ Get All Users/Employers Endpoint (for admin/testing).
- ⬜ Company Registration & Verification Endpoint.
- ✅ Job Posting Endpoint.
- ⬜ Job Search Endpoint.
- ⬜ Job Application Endpoint.

### Phase 2: Application Management, Notifications & Communication

**Goal:** Enhance the application process, introduce notifications, and enable direct communication.

- ⬜ Email Notifications: Send updates on application status.
- ⬜ Resume Upload & Parsing: Automatic extraction of profile data.
- ⬜ Saved Jobs & Alerts: Bookmark jobs and set up alerts.
- ⬜ Admin Dashboard: Manage users, jobs, and reported issues.

### Phase 3: Advanced Features, Analytics & Personalization

**Goal:** Enrich the platform with advanced features, analytics, and personalized experiences.

- ⬜ Interview Scheduling: Integrated scheduling and reminders.
- ⬜ Profile Recommendations: Personalized job and candidate recommendations.
- ⬜ Company Profiles: Enhanced employer branding.
- ⬜ Analytics Dashboard: Insights for employers and job seekers.

## Getting Started

Follow these steps to get RojgarHub running locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/KarkiAnuj17/RojgarHub.git
cd RojgarHub
```

### 2. Install dependencies

**Frontend:**
```bash
cd frontend
npm install
# or
yarn install
```

**Backend:**
```bash
cd ../backend
npm install
# or
yarn install
```

### 3. Configure environment variables

Copy the example environment files and update them:

**Frontend:**
```bash
cp .env.example .env.local
```

**Backend:**
```bash
cp .env.example .env
```
Edit the files to set database URLs, JWT secrets, etc.

### 4. Start MongoDB

Ensure your MongoDB server is running:
```bash
mongod
```

### 5. Run the backend

```bash
cd backend
npm run dev
# or
yarn dev
```
Default: [http://localhost:8000](http://localhost:8000)

### 6. Run the frontend

Open a new terminal tab/window:
```bash
cd frontend
npm run dev
# or
yarn dev
```
Default: [http://localhost:3000](http://localhost:3000)

### 7. Access RojgarHub

Visit [http://localhost:3000](http://localhost:3000) in your browser.



