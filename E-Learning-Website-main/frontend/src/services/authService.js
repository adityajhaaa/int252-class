/**
 * Auth Service
 * Abstracts authentication API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} User data with token
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Register user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Promise<Object>} User data with token
 */
export async function registerUser(name, email, password, role) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('userInfo');
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user info:', error);
    localStorage.removeItem('userInfo');
    return null;
  }
}

