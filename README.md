# 🍽️ FoodStream AI

FoodStream AI is an AI-powered food recommendation and ordering platform that delivers personalized meal suggestions using behavioral analytics, user profiles, order history, favorites, and Generative AI.

**Live Demo:** https://food-stream-ai.vercel.app

---

## 🚀 Features

### 🤖 AI-Powered Food Assistant

* Natural language food recommendations
* Personalized suggestions based on user preferences
* Context-aware food ordering
* "Surprise Me" recommendations
* Gemini AI integration

### 👤 Multi-Profile Ordering

* Create multiple profiles under a single account
* Separate food preferences per profile
* Individual ordering experience for family members

### 🎯 Personalized Recommendation Engine

Recommendations are generated using:

* Favorite cuisine
* Spice level preference
* Veg / Non-Veg preference
* Favorite category
* Order history
* Favorite foods
* User behavior analytics

### ❤️ Favorites System

* Save favorite dishes
* Personalized favorites for each profile
* Instant favorite management

### 🛒 Smart Cart System

* Multi-profile cart support
* Quantity management
* Order summary
* Cart grouping by profile

### 📦 Order Management

* Place orders
* Track order status
* View order history
* Admin order management

### 📊 Analytics Dashboard

Admin analytics include:

* Revenue insights
* Top-selling foods
* Order statistics
* Customer activity
* Food performance metrics

### 🔐 Authentication & Authorization

* Firebase Authentication
* Secure login/signup
* Role-based access control
* Admin-only protected routes
* Firestore security rules

### ⚙️ Admin Panel

Administrators can:

* Manage food items
* Manage users
* Promote or remove admins
* Track orders
* Access analytics

---

## 🏗️ Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Zustand

### Backend & Database

* Firebase Authentication
* Cloud Firestore
* Firebase Admin SDK

### AI

* Google Gemini 2.5 Flash

### Deployment

* Vercel

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── admin/
│   ├── analytics/
│   ├── home/
│   ├── login/
│   ├── orders/
│   └── profiles/
│
├── components/
│   ├── admin/
│   ├── chat/
│   ├── home/
│   ├── layout/
│   └── order/
│
├── hooks/
├── services/
├── store/
├── lib/
├── types/
└── utils/
```

---

## ⚡ Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/VANSH-DEVOP/food-stream-ai
cd food-stream-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GEMINI_API_KEY=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

NEXT_PUBLIC_SUPER_ADMIN_UID=
```

---

### 4. Run Development Server

```bash
npm run dev
```

Application:

```bash
http://localhost:3000
```

---

## 🔥 Firebase Setup

### Authentication

Enable:

* Email/Password Authentication

### Firestore Collections

Create:

```text
foods
profiles
favorites
orders
payments
users
```

### Firestore Rules

Deploy the included:

```bash
firestore.rules
```

and

```bash
firestore.indexes.json
```

---

## 👑 Super Admin Setup

1. Create your Firebase account.
2. Copy your Firebase Authentication UID.
3. Add it to:

```env
NEXT_PUBLIC_SUPER_ADMIN_UID=<your_uid>
```

4. Redeploy the application.

The configured user becomes the Super Admin and can manage other administrators.

---

## 🚀 Deployment

The project is deployed on Vercel.

To deploy your own version:

```bash
npm run build
```

Push to GitHub and import the repository into Vercel.

Configure all environment variables before deployment.

---

## 🎯 Future Enhancements

* Forgot Password Flow
* Payment Gateway Integration
* AI Recommendation Engine V2
* AI Food Explanation Engine
* AI Customer Support Chatbot
* Real-Time Order Tracking
* Email Notifications
* Push Notifications
* Advanced Analytics Dashboard

---

## 👨‍💻 Author

Vansh Bansal

FoodStream AI was built as a portfolio-scale AI-powered food recommendation platform demonstrating full-stack development, Firebase integration, state management, analytics, authentication, and Generative AI capabilities.
