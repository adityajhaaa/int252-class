/**
 * Instructor Dashboard
 * Course management and engagement analytics
 */

import { useState, useEffect } from 'react';
import { getInstructorCourses, createCourse, removeCourse } from '../services/courseService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'A1',
    price: '',
  });

  useEffect(() => {
    loadInstructorCourses();
  }, []);

  const loadInstructorCourses = async () => {
    try {
      setLoading(true);
      const data = await getInstructorCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load instructor courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newCourse = await createCourse(formData);
      setCourses([...courses, newCourse]);
      setFormData({ title: '', description: '', level: 'Beginner', price: '' });
      setShowForm(false);
      alert('Course created successfully!');
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await removeCourse(courseId);
        setCourses(courses.filter((c) => c.id !== courseId));
        alert('Course deleted successfully!');
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Language Course Management
            </h1>
            <p className="text-gray-600">
              Manage your language courses and track student progress
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Create Course'}
          </Button>
        </div>

        {/* Create Course Form */}
        {showForm && (
          <Card className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Course
            </h2>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <Input
                label="Course Title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Proficient</option>
                  </select>
                </div>

                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="Course price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Create Course
              </Button>
            </form>
          </Card>
        )}

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Courses', value: courses.length },
            { label: 'Total Enrollments', value: courses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0) },
            { label: 'Avg. Completion', value: `${Math.round(courses.reduce((sum, c) => sum + (c.completionRate || 0), 0) / (courses.length || 1))}%` },
          ].map((stat, idx) => (
            <Card key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Courses Table */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Courses
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Course
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Enrolled
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Completion
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {course.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{course.price.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {course.level}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {course.enrolledCount || 0} students
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${course.completionRate || 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(course.completionRate || 0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => alert('Edit course feature coming soon')}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                You haven't created any courses yet.
              </p>
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
              >
                Create Your First Course
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
