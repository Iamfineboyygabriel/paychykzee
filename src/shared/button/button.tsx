import React from "react";
import ReactLoading from "react-loading";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  className?: string;
  onSubmit?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  onSubmit,
  disabled,
  type = "button",
  loading,
}) => {
  return (
    <button
      className={`rounded-md bg-primary px-4 py-3 font-br-semibold ${className} ${
        disabled ? "cursor-not-allowed bg-gray-500" : ""
      }`}
      onSubmit={onSubmit}
      onClick={(event) => {
        if (typeof onClick === "function") {
          onClick(event);
        }
      }}
      disabled={disabled}
      type={type}
    >
      {loading ? (
        <ReactLoading color="#FFFFFF" width={25} height={25} type="spin" />
      ) : (
        children
      )}
    </button>
  );
};

export const button = {
  PrimaryButton,
};
