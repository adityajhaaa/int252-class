// Quiz service: frontend-only mock implementation
// TODO: Replace mocks with real API calls when backend is ready.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

export async function fetchQuizzes(courseId) {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/quizzes/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch quizzes:', error);
    throw error;
  }
}

export async function fetchQuiz(quizId) {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
    throw error;
  }
}

export async function submitQuiz(quizId, answers) {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const response = await fetch(`${API_URL}/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    throw error;
  }
}

export async function getQuizResults(courseId) {
  // Not implemented in backend yet
  return [];
}

