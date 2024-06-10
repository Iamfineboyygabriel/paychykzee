import { button } from "../../shared/button/button";
import Modal from "../../shared/modal/Modal";
import success from "../../assets/png/success-modal.png";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  setModalType: (modalType: string) => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  setModalType,
}) => {
  const navigate = useNavigate();

  const Login = () => {
    return Promise.resolve(navigate("/login"));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} setModalType={setModalType}>
      <div className="m-auto flex w-[95%] max-w-4xl rounded-xl bg-dashboard text-center font-br-regular text-logintext shadow-lg lg:w-[90%] lg:py-[2em]">
        <div className="m-auto mt-[2.5em] w-[90%] text-center">
          <div className="flex justify-center">
            <img src={success} alt="success" />
          </div>
          <div className="mt-[1.5em]">
            <h1 className=" font-br-semibold text-2xl tracking-normal text-text lg:text-[2em]">
              Account created
            </h1>
            <p className="mt-[1em] text-sm lg:mt-[1.3em] lg:text-lg">
              Your account has been created successfully
            </p>
          </div>
          <div className="lg:mt-[2.5em]">
            <button.PrimaryButton
              onClick={Login}
              className="mt-[2em] w-full text-text"
            >
              Proceed to Login
            </button.PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
