import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  setModalType?: (modalType: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  isOpen,
  onClose,
  setModalType,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscapeKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        setModalType && setModalType("");
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
    };
  }, [isOpen, onClose, setModalType]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            ref={ref}
            className={`lg:p-15 relative mx-4 my-8 w-full max-w-lg rounded-[1em] bg-dashboard p-[1.5em] shadow-lg md:max-w-xl md:p-6 lg:max-w-2xl xl:max-w-3xl ${className}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
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

export default Modal;
