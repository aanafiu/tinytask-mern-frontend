# 🧠 TinyTask Frontend

Frontend for the **TinyTask** MERN Stack Project — a role-based question-solving platform with unique interfaces for **Admin**, **Seller**, and **Player** users.

🔗 **Live Website:** [https://tinytask-mern.web.app](https://tinytask-mern.web.app)  
🔌 **Backend API:** [https://tinytask-backend.vercel.app](https://tinytask-backend.vercel.app)
🔌 **Backend Repo:** [https://github.com/aanafiu/tinytask-mern-backend](https://github.com/aanafiu/tinytask-mern-backend)

---

## 📸 UI Preview Screenshots

### 🏠 Home Page
![Home Page](./public/screenshots/Homepage.png)
![Task Page](./public/screenshots/Home-Taskpage.png)
![Package Page](./public/screenshots/Home-%20PAckagepage.png)

### 👑 Admin Dashboard
![Admin Login](./public/screenshots/ADMIN-PAGE.png)
![Admin Dashboard](./public/screenshots/Admin-Dashboard.png)
![All Question Page](./public/screenshots/Admin-Dashboard-AllQuestion.png)
![Seller Requested Question](./public/screenshots/Admin-SellerQuestion-Request.png)

### 🛍️ Seller Dashboard
![Seller Dashboard Question Add](./public/screenshots/Seller-Dashboard-QuestionAdd.png)
![Seller Dashboard Question History](./public/screenshots/Seller-Dashboard-Question-History.png)
![Seller Dashboard Package Payment History](./public/screenshots/Seller-Dashboard-Package-Payment-History.png)
### Seller Package Wise Profile
![Regular Profile](./public/screenshots/Seller-Regular-Profile.png)
![Premium Profile](./public/screenshots/Seller-Premium-Profile.png)
![Elite Profile](./public/screenshots/Seller-Elite-Profile.png)

### 🎮 Player Dashboard
![Player Dashboard](./public/screenshots/Player-Dashboard-1.png)
![Player Dashboard](./public/screenshots/Player-Dashboard-2.png)
![Player Task Modal](./public/screenshots/Player-Task-Modal.png)
![Player Task Modal](./public/screenshots/Player-Task-Route.png)

### Custom SweetAlert, MongoDB, SSLCommerz, Login, Register
![Login](./public/screenshots/Login.png)
![Register](./public/screenshots/Register.png)
![Custom Sweet Alert](./public/screenshots/Custom-Sweet-alert.png)
![Mongodb](./public/screenshots/MongoDB%20Database.png)
![SSL Commerz Payment](./public/screenshots/ssl%20Commerze%20Demo.png)
![SSL OTP](./public/screenshots/ssl%20Commerze%20Demo%20Otp.png)


---

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
├── Components/            # Reusable components
│   ├── Admin/             # Admin interface components
│   ├── AuthProvider/      # Firebase auth provider
│   ├── Footer/
│   ├── Hero/
│   ├── Loading/
│   ├── Nav/
│   ├── Packages/
│   ├── Profiles/          # Role-based profiles (Admin, Player, Seller)
│   ├── ScrollToTop/
│   ├── TaskSection/
│   ├── ToggleProfile.jsx  # Role switcher
│   └── User/              # User-based logic
├── Hooks/                 # Custom React hooks
├── Layouts/               # Shared layout wrappers
├── Router/                # App route definitions
├── index.css
├── main.jsx
```

---

## 🚀 Features

- 🔐 **Role-Based Dashboards**: Admin, Seller, Player
- 💬 **Firebase Authentication**: Login, Register, Role Management
- 📤 **Task & Question System**: Solve and submit categorized questions
- 💳 **Payment Integration**: SSLCommerz for Seller Packages
- 💰 **Coin System**: Earn and spend coins based on activities
- ⚙️ **Dynamic Routing** with protected routes

---

## 🔧 Tech Stack

- **React + Vite**
- **Tailwind CSS**
- **Firebase Auth**
- **React Router DOM**
- **Axios** for API calls

---

## 📦 Installation

```bash
git clone https://github.com/your-repo/tinytask-frontend.git
cd tinytask-frontend
npm install
npm run dev
```
---

## 🧪 Demo Test Accounts

| Role   | Email     | Password    |
|--------|-----------|-------------|
| Admin  | `admin`   | `admin`     |
| Seller | `c@v.com` | `123456`    |
| Player | `c@vcom`  | `123456`    |

---

## 📡 API Reference

Refer to the [Backend API Documentation](https://github.com/aanafiu/tinytask-mern-backend) for full endpoint usage.
