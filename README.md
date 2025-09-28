✍️ Blogsy - A Modern Full-Stack Blogging Platform
Blogsy is a complete, feature-rich blogging platform built with the MERN stack. It provides a secure admin dashboard for content management and an interactive, theme-aware frontend for readers. Users can register, comment, like posts, and view their activity in a personal profile section.

🌐 Live Demo
🔗 Frontend: [Link to your deployed frontend]

🔗 Backend: [Link to your deployed backend]

✨ Key Features
👤 Admin Dashboard  

Create, edit, and delete blog posts with a rich text editor.

Publish or unpublish blogs with a single click.

View and manage all user comments.

Dashboard with site statistics (total blogs, comments, likes, etc.).

👥 User Authentication & Profiles  

Secure registration and a unified login system for users and admins.

JWT-protected routes for all user and admin actions.

A dedicated profile section for users to view their liked blogs and comments.

🚀 Interactive User Experience  

Like and unlike blog posts.

Post comments on articles.

Fully responsive design for desktop, tablet, and mobile.

A sleek dark/light theme toggle that saves user preference.

🤖 AI-Powered Content Generation

Integrated with Google's Gemini API to generate blog content from a title.

🛠️ Tech Stack
Frontend
React.js + Vite

React Router (Routing)

Tailwind CSS (Styling)

Axios (HTTP Client)

React Icons (UI Icons)

Quill.js (Rich Text Editor)

Backend
Node.js + Express

MongoDB (Database)

Mongoose (ODM)

JWT (jsonwebtoken) (Authentication)

Bcrypt (Password Hashing)

ImageKit (Cloud Image Hosting & Optimization)

Google Gemini API (AI Content)

Deployment
Render / Vercel (Hosting)

MongoDB Atlas (Cloud Database)

🚀 Installation Guide
Prerequisites
Node.js (v18+)

MongoDB URI (from Atlas or local)

ImageKit API Credentials

Google Gemini API Key

Setup Instructions
Bash

# Clone the repository
git clone https://github.com/your-username/blogsy.git
cd blogsy
Backend Setup
Bash

cd server
npm install
# Create a .env file and add your variables (see .env.example)
# (MONGODB_URI, JWT_SECRET, IMAGEKIT_PUBLIC_KEY, etc.)
npm start
Frontend Setup (in a new terminal)
Bash

cd client
npm install
# Create a .env file and add VITE_BASE_URL
npm run dev
