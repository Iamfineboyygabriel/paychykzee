import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      className={`rounded-md bg-primary px-4 py-3 font-br-semibold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const button = {
  PrimaryButton,
};
