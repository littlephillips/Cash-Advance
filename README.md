# 💰 Cash Advance — Microfinance Loan Management System

A web-based loan management system built for microfinance operations. It automates the full loan lifecycle — from application and approval to disbursement and repayment — across multiple user roles.

🌐 **Live Demo:** [https://cash-advance-72.web.app](https://cash-advance-72.web.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Loan Product Parameters](#loan-product-parameters)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Demo Credentials](#demo-credentials)
- [Pages](#pages)

---

## Overview

Cash Advance is a role-based microfinance management system that allows different types of users to interact with the loan pipeline in real time. Field credit officers capture client data, supervisors approve or reject loans, and office staff handle disbursements and receipts — all from a single responsive web application.

---

## Features

- 🔐 **Role-based authentication** — JWT-secured login with automatic routing by user type
- 📋 **Loan application** — Customers apply with full bio data and business details
- 📍 **Interactive map** — Business location pinned via OpenStreetMap (no API key required)
- 📊 **Live loan calculations** — Interest, processing fee, and total repayable computed automatically
- ✅ **Loan approval workflow** — Supervisor approves or rejects pending loans
- 💸 **Loan disbursement** — Office staff disburse approved loans with one click
- 🧾 **Receipt issuance** — Generate and view payment receipts per customer
- 📄 **Customer statements** — Full loan summary with payment history and outstanding balance
- ⚠️ **Unallocated receipts** — Payments that can't be matched to a customer are flagged and stored separately for manual allocation
- 📈 **Dashboard** — Real-time metrics: total loans disbursed, total amount paid, active customers, defaulted loans
- 📱 **Responsive design** — Works on mobile, tablet, and desktop

---

## User Roles

### 🧑‍💼 Loan Applicant (Customer)
- Register and log in
- Submit a loan application with personal and business details
- Pin business location on a map
- Make loan repayments

### 🚗 Field Credit Officer
- Register and log in
- View existing loan applicant details
- Collect and submit client bio data
- Create a loan for a customer

### 👔 Supervisor
- Register and log in
- View all loan requests
- Approve or reject pending loans

### 🏢 Office & Administration Staff
- Register and log in
- View dashboard metrics
- Disburse approved loans
- View and issue receipts
- View customer statements
- Manage unallocated receipts

---

## Loan Product Parameters

| Parameter | Value |
|---|---|
| Minimum Loan Amount | KES 7,000 |
| Loan Tenure | 2 months |
| Interest Rate | 3% per month |
| Processing Fee | KES 300 (deducted upfront) |
| Late Payment Penalty | 5% of outstanding balance |

All parameters are enforced automatically — credit officers cannot override them.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Bootstrap |
| Routing | React Router v6 |
| Authentication | JWT Decode |
| Database | Firebase Firestore |
| Hosting | Firebase Hosting |
| Maps | React Leaflet + OpenStreetMap |
| Responsive | react-responsive |

---

## Getting Started

### Prerequisites
- Node.js v16+
- npm
- A Firebase project with Firestore and Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/littlephillips/Cash-Advance

# Navigate into the project
cd Cash-Advance

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root with your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Running Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Deploying to Firebase

```bash
firebase login
firebase init
firebase deploy
```

---

## Project Structure

```
src/
├── components/
│   ├── AppComponent/        # App entry and routing
│   ├── LocationPicker/      # Interactive map component
│   ├── NavbarComponent/     # Header/navigation
│   └── withAuth/            # Role-based route protection HOC
├── pages/
│   ├── AdministrationPage/  # Receipt issuance
│   ├── ClientPage/          # Loan application & repayment
│   ├── CreditOfficePage/    # Loan creation & client data
│   ├── HomePage/            # Landing page
│   ├── OfficePage/          # Dashboard, statements, disbursement
│   ├── RegistrationPage/    # Login & signup
│   ├── SupervisorPage/      # Loan approval
│   ├── ErrorPage/           # 404 page
│   └── UnauthorizedPage/    # Access denied page
├── services/
│   └── firestoreService.js  # All Firestore database operations
├── styles/                  # Global CSS
└── firebase.js              # Firebase configuration
```

---

## Demo Credentials

> These accounts are pre-seeded for testing purposes.

### Loan Applicants

| Name | Email | Password |
|---|---|---|
| John Doe | johndoe@gmail.com | 12345 |
| Mary Doe | marydoe23@gmail.com | mary |

### Field Credit Officer

| Name | Email | Password |
|---|---|---|
| Mary James | james10@outlook.com | james10 |

### Supervisor

| Name | Email | Password |
|---|---|---|
| Juliet Masons | masons23@gmail.com | masons23 |

### Office & Administration Staff

| Name | Email | Password |
|---|---|---|
| James Moore | moore56@gmail.com | morre@ |
| artificial intelligence | littleartificial010@gmail.com | 123456 |

---

## Pages

| Page | Description |
|---|---|
| Landing Page | Welcome screen with login entry point |
| Login | Email, password and role-based sign in |
| Signup | New user registration with role selection |
| Client Dashboard | Apply for loan or make repayment |
| Credit Officer Portal | View applicants, collect data, create loans |
| Supervisor Portal | Approve or reject pending loans |
| Office Portal | Dashboard, disbursement, statements, receipts |
| Unauthorized | Shown when a user accesses a restricted page |
| Error (404) | Shown for unknown routes |

---

## License

This project was developed as part of a microfinance system assessment.