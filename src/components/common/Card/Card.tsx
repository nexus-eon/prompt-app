import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const baseClass = 'card';
  const hoverableClass = hoverable ? 'card-hoverable' : '';
  const clickableClass = onClick ? 'card-clickable' : '';

  return (
    <div
      className={`${baseClass} ${hoverableClass} ${clickableClass} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">{children}</div>
    </div>
  );
};
