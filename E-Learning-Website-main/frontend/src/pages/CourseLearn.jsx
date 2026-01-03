/**
 * Course Learning Page
 * Interactive lesson viewer with progress tracking
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../services/courseService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

export default function CourseLearn() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());

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

  const handleLessonComplete = () => {
    const lessonKey = `${selectedModuleIndex}-${selectedLessonIndex}`;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonKey);
    setCompletedLessons(newCompleted);

    // Move to next lesson
    const currentModule = course.modules[selectedModuleIndex];
    if (selectedLessonIndex < currentModule.lessons.length - 1) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
    } else if (selectedModuleIndex < course.modules.length - 1) {
      setSelectedModuleIndex(selectedModuleIndex + 1);
      setSelectedLessonIndex(0);
    }
  };

  const handleSelectLesson = (moduleIndex, lessonIndex) => {
    setSelectedModuleIndex(moduleIndex);
    setSelectedLessonIndex(lessonIndex);
  };

  const isLessonCompleted = (moduleIndex, lessonIndex) => {
    return completedLessons.has(`${moduleIndex}-${lessonIndex}`);
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
        <Button onClick={() => navigate('/student-dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const currentModule = course.modules[selectedModuleIndex];
  const currentLesson = currentModule?.lessons[selectedLessonIndex];
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/student-dashboard')}
              >
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-500">
                  {completedLessons.size} of {totalLessons} lessons completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-32">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">{progressPercent}%</p>
              </div>
              <Button 
                variant="primary" 
                onClick={() => navigate(`/quiz/${courseId}`)}
              >
                Take Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 sticky top-0 bg-white pb-3 border-b">
                Course Content
              </h2>
              
              <div className="space-y-3">
                {course.modules.map((module, mIndex) => (
                  <div key={mIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm">{module.title}</h3>
                      <p className="text-xs text-gray-500">{module.duration}</p>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {module.lessons.map((lesson, lIndex) => {
                        const isActive = mIndex === selectedModuleIndex && lIndex === selectedLessonIndex;
                        const isCompleted = isLessonCompleted(mIndex, lIndex);
                        
                        return (
                          <button
                            key={lIndex}
                            onClick={() => handleSelectLesson(mIndex, lIndex)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                              isActive ? 'bg-blue-50 border-l-2 border-blue-600' : ''
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted ? 'bg-green-500 text-white' : 
                              isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {isCompleted ? '✓' : lIndex + 1}
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                isActive ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{lesson.type === 'video' ? '📺' : '✏️'}</span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content - Lesson Viewer */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              {currentLesson ? (
                <div className="space-y-6">
                  {/* Lesson Header */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>Module {selectedModuleIndex + 1}</span>
                      <span>•</span>
                      <span>Lesson {selectedLessonIndex + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        {currentLesson.type === 'video' ? '📺 Video' : '✏️ Exercise'}
                      </span>
                      <span>•</span>
                      <span>⏱️ {currentLesson.duration}</span>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  {currentLesson.type === 'video' ? (
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">▶️</div>
                          <p className="text-lg">Video Player</p>
                          <p className="text-sm text-gray-400 mt-2">Duration: {currentLesson.duration}</p>
                        </div>
                      </div>
                      
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold text-gray-900">About this lesson</h3>
                        <p className="text-gray-600">
                          In this lesson, you'll learn about <strong>{currentLesson.title.toLowerCase()}</strong>. 
                          Watch the video carefully and take notes. You can pause and rewind as needed.
                        </p>
                        
                        <h4 className="text-md font-semibold text-gray-900 mt-4">Key Points:</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>Understanding the fundamentals</li>
                          <li>Practical applications and examples</li>
                          <li>Common mistakes to avoid</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">
                          📝 Practice Exercise
                        </h3>
                        <p className="text-blue-800 mb-4">
                          Complete this exercise to reinforce what you've learned in this module.
                        </p>
                        
                        <div className="bg-white rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Exercise: {currentLesson.title}</h4>
                          <p className="text-gray-600 mb-4">
                            Practice the concepts covered in the previous lessons. Take your time and 
                            focus on accuracy.
                          </p>
                          
                          <div className="space-y-3">
                            <div className="border border-gray-200 rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Task 1:</p>
                              <p className="text-sm text-gray-600">
                                Review and practice the vocabulary from this module.
                              </p>
                            </div>
                            <div className="border border-gray-200 rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Task 2:</p>
                              <p className="text-sm text-gray-600">
                                Complete the pronunciation exercises.
                              </p>
                            </div>
                            <div className="border border-gray-200 rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Task 3:</p>
                              <p className="text-sm text-gray-600">
                                Practice writing sentences using what you've learned.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-blue-700">
                          💡 Tip: Mark this lesson as complete once you've finished all tasks.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (selectedLessonIndex > 0) {
                          setSelectedLessonIndex(selectedLessonIndex - 1);
                        } else if (selectedModuleIndex > 0) {
                          setSelectedModuleIndex(selectedModuleIndex - 1);
                          setSelectedLessonIndex(course.modules[selectedModuleIndex - 1].lessons.length - 1);
                        }
                      }}
                      disabled={selectedModuleIndex === 0 && selectedLessonIndex === 0}
                    >
                      ← Previous Lesson
                    </Button>

                    <Button
                      variant="primary"
                      onClick={handleLessonComplete}
                    >
                      {isLessonCompleted(selectedModuleIndex, selectedLessonIndex) 
                        ? 'Next Lesson →' 
                        : 'Mark Complete & Continue'}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No lesson selected</p>
              )}
            </Card>

            {/* Additional Resources */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">📖</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Study Guide</h4>
                  <p className="text-sm text-gray-600">Downloadable PDF with key concepts</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">🎧</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Audio Files</h4>
                  <p className="text-sm text-gray-600">Listen to pronunciation examples</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">✍️</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Practice Sheets</h4>
                  <p className="text-sm text-gray-600">Extra exercises for practice</p>
                </div>
                <div 
                  className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/quiz/${courseId}`)}
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-blue-900 mb-1">Take Quiz</h4>
                  <p className="text-sm text-blue-700">Test your knowledge</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
