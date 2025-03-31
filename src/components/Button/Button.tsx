import React from 'react';

// Визначаємо тип пропсів
interface ButtonProps {
  text?: string;
  onClick?: () => void; // Додаємо опціональну функцію обробки кліку
}

// Компонент з Tailwind CSS
const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
