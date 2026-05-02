# 🎓 Kissa LMS - Learning Management System

# 📌 Project Overview

Kissa LMS ek complete Learning Management System hai jo MERN stack (MongoDB, Express.js, React.js, Node.js) mein develop kiya gaya hai.

# Key Features
- JWT Authentication with Role-Based Access
- Three User Roles: Admin, Instructor, Student
- Complete Course Management
- Lesson Management System
- Progress Tracking for Students
- Profile Management
- Fully Responsive Design



# 🛠️ Technologies Used

Frontend: React.js, React Router, Bootstrap, Axios, React Icons
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt


# 👥 User Roles

| Role | Permissions |
| Admin | View/Delete users, Manage all courses, View analytics |
| Instructor | Create/Edit/Delete courses, Add lessons |
| Student | Browse/Enroll courses, Track progress, Profile |


# 🚀 Installation Steps

bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start

# Frontend: http://localhost:3000
🔑 Test Credentials
Role	      Email	                Password
👑 Admin	  admin@lms.com      	admin123
👨‍🏫 Instructor	instructor@lms.com	instructor123
🎓 Student	     student@lms.com	student123
Note: You can also register as a new student or instructor from the sign-up page.

# ✅ Features Checklist
User Registration & Login

JWT Authentication

Password Hashing (Bcrypt)

Role-Based Authorization (Admin/Instructor/Student)

Admin Dashboard (Users, Courses, Analytics)

Admin can edit any course

Instructor Dashboard (Create, Edit, Delete Courses)

Instructor can add lessons to courses

Student Dashboard (Enrolled Courses, Progress Tracking)

Course Listing with Category Filters

Course Detail Page

Enrollment System

Profile Management (Edit Profile, Change Password)

Responsive Design

Toast Notifications

Protected Routes

RESTful APIs

# 🧪 Testing Report
Maine manually sab features test kiye hain:

Test Case	Expected Result	Status
User Registration	User creates account	✅ Pass
User Login	Redirect to dashboard	✅ Pass
Login with wrong password	Error message	✅ Pass
Logout	Redirect to home	✅ Pass
Student Dashboard	Shows enrolled courses	✅ Pass
Student Browse Courses	Courses list shows	✅ Pass
Student Enroll Course	Enrollment successful	✅ Pass
Student Profile Update	Changes saved	✅ Pass
Instructor Create Course	New course added	✅ Pass
Instructor Edit Course	Changes saved	✅ Pass
Instructor Add Lesson	Lesson added	✅ Pass
Instructor Delete Course	Course removed	✅ Pass
Admin View Users	Users list shows	✅ Pass
Admin Delete User	User removed	✅ Pass
Admin Edit Course	Course updated	✅ Pass
Admin Delete Course	Course removed	✅ Pass
Admin View Analytics	Stats show	✅ Pass
Protected Routes	Unauthorized blocked	✅ Pass
Responsive Design	Mobile works	✅ Pass


# 📡 API Endpoints
1. Authentication
Method	Endpoint	        Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	    Login user
GET	/api/auth/me	        Get current user
PUT	/api/auth/updateprofile	Update profile
PUT	/api/auth/changepassword	Change password
2. Course Management
Method	Endpoint	Description	Access
GET	/api/courses	 Get all courses	Public
GET	/api/courses/:id	Get single course	Public
POST	/api/courses	 Create course	Instructor/Admin
PUT	/api/courses/:id	  Update course	Instructor/Admin
DELETE	/api/courses/:id	 Delete course	Instructor/Admin
POST	/api/courses/:id/lessons	Add lesson	Instructor
3. User Management (Admin Only)
Method	Endpoint	   Description
GET  	/api/users	      Get all users
DELETE	/api/users/:id	Delete user
GET	/api/users/stats	Get platform statistics
4. Enrollment
Method	Endpoint	         Description	Access
POST	/api/enrollments	   Enroll in course	Student
GET	/api/enrollments/my-courses	Get enrolled courses	Student
PUT	/api/enrollments/:id/progress	Update progress	Student

# 📂 Project Structure
text
kissa-lms/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── userController.js
│   │   └── enrollmentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── userRoutes.js
│   │   └── enrollmentRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env.example
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   └── PrivateRoute.js
        ├── pages/
        │   ├── Home.js
        │   ├── About.js
        │   ├── Courses.js
        │   ├── CourseDetail.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Profile.js
        │   └── dashboard/
        │       ├── StudentDashboard.js
        │       ├── InstructorDashboard.js
        │       └── AdminDashboard.js
        ├── context/
        │   └── AuthContext.js
        ├── services/
        │   └── api.js
        ├── App.js
        └── index.js

 # 📸 Screenshots
![backend running](screenshots/Backend%20running.png)
![frontend running](screenshots/Frontend%20running.png)
![Home Page](screenshots/home.png)
![Home Page](screenshots/home2.png)
![About Page](screenshots/about.png)
![About Page](screenshots/about2.png)
![About Page](screenshots/about3.png)
![Courses Page](screenshots/courses.png)
![Courses Page](screenshots/courses2.png)
![Courses Page](screenshots/courses3.png)
![Course Detail](screenshots/coursesdetail.png)
![Course Detail](screenshots/coursesdetail2.png)
![Register Page](screenshots/register.png)
![Register Page](screenshots/register2.png)
![Login Page](screenshots/adminlogin.png)
![Admin Dashboard Users](screenshots/admindashboard.png)
![Admin Dashboard Users](screenshots/admindashboard2.png)
![Admin Dashboard Users](screenshots/Create%20course.png)
![Login Page](screenshots/instructorlogin.png)
![Instructor Dashboard](screenshots/instructordashboard.png)
![Instructor Dashboard](screenshots/instructordashboard2.png)
![Login Page](screenshots/studentlogin.png)
![Student Dashboard](screenshots/studentdashboard.png)
![Student Dashboard](screenshots/studentdashboard2.png)
![Profile Page](screenshots/profile.png)
![Profile Page](screenshots/profile2.png)

# 🐛 Issues Faced & Solutions
Issue	                                Solution
Course instructor name not showing	    Added populate in backend and fallback in frontend
Admin could not edit courses	       Added edit button and modal in admin dashboard
Register form had admin role option	    Removed admin option from register form and added backend validation
UI cards different sizes	             Used flexbox and min-height for uniform cards


# 📜 Student Declaration
I hereby declare that this project is my original work and has not been copied from any unauthorized source. All code, design, and implementation are my own.

Student Name: Hijab Zahra
Signature: HZ
Date: May 2, 2026