import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrencies } from "../../../../shared/redux/slices/transaction.slices";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { setMessage } from "../../../../shared/redux/slices/message.slices";
import {
  PaymentRate,
  PeerToPeer,
} from "../../../../shared/redux/slices/landing.slices";
import Modal from "../../../../shared/modal/Modal";
import { button } from "../../../../shared/button/button";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import spin from "../../../../assets/svg/spin.svg";
import exclamation from "../../../../assets/svg/exclamation.svg";

interface Currency {
  name: string;
  code: string;
}

interface RateResponse {
  rate: number;
  exchangeFee: number;
}

interface PeerToPeerResponse {
  status: number;
  message: string;
  data: {
    redirectUrl: string;
  };
}

const Peer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBaseDropdownOpen, setIsBaseDropdownOpen] = useState(false);
  const [isPairDropdownOpen, setisPairDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [baseCurrency, setBaseCurrency] = useState<Currency | null>(null);
  const [pairCurrency, setPairCurrency] = useState<Currency | null>(null);
  const [baseAmount, setBaseAmount] = useState("");
  const [pairAmount, setPairAmount] = useState("");
  const [rate, setRate] = useState("");
  const [exchangeFee, setExchangeFee] = useState("5");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [rateLoading, setRateLoading] = useState(false);

  const dropdownRef = useRef(null);

  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
  const userToken = sessionStorage.getItem("userData");

  const currencyList = useSelector(
    (state: any) => state.transaction.getCurrencies,
  );

  const handleBaseCurrencySelect = (currency: any) => {
    setBaseCurrency(currency);
    setIsBaseDropdownOpen(false);
  };
  const handlePeerCurrencySelect = (currency: any) => {
    setPairCurrency(currency);
    setisPairDropdownOpen(false);
  };

  useEffect(() => {
    if (userToken) {
      setCurrencyLoading(true);
      dispatch(GetCurrencies())
        .unwrap()
        .then(() => {
          setCurrencyLoading(false);
        })
        .catch((error: { message: any }) => {
          setCurrencyLoading(false);
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
          toast.error(errorMessage);
        });
    } else {
      dispatch(setMessage("Token not found"));
      toast.error("Token not found");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Node).contains(event.target as Node)
      ) {
        setIsBaseDropdownOpen(false);
        setisPairDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, userToken]);

  useEffect(() => {
    if (baseCurrency && pairCurrency) {
      GetRate();
    }
  }, [baseCurrency, pairCurrency]);

  const openModal = async () => {
    if (baseCurrency && pairCurrency && baseAmount.trim() !== "") {
      setLoading(true);
      await pairToAmount();
      await pairToAmountDiscounted();
      setIsModalOpen(true);
      setLoading(false);
    } else {
      toast.error(
        "Please select currencies and enter an amount before continuing.",
      );
    }
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };

  const GetRate = async () => {
    if (baseCurrency && pairCurrency) {
      setRateLoading(true);
      let body = {
        baseCurrency: baseCurrency?.code ?? "",
        pairCurrency: pairCurrency?.code ?? "",
      };
      try {
        const response = (await dispatch(
          PaymentRate(body),
        ).unwrap()) as RateResponse;
        const rate = response?.rate ?? 0;
        setRate(rate.toString());
        setExchangeFee("5");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Invalid credentials";
        toast.error(errorMessage);
      } finally {
        setRateLoading(false);
      }
    }
  };

  useEffect(() => {
    if (baseAmount && rate) {
      const baseAmountNumber = parseFloat(baseAmount.replace(/,/g, ""));
      const rateNumber = parseFloat(rate);
      const exchangeFeeNumber = parseFloat(exchangeFee);

      const calculatedPairAmount =
        baseAmountNumber * rateNumber - exchangeFeeNumber;
      setPairAmount(calculatedPairAmount.toLocaleString());
    }
  }, [baseAmount, rate, exchangeFee]);

  const handleBaseAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;

    value = value.replace(/[^\d.,]/g, "");

    value = value.replace(/^0+/, "");

    value = value.replace(/,/g, "");

    const [wholePart, fractionalPart] = value.split(/[.,]/);

    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    value = fractionalPart
      ? `${formattedWholePart}.${fractionalPart}`
      : formattedWholePart;

    setBaseAmount(value);
  };

  const pairToAmount = async (): Promise<boolean> => {
    let body = {
      baseCurrency: baseCurrency?.code ?? "",
      baseAmount: parseFloat(baseAmount.replace(/,/g, "")),
      pairCurrency: pairCurrency?.code ?? "",
      pairAmount: parseFloat(pairAmount),
      exchangeFee: parseFloat(exchangeFee),
      rate: parseFloat(rate),
    };

    try {
      const response = (await dispatch(
        PeerToPeer(body),
      ).unwrap()) as PeerToPeerResponse;

      setRedirectUrl(response?.data?.redirectUrl);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
      return false;
    }
  };

  const pairToAmountDiscounted = async (): Promise<boolean> => {
    let body = {
      baseCurrency: baseCurrency?.code ?? "",
      baseAmount: parseFloat(baseAmount.replace(/,/g, "")),
      pairCurrency: pairCurrency?.code ?? "",
      pairAmount: parseFloat(baseAmount.replace(/,/g, "")) * parseFloat(rate),
      exchangeFee: 0,
      rate: parseFloat(rate),
    };

    try {
      const response = (await dispatch(
        PeerToPeer(body),
      ).unwrap()) as PeerToPeerResponse;

      setRedirectUrl(response.data.redirectUrl);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
      return false;
    }
  };

  const clearFields = () => {
    setBaseCurrency(null);
    setPairCurrency(null);
    setBaseAmount("");
    setPairAmount("");
    setRate("");
    setExchangeFee("5");
    setRedirectUrl("");
    closeModal();
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
            <div className="mt-[2em]">
              <h1 className="font-br-semibold text-textp">You Send</h1>

              <div className="xs:flex-col mt-[2em] flex flex-col gap-[2em] sm:flex-col md:flex-row lg:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="currency"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Currency
                  </label>
                  <div className="relative mt-[1em]">
                    <button
                      className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left text-textp"
                      onClick={() => setIsBaseDropdownOpen(!isBaseDropdownOpen)}
                      disabled={currencyLoading}
                    >
                      {currencyLoading ? (
                        <div className="flex items-center justify-start">
                          <ReactLoading
                            type="spin"
                            color="#FFFFFF"
                            height={20}
                            width={20}
                          />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : (
                        baseCurrency?.name || "Select base currency"
                      )}
                    </button>
                    {isBaseDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] border-border bg-inherit bg-input"
                      >
                        {currencyList?.data?.map((currency: any) => (
                          <div
                            key={currency?.code}
                            className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
                            onClick={() => handleBaseCurrencySelect(currency)}
                          >
                            {currency?.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="amount"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Amount
                  </label>
                  <div className="relative mt-[1em] flex w-full items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                      {baseCurrency?.code}
                    </span>
                    <input
                      name="amount"
                      id="amount"
                      type="text"
                      value={baseAmount}
                      onChange={handleBaseAmountChange}
                      className="flex-1 rounded-lg border-[2px] border-border bg-inherit bg-input p-3 pl-10 focus:border-border focus:bg-inherit focus:outline-none"
                      style={{ textAlign: "right" }}
                    />
                  </div>
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
                  <div className="relative mt-[1em]">
                    <button
                      type="button"
                      name="peerCurrency"
                      disabled={currencyLoading}
                      className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left text-textp"
                      onClick={() => setisPairDropdownOpen(!isPairDropdownOpen)}
                    >
                      {currencyLoading ? (
                        <div className="flex items-center justify-start">
                          <ReactLoading
                            type="spin"
                            color="#FFFFFF"
                            height={20}
                            width={20}
                          />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : (
                        pairCurrency?.name || "Select pair currency"
                      )}
                    </button>
                    {isPairDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] bg-inherit bg-input"
                      >
                        {currencyList?.data?.map((currency: any) => (
                          <div
                            key={currency?.code}
                            className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
                            onClick={() => handlePeerCurrencySelect(currency)}
                          >
                            {currency?.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="amount"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Amount
                  </label>
                  <div className="relative mt-[1em] flex w-full items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                      {pairCurrency?.code}
                    </span>
                    <input
                      type="text"
                      name="amount"
                      value={pairAmount}
                      disabled
                      className="flex-1 rounded-lg border-[2px] border-border bg-inherit bg-input p-3 pl-10"
                      style={{ textAlign: "right" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[1.5em] flex flex-col gap-4 lg:flex-row">
                <p>
                  {baseCurrency?.code} / {pairCurrency?.code}
                </p>

                <div>
                  <div className="flex items-center gap-3">
                    <p>Rate:</p>
                    {rateLoading ? (
                      <ReactLoading
                        type="spin"
                        color="#FFFFFF"
                        height={20}
                        width={20}
                      />
                    ) : (
                      <p className="font-br-semibold">{rate}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <p>Exchange Fee:</p>
                  <p className="font-br-semibold">{exchangeFee} USD</p>
                </div>
              </div>
              <div className="flex justify-center sm:mt-[2em] lg:mt-[7em]">
                <button.PrimaryButton
                  type="button"
                  className={`w-full lg:w-[80%] ${
                    !baseCurrency || !pairCurrency || !baseAmount.trim()
                      ? "bg- disabledPrimary cursor-not-allowed text-gray-400"
                      : "text-text"
                  }`}
                  onClick={openModal}
                  disabled={
                    !baseCurrency || !pairCurrency || !baseAmount.trim()
                  }
                >
                  {loading ? (
                    <ReactLoading
                      color="#FFFFFF"
                      width={25}
                      height={25}
                      type="spin"
                    />
                  ) : (
                    "Continue"
                  )}
                </button.PrimaryButton>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className="mt-[1.5em] flex flex-col items-center justify-center">
                <header>
                  <h1 className="mb-4 font-br-bold text-2xl tracking-wider text-text lg:text-3xl">
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
                      Amount to pay
                    </label>
                    <div className="relative mt-[1em] flex w-full items-center">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl font-bold text-gray-500">
                        {baseCurrency?.code}
                      </span>
                      <input
                        name="amount"
                        id="amount"
                        type="text"
                        disabled
                        value={baseAmount}
                        className="flex-1 rounded-lg border-[2px] border-side bg-inherit bg-input p-3 pl-10 text-xl font-semibold text-text"
                        style={{ textAlign: "right" }}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-[1em] w-full">
                    <label
                      htmlFor="amount"
                      className="flex-start flex font-br-semibold text-xs  text-textp"
                    >
                      Amount to Receive
                    </label>
                    <div className="relative mt-[1em] flex w-full items-center">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-br-semibold text-xl text-gray-500">
                        {pairCurrency?.code}
                      </span>
                      <input
                        type="text"
                        name="amount"
                        value={pairAmount}
                        disabled
                        className="flex-1 rounded-lg border-[2px] border-side bg-inherit bg-input p-3 pl-10 text-xl font-semibold text-text"
                        style={{ textAlign: "right" }}
                      />
                    </div>
                  </div>
                  <div className="mt-[1.5em] flex gap-1">
                    <img src={exclamation} alt="information" />
                    <p className="text-sm text-text">
                      Please note that you will be charged an exchange fee after
                      invoice has been received.
                    </p>
                  </div>
                </div>

                <a href={redirectUrl} target="blank">
                  <button onClick={clearFields}>
                    <div className="mt-[1.5em] w-[35em] rounded-md bg-primary px-4 py-3 text-center font-br-semibold text-text lg:mt-[4em] ">
                      Make Payment
                    </div>
                  </button>
                </a>
                <section className="mt-[1.3em]">
                  <p className="gradient-text font-br-semibold">
                    <a href={redirectUrl} target="blank">
                      Get A Discounted offer
                    </a>
                  </p>
                </section>
              </div>
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
};

export default Peer;
