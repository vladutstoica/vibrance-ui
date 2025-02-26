import React from 'react';

interface SimpleButtonProps {
  label: string;
  onClick?: () => void;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}; 