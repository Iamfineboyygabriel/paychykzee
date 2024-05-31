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
      <div className="font-br-regular">
        <h1 className="font-br-semibold text-2xl">
          Peer to Peer currency exchange
        </h1>
        <div className="h-[calc(100vh - 4em)] m-auto mt-[1em] rounded-lg bg-dashboard px-[3em] py-[2em]">
          <h1 className="text-2xl">Send Money</h1>
          <div className="mt-[2.5em] h-auto w-[80%]">
            <form action="submit" className="mt-[2em]">
              <h1 className="font-br-semibold text-textp">You Send</h1>
              <div className="mt-[2em] flex gap-[2em]">
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

              <div className="mt-[1em] flex justify-center">
                <img src={spin} alt="spin" />
              </div>

              <h1 className="font-br-semibold text-textp">You Receive</h1>
              <div className="mt-[2em] flex gap-[2em]">
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
              <div className="mt-[1.5em] flex gap-4">
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
            <div className="mt-[7em] px-[5em]">
              <button.PrimaryButton className="w-full" onClick={openModal}>
                Continue
              </button.PrimaryButton>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4 space-x-12 font-br-semibold text-3xl">
              Confirm Transaction
            </h1>
            <p className="mb-4 text-textp">
              Please confirm your transaction before you proceed
            </p>

            <div className="mt-[1.5em] w-[72%]">
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
                <p className="text-xs">
                  Please note that you will be charged an exchange fee after
                  invoice has been received.
                </p>
              </div>
            </div>
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
    </>
  );
};

export default Peer;
