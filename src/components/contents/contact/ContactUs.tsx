import { button } from "../../../shared/button/button";
import Modal from "../../../shared/modal//Modal";
import image from "../../../assets/svg/success.svg";
import { useState } from "react";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="bg-purpleblack font-br-regular">
      <section className="m-auto px-4 py-[5em] lg:w-[80%] lg:px-0">
        <header className="m-auto w-full text-center lg:w-[30%]">
          <h1 className="gradient-text text-center font-br-semibold text-3xl">
            Contact Us
          </h1>
          <div>
            <p className="mt-[1.5em] font-br-light leading-7 text-text">
              Have questions or need assistance? Our customer support team is
              here to help 24/7.
            </p>
          </div>
        </header>
        <section>
          <form className="m-auto mt-[2em] border border-border px-[1.5em] py-[2em] text-text lg:w-[70%] lg:px-[5em]">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="rounded-md border border-border bg-inherit p-2 placeholder:text-border focus:border-side focus:bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-5 sm:mt-4 lg:flex-row">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email address"
                  className="mt-3 w-full  rounded-md border border-border bg-inherit p-2 placeholder:text-border focus:border-side focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  className="mt-3  w-full rounded-md border border-border bg-inherit p-2 placeholder:text-border focus:border-side focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-[2em] flex flex-col gap-3">
              <label htmlFor="message">Send us a message</label>
              <textarea
                id="message"
                placeholder="Describe your message"
                className="h-[180px]  border border-border bg-inherit p-2 placeholder:text-border focus:border-side focus:outline-none"
              ></textarea>
            </div>
            <div className="mt-[1.5em]">
              <button.PrimaryButton className="w-full" >
                Send Message
              </button.PrimaryButton>
            </div>
          </form>
        </section>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center lg:p-[4em]">
          <img src={image} alt="Success" className="mb-4 h-24 w-24" />
          <h1 className="mb-4 space-x-12 font-br-semibold text-3xl text-text">
            Message Sent
          </h1>
          <p className="mb-4 text-center text-textp">
            You successfully sent a message to customer support team
          </p>

          <button.PrimaryButton className="mt-[1.5em] w-full text-text lg:mt-[4em]">
            Go to Home
          </button.PrimaryButton>
        </div>
      </Modal>
    </main>
  );
};

export default ContactUs;
