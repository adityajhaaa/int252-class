/**
 * Payment Page
 * Course payment with UPI information
 */

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { PAYMENT_CONFIG, buildUpiIntent, getQrUrl } from '../constants/paymentConfig';

export default function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, failed

  // Mock course data (replace with real course lookup if available)
  const coursePrice = 2999;
  const courseName = 'React Fundamentals';
  const upiLink = useMemo(() => buildUpiIntent({ amount: coursePrice, title: courseName }), [coursePrice, courseName]);
  const qrUrl = useMemo(() => getQrUrl(upiLink), [upiLink]);
  const { upiId, payeeName, currency } = PAYMENT_CONFIG;

  const handlePaymentSimulation = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <div className="text-6xl mb-4">✅</div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>

            <div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
              <p className="text-gray-700 mb-4">
                Thank you for your purchase! You now have access to:
              </p>

              <div className="text-2xl font-bold text-gray-900 mb-4">
                {courseName}
              </div>

              <p className="text-green-700 font-semibold">
                Enrollment confirmation has been sent to your email.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => navigate('/student-dashboard')}
              >
                Go to Dashboard
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate('/courses')}
              >
                Browse More Courses
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          {/* Order Summary */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Course:</span>
                <span className="font-semibold text-gray-900">
                  {courseName}
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="text-gray-700 font-semibold">Price:</span>
                <span className="font-bold text-blue-600">
                  ₹{coursePrice}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-900 font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{coursePrice}
                </span>
              </div>
            </div>
          </div>

          {/* UPI Payment Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Payment Method
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📱</span>
                Pay with UPI
              </h4>

              <div className="space-y-4">
                {/* UPI Details */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Scan QR Code or use UPI ID to pay
                  </p>

                  {/* QR Code */}
                  <div className="bg-white rounded-lg p-6 flex flex-col items-center mb-4 border border-gray-200">
                    <img src={qrUrl} alt="UPI QR" className="w-48 h-48 rounded-lg border" />
                    <p className="text-center text-sm text-gray-600 mt-3">
                      Scan to pay with any UPI app
                    </p>
                  </div>

                  {/* UPI ID */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">UPI ID:</p>
                    <p className="text-lg font-mono font-bold text-gray-900 break-all">
                      {upiId || 'Set VITE_UPI_ID'}
                    </p>
                  </div>

                  {/* Payment Details */}
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold">Recipient Name:</p>
                      <p>{payeeName || 'Set VITE_UPI_NAME'}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Amount:</p>
                      <p>₹{coursePrice} <span className="text-xs text-gray-500">{currency}</span></p>
                    </div>

                    <div>
                      <p className="font-semibold">UPI Intent Link:</p>
                      <a href={upiLink} target="_blank" rel="noreferrer" className="text-blue-600 break-all">
                        {upiLink}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              After completing payment in your UPI app, click "I Have Paid" to continue.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setPaymentStatus('success')}
            >
              I Have Paid
            </Button>

            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/courses')}
            >
              Cancel
            </Button>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <span className="text-lg mr-2">🔒</span>
              Your payment information is secure and encrypted
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
