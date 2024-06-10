import { button } from "../../../../shared/button/button";
import Modal from "../../../../shared/modal/Modal";
import image from "../../../../assets/svg/success.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReachOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };

  const dashboard = async () => {
    navigate("/dashboard/home");
  };

  return (
    <div className="font-br-regular">
      <h1 className="font-br-semibold text-2xl">Contact</h1>
      <div className="m-auto mt-[1em] h-full rounded-lg bg-dashboard px-[1em] py-[2em] lg:px-[3em]">
        <p>Send Us Message</p>
        <div className="text-center lg:w-[60%]">
          <div className="mt-[1em]">
            <textarea
              name="contact"
              id="contact"
              placeholder="Describe your message"
              className="h-[20em] w-full rounded-md border-[1px] border-border bg-inherit bg-input p-3 placeholder:text-sm placeholder:text-textp"
            ></textarea>
          </div>
          <div className="mt-[3em] px-[2em]">
            <button.PrimaryButton className="w-full" onClick={openModal}>
              Send message
            </button.PrimaryButton>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center lg:p-[4em]">
          <img src={image} alt="Success" className="mb-4 h-24 w-24" />
          <h1 className="mb-4 space-x-12 font-br-semibold text-3xl text-text">
            Message Sent
          </h1>
          <p className="mb-4 text-center text-textp">
            You successfully sent a message to customer support team
          </p>

          <button.PrimaryButton
            className="mt-[1.5em] w-full text-text lg:mt-[4em]"
            onClick={dashboard}
          >
            Go to Dashboard
          </button.PrimaryButton>
        </div>
      </Modal>
    </div>
  );
};

export default ReachOut;
