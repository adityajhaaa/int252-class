/**
 * Navbar Component
 * Main navigation for the application
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './common/Button';

export default function Navbar() {
  const { isAuthenticated, userRole, auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight text-black">
          Evolve
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/courses', label: 'Courses' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-700 relative group"
            >
              <span className="group-hover:text-black transition-colors">{item.label}</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all group-hover:w-full" />
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              to={userRole === 'instructor' ? '/instructor-dashboard' : '/student-dashboard'}
              className="text-gray-700 relative group"
            >
              <span className="group-hover:text-black transition-colors">Dashboard</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all group-hover:w-full" />
            </Link>
          )}
        </div>

        {/* Right Side - Auth Buttons or Profile */}
        <div className="flex gap-3 items-center">
          {!isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-gray-800 hover:text-black font-medium"
              >
                {auth?.name || 'Profile'}
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
