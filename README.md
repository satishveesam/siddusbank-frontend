# 🏦 SiddusBank Frontend

## 📌 Project Overview

SiddusBank Frontend is a **modern, responsive banking application** built with **React.js** that provides a seamless user experience for managing bank accounts, transactions, and personal information. It integrates with the SiddusBank Backend API to deliver secure and real-time banking operations.

---

## 🌐 Live Demo

| Service              | URL                                                  |
| -------------------- | ---------------------------------------------------- |
| 🚀 Live App          | https://siddusbank-frontend.vercel.app               |
| 🔗 Backend API       | https://siddusbank-backend-production.up.railway.app |
| 💻 GitHub Repository | https://github.com/satishveesam/siddusbank-frontend  |

---

## 🚀 Features

### 🔐 Authentication

* User registration with validation
* Secure login using JWT authentication
* Protected routes with automatic redirect
* Persistent login using localStorage

### 👤 Profile Management

* View and update personal details
* Change password with validation
* Profile completion tracking
* Member since tracking

### 💰 Account Management

* Create Savings & Checking accounts
* View accounts in card layout
* Real-time INR balance display (₹)
* Delete account (only if zero balance)
* Account status indicators

### 🔄 Transaction Management

* Deposit, Withdraw, Transfer funds
* Transaction history with timestamps
* Color-coded transaction UI
* Transaction status indicators

### 📊 Dashboard

* Total balance summary
* Account statistics
* Interactive charts (Chart.js)
* Quick actions
* Notifications & recent activity

### 🎨 UI/UX Design

* Fully responsive (Mobile, Tablet, Desktop)
* Smooth animations & transitions
* Toast notifications
* Loading & error handling
* Clean modern UI with gradient theme

---

## 🛠️ Technology Stack

| Technology       | Version | Purpose            |
| ---------------- | ------- | ------------------ |
| React            | 18.2.0  | Frontend framework |
| React Router DOM | 6.14.0  | Routing            |
| Axios            | 1.4.0   | API calls          |
| React Toastify   | 9.1.3   | Notifications      |
| Chart.js         | 4.3.0   | Data visualization |
| React Icons      | 4.10.1  | Icons              |
| CSS3             | -       | Styling            |

---

## 📁 Project Structure

```bash
banking-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── Auth.css
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.css
│   │   ├── Account/
│   │   │   ├── AccountList.jsx
│   │   │   ├── AccountDetails.jsx
│   │   │   ├── CreateAccount.jsx
│   │   │   ├── TransactionHistory.jsx
│   │   │   └── Account.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   └── Profile/
│   │       ├── Profile.jsx
│   │       └── Profile.css
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── account.service.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── currency.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── .env.production
├── vercel.json
└── README.md
```

---

## ⚙️ Quick Start Guide

### 1️⃣ Visit Live App

https://siddusbank-frontend.vercel.app

### 2️⃣ Register

* Click **Register Now**
* Enter details
* Create account

### 3️⃣ Login

* Enter credentials
* Redirect to dashboard

### 4️⃣ Create Account

* Click **Open Account**
* Choose type
* Add deposit

### 5️⃣ Transactions

* Deposit / Withdraw / Transfer
* Enter amount & confirm

### 6️⃣ Transaction History

* View all transactions with details

### 7️⃣ Update Profile

* Edit details
* Change password

---

## 📱 Responsive Design

| Device  | Screen Width   | Features         |
| ------- | -------------- | ---------------- |
| Mobile  | 320px - 767px  | Collapsed layout |
| Tablet  | 768px - 1199px | Optimized grid   |
| Desktop | 1200px+        | Full layout      |

---

## 🔗 API Integration

```javascript
const API_BASE_URL = 'https://siddusbank-backend-production.up.railway.app/api';
```

### Axios Interceptors

* Adds JWT token automatically
* Handles unauthorized errors

### Currency Utility

```javascript
export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};
```

---

## ⚙️ Local Development Setup

### Prerequisites

* Node.js
* npm

### Installation

```bash
git clone https://github.com/satishveesam/siddusbank-frontend.git
cd siddusbank-frontend
npm install
```

### Environment

```env
REACT_APP_API_URL=http://localhost:3636/api
```

### Run

```bash
npm start
```

---

## 📦 Build

```bash
npm run build
```

---

## 🚀 Deployment

### Vercel

```bash
vercel --prod
```

### Netlify

```bash
netlify deploy --prod --dir=build
```

---

## 📊 Performance Metrics

* First Contentful Paint: **1.2s**
* Lighthouse Score: **95+**
* Optimized bundle size (~250KB)

---

## 🏆 Key Achievements (ATS Boost)

* Built responsive banking UI using React.js
* Implemented secure JWT authentication flow
* Integrated real-time API communication
* Achieved high performance (95+ Lighthouse score)
* Designed scalable component-based architecture

---

## 💡 ATS Keywords

React.js, Frontend Development, REST API Integration, JWT Authentication, Responsive Design, UI/UX, Axios, JavaScript, HTML, CSS, Chart.js

---

## 👨‍💻 Author

**Satish Veesam**
Java Full Stack Developer

* GitHub: https://github.com/satishveesam
* LinkedIn: https://linkedin.com/in/satishveesam
* Portfolio: https://satishveesam.github.io

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
