import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-[24px] p-6 shadow-soft border border-slate-100/60 ${className}`}
  >
    {children}
  </div>
);

export default Card;
