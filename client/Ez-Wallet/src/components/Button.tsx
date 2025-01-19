import React from 'react';

type ButtonProps = {
  label: string;
  className?: string
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', variant = 'primary', className }) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-300 text-black hover:bg-gray-400';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;