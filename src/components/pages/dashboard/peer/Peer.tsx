import { useState } from "react";
import spin from "../../../../assets/svg/spin.svg";
import { button } from "../../../../shared/button/button";
import Modal from "../../../../shared/modal/Modal";
import exclamation from "../../../../assets/svg/exclamation.svg";

const Peer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="font-br-regular">
        <header>
          <h1 className="font-br-semibold text-xl lg:text-2xl">
            Peer to Peer currency exchange
          </h1>
        </header>
        <section className="h-[calc(100vh - 4em)] m-auto mt-[1em] rounded-lg bg-dashboard px-[1.5em] py-[2em] lg:px-[3em]">
          <h1 className="text-2xl">Send Money</h1>
          <div className="mt-[2em] h-auto lg:mt-[3em] lg:w-[80%]">
            <form action="submit" className="mt-[2em]">
              <h1 className="font-br-semibold text-textp">You Send</h1>

              <div className="xs:flex-col mt-[2em] flex flex-col gap-[2em] sm:flex-col md:flex-row lg:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="whatBill"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    What bill are you paying for?
                  </label>
                  <input
                    name="whatBill"
                    id="WhatBill"
                    className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="country"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Country
                  </label>
                  <input
                    name="country"
                    id="country"
                    type="text"
                    className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3"
                  />
                </div>
              </div>

              <div className="mt-[1em] flex justify-center">
                <img src={spin} alt="spin" />
              </div>

              <h1 className="font-br-semibold text-textp">You Receive</h1>

              <div className="xs:flex-col mt-[2em] flex flex-col gap-[2em] sm:flex-col md:flex-row lg:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="currency"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Currency
                  </label>
                  <input
                    name="currency"
                    id="currency"
                    className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="amount"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Amount
                  </label>
                  <input
                    name="amount"
                    id="amount"
                    type="text"
                    className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                  />
                </div>
              </div>
              <div className="mt-[1.5em] flex flex-col gap-4 lg:flex-row">
                <p>USB/GPB</p>
                <div className="flex gap-3">
                  <p>Rate:</p>
                  <p className="font-br-semibold">0.7849 USD</p>
                </div>
                <div className="flex gap-3">
                  <p>Exchange Fee:</p>
                  <p className="font-br-semibold">20.00 USD</p>
                </div>
              </div>
            </form>
            <div className="flex justify-center sm:mt-[2em] lg:mt-[7em]">
              <button.PrimaryButton
                className=" w-full lg:w-[80%]"
                onClick={openModal}
              >
                Continue
              </button.PrimaryButton>
            </div>
          </div>
        </section>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="mt-[1.5em] flex flex-col items-center justify-center">
            <header>
              <h1 className="mb-4 font-br-semibold text-2xl text-text lg:text-3xl">
                Confirm Transaction
              </h1>
            </header>
            <p className="mb-4 text-center text-textp">
              Please confirm your transaction before you proceed
            </p>

            <div className="lg:mt-[1.5em] lg:w-[57%]">
              <div className="w-full">
                <label
                  htmlFor="amount"
                  className="flex-start flex font-br-semibold text-xs text-textp"
                >
                  Payment for
                </label>
                <input
                  name="amount"
                  id="amount"
                  type="text"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                />
              </div>

              <div className="mt-[1.5em] w-full">
                <label
                  htmlFor="amount"
                  className="flex-start flex font-br-semibold text-xs text-textp"
                >
                  Amount to receive
                </label>
                <input
                  name="amount"
                  id="amount"
                  type="text"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                />
              </div>
              <div className="mt-[1.5em] flex gap-1">
                <img src={exclamation} alt="information" />
                <p className="text-sm text-text">
                  Please note that you will be charged an exchange fee after
                  invoice has been received.
                </p>
              </div>
            </div>
            <button.PrimaryButton
              onClick={closeModal}
              className="mt-[1.5em] w-full text-text lg:mt-[4em] lg:w-[75%]"
            >
              Make Payment
            </button.PrimaryButton>
            <section className="mt-[1.3em]">
              <p className="gradient-text font-br-semibold">
                Get A Discounted offer
              </p>
            </section>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default Peer;
