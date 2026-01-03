/**
 * Main App Component
 * Sets up routing, authentication, and global layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CoursesPage from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CourseLearn from './pages/CourseLearn';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import QuizPage from './pages/Quiz';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetails />} />
              <Route
                path="/learn/:courseId"
                element={
                  <ProtectedRoute requiredRole="student">
                    <CourseLearn />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/instructor-dashboard"
                element={
                  <ProtectedRoute requiredRole="instructor">
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/quiz/:courseId"
                element={
                  <ProtectedRoute requiredRole="student">
                    <QuizPage />
                  </ProtectedRoute>
                }
              />



              {/* 404 - Not Found */}
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        404 - Page Not Found
                      </h1>
                      <p className="text-gray-600 mb-8">
                        Sorry, the page you're looking for doesn't exist.
                      </p>
                      <a
                        href="/"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Chatbot */}
          <ChatBot />

          {/* Footer */}
          <footer className="bg-black text-gray-200 pt-14 pb-8 px-4 border-t border-gray-800">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                {/* Brand */}
                <div className="space-y-3">
                  <div className="text-2xl font-semibold tracking-tight text-white">Evolve</div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    A premium, minimal LMS focused on clarity, craft, and outcomes.
                  </p>
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Explore</h4>
                  <ul className="space-y-3 text-sm">
                    <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="/courses" className="hover:text-white transition-colors">Courses</a></li>
                    <li><a href="/student-dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                  </ul>
                </div>

                {/* Account */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Account</h4>
                  <ul className="space-y-3 text-sm">
                    <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
                    <li><a href="/signup" className="hover:text-white transition-colors">Signup</a></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="mailto:angadkumaar82@gmail.com" className="hover:text-white transition-colors">
                        ✉ angadkumaar82@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+919322001147" className="hover:text-white transition-colors">
                        ☎ +91 9322001147
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-6">
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} Evolve. All rights reserved.</p>
                <div className="flex items-center gap-5 text-xs text-gray-500">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}
