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

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
      document.addEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm">
          <div
            ref={ref}
            className={`relative mx-4 my-8 h-screen w-[60%] rounded-[1em] bg-dashboard p-[1.5em] shadow-lg ${className}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-[2.5em] text-white hover:text-gray-300"
            >
              <AiOutlineClose size={30} />
            </button>
            <div>{children}</div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default SideModal;
