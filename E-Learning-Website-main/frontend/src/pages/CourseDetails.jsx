/**
 * Course Details Page
 * Shows detailed information about a course including syllabus
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../services/courseService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import EnrollButton from '../components/common/EnrollButton';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const data = await fetchCourseById(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Failed to load course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
        <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 text-sm font-medium text-gray-400 uppercase tracking-wider">
              <span>{course.level}</span>
              <span>•</span>
              <span>{course.duration}</span>
              <span>•</span>
              <span>⭐ {course.rating} ({course.students} students)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  👨‍🏫
                </div>
                <div>
                  <p className="text-sm text-gray-400">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>

              <div className="text-2xl font-bold">
                ₹{course.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Syllabus */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Course Syllabus</h2>
                <p className="text-gray-500 mt-1">
                  {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {course.modules.map((module, index) => (
                  <div key={index} className="group">
                    <button
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          activeModule === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.lessons.length} lessons • {module.duration}</p>
                        </div>
                      </div>
                      <span className={`transform transition-transform duration-200 ${activeModule === index ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    {activeModule === index && (
                      <div className="bg-gray-50 px-6 pb-6 pt-2 space-y-2">
                        {module.lessons.map((lesson, lIndex) => (
                          <div key={lIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200/60">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400 text-sm">
                                {index + 1}.{lIndex + 1}
                              </span>
                              <span className="text-gray-700 font-medium">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{lesson.type === 'video' ? '📺' : '📄'}</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="aspect-video rounded-xl bg-gray-900 mb-6 flex items-center justify-center text-white">
                <span className="text-4xl">▶️</span>
              </div>
              
              <div className="space-y-4">
                <EnrollButton course={course} className="w-full py-4 text-lg" />
                <p className="text-center text-sm text-gray-500">
                  30-day money-back guarantee
                </p>
                
                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <h4 className="font-semibold text-gray-900">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span>📺</span> {course.duration} on-demand video
                    </li>
                    <li className="flex items-center gap-2">
                      <span>📱</span> Access on mobile and TV
                    </li>
                    <li className="flex items-center gap-2">
                      <span>♾️</span> Full lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🏆</span> Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
