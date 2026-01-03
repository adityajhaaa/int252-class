const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  if (!res.ok) throw new Error('Failed to enroll');
  return res.json();
}

export async function getOrderStatus(orderId) {
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch order status');
  return res.json();
}
