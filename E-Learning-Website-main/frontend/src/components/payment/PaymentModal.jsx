import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { PAYMENT_CONFIG, buildUpiIntent, getQrUrl } from '../../constants/paymentConfig';
import { createOrder, getOrderStatus } from '../../services/paymentService';

export default function PaymentModal({ course, onClose }) {
  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderId, setOrderId] = useState('');
  const upiLink = buildUpiIntent({ amount: course.price, title: course.title });
  const qrUrl = getQrUrl(upiLink);
  const { upiId, payeeName, currency, razorpayKeyId } = PAYMENT_CONFIG;

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    } catch {}
  };

  const openRazorpay = async () => {
    try {
      setLoading(true);
      setPaymentError('');
      const { orderId: oid, keyId } = await createOrder({ amount: course.price, currency, receipt: `course_${course.id}` });
      setOrderId(oid);

      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const options = {
        key: keyId || razorpayKeyId,
        amount: Math.round(Number(course.price) * 100),
        currency,
        name: payeeName || 'Evolve',
        description: course.title,
        order_id: oid,
        method: 'upi',
        upi: { flow: 'intent' },
        notes: { courseId: course.id },
        handler: async function () {
          setTimeout(async () => {
            try {
              const status = await getOrderStatus(oid);
              if (status.status === 'paid') {
                onClose();
              }
            } catch {}
          }, 2000);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setPaymentError('Failed to initiate payment. Please try UPI intent or retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">Pay for {course.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-semibold text-gray-900">₹{course.price} <span className="text-sm text-gray-500">{currency}</span></p>
              </div>
              <a href={upiLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                Open UPI App
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img src={qrUrl} alt="UPI QR" className="w-40 h-40 rounded-lg border" />
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm text-gray-600">Payee</p>
                <p className="font-medium text-gray-900">{payeeName || 'Set VITE_UPI_NAME'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">UPI ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-gray-900">{upiId || 'Set VITE_UPI_ID'}</p>
                  <Button variant="ghost" size="sm" onClick={() => copy(upiId, 'upi')} disabled={!upiId}>Copy</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">UPI Intent</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-800 break-all">{upiLink}</p>
                  <Button variant="ghost" size="sm" onClick={() => copy(upiLink, 'intent')}>Copy</Button>
                </div>
              </div>
            </div>
          </div>

          {copied && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded p-2 text-sm">
              Copied {copied} to clipboard
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" className="flex-1" onClick={openRazorpay} disabled={loading || (!razorpayKeyId && !upiId)}>
              {loading ? 'Processing...' : 'Pay via Razorpay (UPI)'}
            </Button>
            <Button variant="secondary" className="flex-1" onClick={onClose}>Close</Button>
          </div>

          {paymentError && (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm">
              {paymentError}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
