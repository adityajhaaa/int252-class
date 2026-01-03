/**
 * Student Dashboard
 * Shows enrolled courses and learning progress
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnrolledCourses } from '../services/courseService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadEnrolledCourses();
  }, []);

  const loadEnrolledCourses = async () => {
    try {
      setLoading(true);
      const data = await getEnrolledCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-start justify-between flex-col md:flex-row md:items-end gap-3 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Language Learning Progress</p>
            <h1 className="text-4xl font-semibold text-black">My Language Dashboard</h1>
          </div>
          <Button variant="outline" onClick={loadEnrolledCourses}>Refresh</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Languages Learning', value: courses.length },
            { label: 'Lessons Completed', value: Math.max(0, Math.floor(courses.length * 15)) },
            { label: 'Quiz Score Avg', value: Math.max(0, Math.floor(courses.length * 0.3)) + '%' },
          ].map((stat, idx) => (
            <Card key={idx} className="text-left border border-gray-200/70">
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="text-4xl font-semibold text-black">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-6">Your Language Courses</h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : courses.length > 0 ? (
            <div className="space-y-6">
              {courses.map((course) => (
                <Card key={course._id} className="flex flex-col md:flex-row gap-6 border border-gray-200/80">
                  <div className="w-full md:w-48 h-40 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black flex-shrink-0 flex items-center justify-center text-white text-3xl">
                    📚
                  </div>

                  <div className="flex-grow space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-black">{course.title}</h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{course.description}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-semibold text-black">{Math.round(course.completionPercentage || 0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.completionPercentage || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <span>⭐ {course.rating}</span>
                      <span>👥 {course.students.toLocaleString()} students</span>
                      <span>📚 {course.modules?.length || 0} modules</span>
                    </div>

                    <Button variant="primary" onClick={() => handleContinue(course._id)}>
                      Continue learning
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">
                You haven't enrolled in any courses yet.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/courses')}
              >
                Explore courses
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
