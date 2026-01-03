# E-Learn - Modern Learning Management System (Frontend)

A premium, professional Learning Management System (LMS) built with MERN stack (frontend only). Designed with modern SaaS aesthetics and production-ready architecture.

## 🎯 Features

### Authentication & Authorization
- ✅ User login/signup with role selection
- ✅ Role-based access control (Student & Instructor)
- ✅ Persistent authentication using LocalStorage
- ✅ Protected routes and role-based UI rendering
- ✅ Profile management with image upload preview

### Student Features
- 📚 Browse and search courses with filtering
- 📊 Personal learning dashboard with progress tracking
- 🎯 MCQ-based quizzes for enrolled courses
- 📈 Quiz score display and result tracking
- 💳 Payment simulation with UPI QR code
- 💬 AI-powered chatbot for course doubts

### Instructor Features
- ➕ Create, edit, and delete courses
- 📊 Course engagement analytics
- 👥 Enrolled student count tracking
- 📈 Course completion rate visualization
- 💼 Complete course management dashboard

### General Features
- 🏠 Professional home page with hero section
- ℹ️ About page with mission & vision
- 📱 Fully responsive design
- 💬 AI Chatbot using Google Gemini API
- 🎨 Premium SaaS-quality UI with Tailwind CSS
- ⚡ Fast performance with React + Vite

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx         # Reusable button component
│   │   │   ├── Card.jsx           # Card container
│   │   │   ├── Input.jsx          # Form input field
│   │   │   └── Spinner.jsx        # Loading spinner
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── ProtectedRoute.jsx     # Route protection wrapper
│   │   └── ChatBot.jsx            # AI chatbot interface
│   ├── context/
│   │   └── AuthContext.jsx        # Global auth state management
│   ├── pages/
│   │   ├── Home.jsx               # Home/landing page
│   │   ├── About.jsx              # About page
│   │   ├── Courses.jsx            # Course listing & search
│   │   ├── Login.jsx              # Login page
│   │   ├── Signup.jsx             # Registration page
│   │   ├── Profile.jsx            # User profile management
│   │   ├── StudentDashboard.jsx   # Student dashboard
│   │   ├── InstructorDashboard.jsx # Instructor dashboard
│   │   ├── Quiz.jsx               # Quiz interface
│   │   └── Payment.jsx            # Payment page
│   ├── services/
│   │   ├── authService.js         # Auth API calls (TODO)
│   │   ├── courseService.js       # Course API calls (TODO)
│   │   ├── quizService.js         # Quiz API calls (TODO)
│   │   └── geminiService.js       # Gemini API integration
│   ├── constants/
│   │   └── mockData.js            # Mock data for development
│   ├── App.jsx                    # Main app component with routing
│   ├── index.css                  # Global styles (Tailwind)
│   ├── App.css                    # App-specific styles
│   └── main.jsx                   # React DOM entry point
├── .env.example                   # Environment variables template
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.js                 # Vite configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Google Gemini API key (free from https://ai.google.dev/)

### Installation

1. **Clone the repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
npm run preview
```

## 🔐 Demo Credentials

**Student Account:**
- Email: `student@example.com`
- Password: `password123`
- Role: Student

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password123`
- Role: Instructor

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/courses` - Course catalog
- `/login` - Login page
- `/signup` - Registration page

### Protected Routes (Authentication Required)
- `/profile` - User profile management
- `/student-dashboard` - Student learning dashboard (Students only)
- `/instructor-dashboard` - Course management dashboard (Instructors only)
- `/quiz/:courseId` - Quiz interface (Students only)
- `/payment/:courseId` - Payment page (Students only)

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM 6** - Client-side routing

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing

### State Management
- **Context API** - Global state (Auth)
- **LocalStorage** - Data persistence

### API Integration
- **Google Gemini API** - AI chatbot
- **Fetch API** - HTTP requests (Ready for backend integration)

## 🔌 Backend Integration Ready

All API calls are abstracted in the `services/` folder:

```javascript
// Example: courseService.js
export async function fetchCourses() {
  // Currently returns mock data
  // TODO: Replace with actual API endpoint
  // const response = await fetch(`${API_URL}/courses`);
  // return await response.json();
}
```

### To integrate with backend:

1. **Update API URLs** in service files:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

2. **Replace mock data calls** with actual fetch requests:
   ```javascript
   const response = await fetch(`${API_URL}/courses`, {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' },
     credentials: 'include', // For cookies/auth tokens
   });
   ```

3. **Update authentication flow** to use real backend tokens

4. **No frontend code changes needed** - just update service layer!

## 💾 Data Persistence

### LocalStorage
- User authentication data
- User profile information
- Session tokens (when integrated with backend)

### Mock Data
- Course catalog
- Quiz questions and answers
- User dashboards and analytics

## 🤖 AI Chatbot Integration

The chatbot uses Google Gemini API for intelligent responses:

```javascript
// Configure in .env.local
VITE_GEMINI_API_KEY=your_api_key

// Used in ChatBot.jsx
const response = await sendMessageToGemini(userMessage);
```

### Features:
- Real-time chat interface
- Floating UI with minimize/expand
- Learning-focused system prompt
- Typing indicators and message history

## 🎨 Design System

### Color Palette
- **Primary**: `#3b82f6` (Blue)
- **Secondary**: `#8b5cf6` (Purple)
- **Dark**: `#1f2937` (Dark Gray)
- **Light**: `#f9fafb` (Off White)

### Components
- **Button** - Multiple variants (primary, secondary, outline, danger, ghost)
- **Card** - Container with shadow and hover effects
- **Input** - Form field with validation
- **Spinner** - Loading indicator
- **Navbar** - Sticky navigation
- **ChatBot** - Floating AI assistant

## 📚 Mock Data

Located in `src/constants/mockData.js`:
- 6 sample courses with full details
- Quiz questions for courses
- Platform benefits and features
- Engagement analytics data

## ⚡ Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized images and assets
- Tailwind CSS tree-shaking
- Minification and bundling with Vite

## 🔄 Future Backend Integration (MERN)

The frontend is ready for backend integration:

### Backend TODO:
- Express server with MongoDB
- User authentication (JWT)
- Course management API
- Quiz submission and scoring
- Payment processing (Razorpay/Stripe)
- Email notifications
- File uploads (course materials, profile photos)

### No frontend changes needed when backend is ready!

## 📝 Environment Variables

### Required
- `VITE_GEMINI_API_KEY` - Google Gemini API key for chatbot

### Optional
- `VITE_API_URL` - Backend API URL (defaults to localhost:5000/api)

## 🐛 Troubleshooting

### Chatbot not responding?
- Check if `VITE_GEMINI_API_KEY` is set in `.env.local`
- Ensure your API key is valid from https://ai.google.dev/
- Check browser console for error messages

### Routes not working?
- Ensure all page components are imported in `App.jsx`
- Check that route paths match your navigation links

### Styles not applied?
- Run `npm install` to ensure Tailwind CSS is installed
- Check that `index.css` imports Tailwind directives
- Clear browser cache and restart dev server

## 📄 License

Built as a modern LMS example. Free to use and modify.

## 🤝 Contributing

This is a complete frontend template. Feel free to:
- Customize components and styling
- Add new pages and features
- Integrate with your own backend
- Deploy to production

## 📞 Support

For issues or questions:
1. Check the code comments
2. Review the mock data structure
3. Check the services folder for API integration points
4. Review Tailwind CSS documentation

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**
