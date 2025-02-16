import React from "react";

export const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};
