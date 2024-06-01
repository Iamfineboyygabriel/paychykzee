import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SideModal: React.FC<ModalProps> = ({
  children,
  className,
  isOpen,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscapeKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("touchstart", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-0 z-50 flex h-screen items-center bg-black bg-opacity-50">
          <div
            ref={ref}
            className={`lg:p-15 relative mx-4 my-8 w-full max-w-lg rounded-[1em] bg-dashboard p-[1.5em] shadow-lg md:max-w-xl md:p-6 lg:max-w-2xl xl:max-w-3xl ${className}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
            <div>{children}</div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default SideModal;
