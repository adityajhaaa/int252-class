/**
 * Course Service
 * Abstracts all course-related API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle API responses
 */
async function handleResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
    throw new Error('Session expired');
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API Error');
  }
  return response.json();
}

/**
 * Fetch all courses
 * @returns {Promise<Array>} Array of courses
 */
export async function fetchCourses() {
  try {
    const response = await fetch(`${API_URL}/courses`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

/**
 * Fetch single course by ID
 * @param {string} courseId
 * @returns {Promise<Object>} Course object
 */
export async function fetchCourseById(courseId) {
  try {
    const response = await fetch(`${API_URL}/courses/${courseId}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch course ${courseId}:`, error);
    throw error;
  }
}

/**
 * Search and filter courses
 * @param {string} query - Search query
 * @param {string} level - Filter by level (Beginner, Intermediate, Advanced)
 * @returns {Promise<Array>} Filtered courses
 */
export async function searchCourses(query = '', level = '') {
  try {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (level) params.append('level', level);
    
    const response = await fetch(`${API_URL}/courses?${params}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to search courses:', error);
    throw error;
  }
}

/**
 * Create a new course (Instructor only)
 * @param {Object} courseData - Course details
 * @returns {Promise<Object>} Created course
 */
export async function createCourse(courseData) {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
}


/**
 * Delete a course (Instructor only)
 * @param {string} courseId
 * @returns {Promise<void>}
 */
export async function removeCourse(courseId) {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to delete course ${courseId}:`, error);
    throw error;
  }
}

/**
 * Get student's enrolled courses
 * @returns {Promise<Array>} Array of enrolled courses
 */
export async function getEnrolledCourses() {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/courses/enrolled`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch enrolled courses:', error);
    throw error;
  }
}

/**
 * Get instructor's courses
 * @returns {Promise<Array>} Array of instructor's courses
 */
export async function getInstructorCourses() {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/courses/mycourses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch instructor courses:', error);
    throw error;
  }
}

