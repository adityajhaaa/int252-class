import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/enrollmentService';

export default function EnrollButton({ course, className }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      await createOrder({
        amount: course.price,
        courseId: course._id || course.id,
      });
      alert('Enrolled successfully!');
      navigate('/student-dashboard');
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
