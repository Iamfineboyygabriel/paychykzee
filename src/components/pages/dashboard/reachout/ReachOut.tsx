import { button } from "../../../../shared/button/button";
import Modal from "../../../../shared/modal/Modal";
import { useState } from "react";

const ReachOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-br-regular">
      <h1 className="font-br-semibold text-2xl">Contact</h1>
      <div className="m-auto mt-[1em] h-screen rounded-lg bg-dashboard px-[3em] py-[2em]">
        <p>Send Us Message</p>
        <div className="w-[60%] text-center">
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
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 space-x-12 font-br-semibold text-3xl">
            Message Us
          </h1>
          <p className="mb-4 text-textp">
            Please confirm your transaction before you proceed
          </p>

          <button.PrimaryButton
            onClick={closeModal}
            className="mt-[4em] w-full"
          >
            Make Payment
          </button.PrimaryButton>
          <div className="mt-[1.3em]">
            <p className="gradient-text font-br-semibold">
              Get A Discounted offer
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReachOut;
