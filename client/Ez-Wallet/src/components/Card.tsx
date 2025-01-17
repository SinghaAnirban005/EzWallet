import React from 'react';

type CardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;