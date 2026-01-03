/**
 * Card Component
 * Reusable card container
 */

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
