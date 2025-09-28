# ✍️ Blogsy - A Modern Full-Stack Blogging Platform  

![MERN Stack](https://img.shields.io/badge/MERN-FullStack-green)  
![JWT Auth](https://img.shields.io/badge/Secure-JWT_Authentication-blue)  
![AI Powered](https://img.shields.io/badge/AI-Google_Gemini-red)  
![Live](https://img.shields.io/badge/Live-Online-brightgreen)  

**Blogsy** is a complete, feature-rich blogging platform built with the **MERN stack**. It provides a secure **Admin Dashboard** for content management and an interactive, theme-aware **Frontend** for readers. Users can register, comment, like posts, and view their activity in a personal profile section.  

---

## 🌐 Live Demo  

- 🔗 **Frontend**: https://blogsy-psi.vercel.app/
- 🔗 **Backend**: https://blogsy-server-eight.vercel.app/  

---

## ✨ Key Features  

### 👤 **Admin Dashboard**  
- Create, edit, and delete blog posts with a **rich text editor**  
- Publish/unpublish blogs with a single click  
- View & manage all user comments  
- Dashboard with site statistics (blogs, comments, likes, etc.)  

### 👥 **User Authentication & Profiles**  
- Secure registration & login for both users and admins  
- **JWT-protected routes** for all actions  
- Dedicated **profile section** for liked blogs & comments  

### 🚀 **Interactive User Experience**  
- Like/unlike blog posts  
- Comment on articles  
- **Responsive design** for desktop, tablet & mobile  
- **Dark/Light theme toggle** with saved user preference  

### 🤖 **AI-Powered Content Generation**  
- Integrated with **Google’s Gemini API** to generate blog content from a title  

---

## 🛠️ Tech Stack  

### **Frontend**  
- React.js + Vite  
- React Router (Routing)  
- Tailwind CSS (Styling)  
- Axios (HTTP Client)  
- React Icons (UI Icons)  
- Quill.js (Rich Text Editor)  

### **Backend**  
- Node.js + Express  
- MongoDB + Mongoose (Database & ODM)  
- JWT (jsonwebtoken) + bcrypt (Authentication & Security)  
- ImageKit (Cloud Image Hosting & Optimization)  
- Google Gemini API (AI-powered blog generation)  

### **Deployment**  
- Render / Vercel (Hosting)  
- MongoDB Atlas (Cloud Database)  

---

## 🚀 Installation Guide  

### **Prerequisites**  
- Node.js (v18+)  
- MongoDB URI (from Atlas or local)  
- ImageKit API credentials  
- Google Gemini API Key  

---

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/excel-graph.git
cd excel-graph
```

# Backend Setup
```
cd server
npm install

# Create a .env file and add your variables:
# MONGODB_URI=
# JWT_SECRET=
# IMAGEKIT_PUBLIC_KEY=
# IMAGEKIT_PRIVATE_KEY=
# GOOGLE_GEMINI_API_KEY=

npm start
```

# Frontend Setup (in new terminal)
```
cd client
npm install

# Create a .env file and add:
# VITE_BASE_URL=http://localhost:5000

npm run dev
```

