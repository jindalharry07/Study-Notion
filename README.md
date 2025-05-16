
# 📘 Study Notion – Full Stack Learning Platform
**Study Notion** is an online learning platform where instructors can create and manage courses, and students can enroll and learn. Built with Node.js, Express, MongoDB, Mongoose, and EJS, it features user authentication, role-based access, and a dynamic course system for a smooth learning experience.

## ✅ Features

### 👨‍🎓 Students
- Register/login securely.
- Browse and search available courses.
- Enroll in courses and track progress.
- View completed modules and download certificates.

### 👩‍🏫 Instructors
- Create and manage courses.
- Upload videos and organize them into modules.
- View enrolled students and their progress.

### 🔒 Admin
- Manage users (students/instructors).
- View platform statistics and generate reports.
- Handle flagged content or user feedback.

### 📬 Other Features
- JWT-based secure authentication and authorization.
- Responsive UI with Tailwind CSS.
- Notifications for enrollment, course progress, and completion.
- Feedback and support system.

---

## 📁 Folder Structure

study-notion/
├── client/                             # Frontend (React + Tailwind CSS)
│   ├── public/
│   └── src/
│       ├── assets/                     # Static images and logos
│       ├── components/                 # Reusable React components
│       ├── pages/                      # Route-based page components
│       ├── services/                   # API call functions
│       ├── context/                    # Global state and auth context
│       ├── utils/                      # Utility functions (e.g., token handling)
│       ├── App.js
│       └── main.jsx

├── server/                             # Backend (Express + MongoDB)
│   ├── config/                         # DB connection and environment config
│   ├── controllers/                    # Logic for routes
│   │   ├── contentController.js
│   │   ├── instructorController.js
│   │   ├── learner.controller.js
│   │   ├── learnerController.js
│   │   ├── pdfController.js
│   │   └── quiz.controller.js
│   ├── models/                         # Mongoose schemas
│   ├── routes/                         # Route definitions
│   │   ├── index.js
│   │   ├── instructor.js
│   │   ├── learner.js
│   │   ├── learner.routes.js
│   │   ├── pdfRoutes.js
│   │   ├── quiz.routes.js
│   │   └── users.js
│   ├── uploads/                        # File uploads (PDFs, media)
│   ├── views/                          # EJS templates
│   │   ├── instructor/
│   │   │   ├── contentList.ejs
│   │   │   ├── dashboard.ejs
│   │   │   ├── instructor-content.ejs
│   │   │   ├── viewContent.ejs
│   │   └── learner/
│   │       ├── learner-dashboard.ejs
│   │       ├── login.ejs
│   │       ├── quiz-details.ejs
│   │       ├── quizzes.ejs
│   │       ├── result.ejs
│   │       ├── signup.ejs
│   ├── views/pdf/
│   │   ├── choose.ejs
│   │   └── welcome.ejs
│   ├── app.js                          # Server entry point
│   ├── package.json
│   ├── package-lock.json
│   └── README.md



---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, JWT, bcrypt, Multer
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Cloudinary / Multer
- **Version Control**: Git & GitHub

---

## 🛠️ Installation & Run Locally

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)
- Git

### Clone the Repository

```bash
git clone https://github.com/jindalharry07/Study-Notion.git
cd study-notion


cd myapp
npm install
touch .env
# Add your MongoDB URI, JWT secret, Cloudinary config
npm start
npm install
npm run dev

PORT=3000
MONGODB_URI=your_mongodb_uri
