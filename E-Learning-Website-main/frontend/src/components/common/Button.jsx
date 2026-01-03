/**
 * Button Component
 * Reusable button with multiple variants
 */

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles =
    'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 border border-transparent';

  const variants = {
    primary:
      'bg-black text-white hover:bg-gray-900 focus:ring-gray-800 shadow-sm hover:-translate-y-0.5',
    secondary:
      'bg-white text-black border border-gray-300 hover:border-gray-500 hover:-translate-y-0.5 shadow-sm focus:ring-gray-200',
    outline:
      'bg-transparent text-black border border-gray-400 hover:bg-gray-100 hover:-translate-y-0.5 focus:ring-gray-300',
    danger:
      'bg-gray-900 text-white hover:bg-black focus:ring-gray-800',
    ghost:
      'text-gray-800 hover:bg-gray-100 focus:ring-gray-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
