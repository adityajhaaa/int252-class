// Payment configuration for UPI
// Provide values via .env.local
// VITE_UPI_ID, VITE_UPI_NAME, VITE_UPI_QR_URL, VITE_UPI_NOTE_PREFIX

export const PAYMENT_CONFIG = {
  upiId: import.meta.env.VITE_UPI_ID || '',
  payeeName: import.meta.env.VITE_UPI_NAME || '',
  qrImageUrl: import.meta.env.VITE_UPI_QR_URL || '',
  notePrefix: import.meta.env.VITE_UPI_NOTE_PREFIX || 'Evolve Course',
  currency: 'INR',
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
};

export function buildUpiIntent({ amount, title }) {
  const { upiId, payeeName, currency, notePrefix } = PAYMENT_CONFIG;
  const tn = `${notePrefix}: ${title}`;
  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${encodeURIComponent(amount)}&cu=${currency}&tn=${encodeURIComponent(
    tn
  )}`;
}

export function getQrUrl(upiLink) {
  const { qrImageUrl } = PAYMENT_CONFIG;
  // Use provided QR image URL if present; else generate QR for the UPI intent
  return (
    qrImageUrl ||
    `https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${encodeURIComponent(
      upiLink
    )}&choe=UTF-8`
  );
}
