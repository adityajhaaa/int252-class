import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { createOrder } from '../../services/paymentService';

export default function PaymentButton({ course, className }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      setLoading(true);
      await createOrder({
        amount: course.price,
        courseId: course._id || course.id,
      });
      alert('Enrolled successfully!');
      navigate('/dashboard'); // Redirect to dashboard or course page
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      className={className}
      onClick={handleEnroll}
      disabled={loading}
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  );
}
