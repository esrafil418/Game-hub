# Game Hub - Full Stack E-Commerce Platform

![Game Hub Banner](/src/assets/games.png)

## 🔗 Repository Links

### Main Project
- **Frontend Repository**: [https://github.com/esrafil418/game-hub](https://github.com/esrafil418/game-hub)

### Backend
- **Backend Repository**: [https://github.com/esrafil418/game-hub_backend](https://github.com/esrafil418/game-hub_backend)

### Admin Panel
- **Admin Panel Repository**: [https://github.com/esrafil418/game-hub_admin-panel](https://github.com/esrafil418/game-hub_admin-panel)

---

## 📖 Overview

**Game Hub** is a full-stack e-commerce platform for purchasing video games. It features a modern React frontend with a robust Node.js/Express backend, offering a seamless shopping experience with user authentication, cart management, and order processing.

### ✨ Key Features

- 🛒 **Shopping Cart** - Add/remove items with real-time updates
- 🔐 **User Authentication** - Secure login/registration with JWT
- 🎮 **Game Catalog** - Browse games with category filtering
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 💳 **Order Management** - Place orders and view order history
- 🖼️ **Admin Panel** - Add and manage game listings
- 🔄 **Persistent Cart** - Cart data syncs across devices

---

![Admin Panel](/src/assets/admin%20panel.png)

---

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Library |
| **TypeScript** | Type Safety |
| **Tailwind CSS 4** | Styling |
| **React Router DOM 7** | Routing |
| **Axios** | HTTP Client |
| **Lucide React** | Icons |
| **Vite** | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express 5** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Bcrypt** | Password Hashing |
| **Multer** | File Upload |
| **Stripe** | Payment Processing |

---

![Home Page](/src/assets/home-page.png)

---

## 🔐 User Authentication System

The application implements a secure authentication system using **JWT (JSON Web Tokens)** and **Bcrypt** for password security with MongoDB as the user data store.

![User Authentication](/src/assets/users-mongodb.png)

---

## 🛠️ Installation & Setup

### Prerequisites:

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/esrafil418/game-hub.git
cd game-hub
```

---

## Environment Variables:

- PORT=4000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
- STRIPE_SECRET_KEY=your_stripe_secret_key

---

![Shopping Cart](/src/assets/mobile-cart-min.png)

---

![Mobile Page](/src/assets/mobile-header.png)

---

![Sign Up](/src/assets/signup.png)

---

![Admin Panel](/src/assets/admin%20panel%20list.png)

---

![MongoDB](/src/assets/games-mongodb.png)
