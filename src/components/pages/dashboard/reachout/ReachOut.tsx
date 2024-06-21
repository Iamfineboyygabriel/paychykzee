import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { button } from "../../../../shared/button/button";
import Modal from "../../../../shared/modal/Modal";
import image from "../../../../assets/svg/success.svg";
import landingServices from "../../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const ReachOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dashboard = async () => {
    navigate("/dashboard/home");
  };

  const ContactUs = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const endpoint = `${process.env.REACT_APP_API_URL}/users/contact`;

    try {
      const response: any = await landingServices.Reach_Out(endpoint, {
        message,
      });
      setLoading(false);

      if (response?.status === 201) {
        setMessage("");
        openModal();
      } else {
        toast.error("An error occurred");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const isButtonDisabled = message.trim() === "";

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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your message"
              className="h-[20em] w-full rounded-md border-[1px] border-border bg-inherit bg-input p-3 placeholder:text-sm placeholder:text-textp"
            ></textarea>
          </div>
          <div className="mt-[3em] px-[2em]">
            <button.PrimaryButton
              className={`w-full ${isButtonDisabled ? "cursor-not-allowed bg-disabledPrimary text-gray-400" : "bg-primary text-text"}`}
              onClick={ContactUs}
              disabled={isButtonDisabled}
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                />
              ) : (
                "Send Message"
              )}
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
