# 🌿 PlantCure – Smart Plant Disease Diagnosis System
An intelligent and user‑friendly platform designed to help farmers, gardeners, and agriculture enthusiasts quickly identify plant diseases using symptom‑based diagnosis.

---
## 🚀 Demo
🔗 **Live Demo:** https://plant-cure.vercel.app/

---
## 🚀 Overview
**PlantCure** simplifies plant health monitoring by allowing users to select visible symptoms and instantly receive accurate disease predictions. Built with a clean and responsive interface, it empowers farmers to protect their crops early and reduce losses. PlantCure is more than a tool — it's support for the people who feed the world.

---

## 🌟 Key Features
- 🌱 **Smart Disease Diagnosis** – Identify plant diseases through symptom matching.
- 🌍 **Language Selection Feature** – Users can switch between multiple languages for easier understanding and accessibility.
- 📚 **Disease Library** – View detailed disease information, symptoms, treatment & prevention.
- 📤 **Image Upload Support** – Add disease entries with images (admin feature).
- ⚙️ **Robust Backend API** – Built with Express JS and MongoDB using MVC architecture.
- 🎨 **Modern Frontend UI** – React + Tailwind CSS for a clean and smooth user experience.
- 🔄 **Seamless Deployment** – Frontend on Vercel, backend on Render.

---

## 🛠️ Tech Stack
### **Frontend**
- React JS
- Tailwind CSS
- Vite

### **Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (image handling)
- dotenv & CORS

---

## 📁 Project Structure (Backend)
```
backend/
│── controllers/
│── models/
│── routes/
│── config/
│── uploads/
└── server.js
```

---

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/PlantCure.git
cd PlantCure
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongo_uri
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Start backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

Start frontend:
```bash
npm run dev
```

---

## 🌐 Deployment
### **Backend (Render)**
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables:
  - `MONGODB_URI`
  - `FRONTEND_URL`

### **Frontend (Vercel)**
- Add env variable: `VITE_API_URL`
- Build command: `npm run build`

---

## 🔗 API Endpoints
### **Disease Routes**
```
GET  /api/disease/all
GET  /api/disease/:id
POST /api/disease/add
GET  /api/disease/search?q=
```

### **Diagnosis Route**
```
POST /api/diagnosis/check
```

---


## 👩‍💻 Author
**Nirjala Pagare**
- GitHub: https://github.com/Nirjala-pagare

