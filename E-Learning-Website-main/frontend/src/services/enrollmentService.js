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

export async function createOrder({ amount, currency = 'INR', courseId }) {
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, currency, courseId }),
  });
  return handleResponse(res);
}

export async function getOrderStatus(orderId) {
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}
