/**
 * Courses Page
 * Browse, search, and filter courses
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCourses, searchCourses } from '../services/courseService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import EnrollButton from '../components/common/EnrollButton';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query, level) => {
    try {
      setLoading(true);
      const data = await searchCourses(query, level);
      setCourses(data);
    } catch (error) {
      console.error('Failed to search courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query, levelFilter);
  };

  const handleFilterChange = (e) => {
    const level = e.target.value;
    setLevelFilter(level);
    handleSearch(searchQuery, level);
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Language Courses</p>
            <h1 className="text-4xl font-semibold text-black mb-3">Choose Your Language</h1>
            <p className="text-lg text-gray-600">From beginner (A1) to advanced (C2) - Start your journey today.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search courses"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <select
              value={levelFilter}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">All Levels</option>
              <option value="A1">A1 - Beginner</option>
              <option value="A2">A2 - Elementary</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
              <option value="C1">C1 - Advanced</option>
              <option value="C2">C2 - Proficient</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course._id} className="flex flex-col h-full border border-gray-200/80">
                <Link to={`/course/${course._id}`} className="block group">
                  <div className="w-full h-48 rounded-xl mb-5 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-end relative">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="p-5 space-y-2 relative z-10">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-300">{course.level}</p>
                      <p className="text-lg font-semibold leading-tight group-hover:underline decoration-1 underline-offset-4">{course.title}</p>
                    </div>
                  </div>
                </Link>

                <p className="text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="space-y-2 mb-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Instructor</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Students</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Rating</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-black">
                    <span>Price</span>
                    <span>₹{course.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Link 
                    to={`/course/${course._id}`}
                    className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <EnrollButton course={course} className="w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No courses found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
