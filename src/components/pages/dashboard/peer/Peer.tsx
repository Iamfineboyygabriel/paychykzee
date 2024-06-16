// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetCurrencies } from "../../../../shared/redux/slices/transaction.slices";
// import { toast } from "react-toastify";
// import { setMessage } from "../../../../shared/redux/slices/message.slices";
// import Modal from "../../../../shared/modal/Modal";
// import spin from "../../../../assets/svg/spin.svg";
// import exclamation from "../../../../assets/svg/exclamation.svg";
// import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// import { button } from "../../../../shared/button/button";
// import {
//   PaymentRate,
//   PeerToPeer,
// } from "../../../../shared/redux/slices/landing.slices";

// interface Currency {
//   name: string;
//   code: string;
// }

// interface RateResponse {
//   rate: number;
//   exchangeFee: number;
// }

// const Peer = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBaseDropdownOpen, setIsBaseDropdownOpen] = useState(false);
//   const [isPairDropdownOpen, setisPairDropdownOpen] = useState(false);

//   const [baseCurrency, setBaseCurrency] = useState<Currency | null>(null);
//   const [pairCurrency, setPairCurrency] = useState<Currency | null>(null);
//   const [baseAmount, setBaseAmount] = useState("");
//   const [pairAmount, setPairAmount] = useState("");
//   const [rate, setRate] = useState("");
//   const [exchangeFee, setExchangeFee] = useState("5");

//   const handleAmountChange = (event: any) => {
//     let value = event.target.value;
//     value = value.replace(/[^\d.]/g, "").replace(/^0+/, "");

//     const [wholePart, fractionalPart] = value.split(".");

//     value = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     value = fractionalPart ? `${value}.${fractionalPart}` : value;

//     setBaseAmount(value);
//   };

//   const dropdownRef = useRef(null);

//   const dispatch =
//     useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
//   const userToken = sessionStorage.getItem("userData");

//   const currencyList = useSelector(
//     (state: any) => state.transaction.getCurrencies,
//   );

//   const handleBaseCurrencySelect = (currency: any) => {
//     setBaseCurrency(currency);
//     setIsBaseDropdownOpen(false);
//   };
//   const handlePeerCurrencySelect = (currency: any) => {
//     setPairCurrency(currency);
//     setisPairDropdownOpen(false);
//   };

//   useEffect(() => {
//     if (userToken) {
//       dispatch(GetCurrencies())
//         .unwrap()
//         .then(() => {})
//         .catch((error: { message: any }) => {
//           const errorMessage = error.message;
//           dispatch(setMessage(errorMessage));
//           toast.error(errorMessage);
//         });
//     } else {
//       dispatch(setMessage("Token not found"));
//       toast.error("Token not found");
//     }

//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !(dropdownRef.current as Node).contains(event.target as Node)
//       ) {
//         setIsBaseDropdownOpen(false);
//       }
//     };

//     window.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dispatch, userToken]);

//   useEffect(() => {
//     if (baseCurrency && pairCurrency) {
//       GetRate();
//     }
//   }, [baseCurrency, pairCurrency]);

//   useEffect(() => {
//     if (baseAmount && rate) {
//       const baseAmountNumber = parseFloat(baseAmount.replace(/,/g, ""));
//       const rateNumber = parseFloat(rate);
//       const exchangeFeeNumber = parseFloat(exchangeFee);

//       const calculatedPairAmount =
//         baseAmountNumber * rateNumber - exchangeFeeNumber;
//       setPairAmount(calculatedPairAmount.toFixed(2));
//     }
//   }, [baseAmount, rate, exchangeFee]);

//   const openModal = async () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = async () => {
//     setIsModalOpen(false);
//   };

//   const GetRate = async () => {
//     if (baseCurrency && pairCurrency) {
//       let body = {
//         baseCurrency: baseCurrency?.code ?? "",
//         pairCurrency: pairCurrency?.code ?? "",
//       };
//       try {
//         const response = (await dispatch(
//           PaymentRate(body),
//         ).unwrap()) as RateResponse;
//         const rate = response?.rate ?? 0;
//         const exchangeFee = response?.exchangeFee ?? 0;
//         setRate(rate.toString());
//         setExchangeFee("5");
//       } catch (error: any) {
//         console.log(error);
//         const errorMessage =
//           error.response?.data?.message || "Invalid credentials";
//         toast.error(errorMessage);
//       }
//     }
//   };

//   const handleBaseAmountChange = (event: any) => {
//     setBaseAmount(event.target.value);
//   };

//   const pairToAmount = async (event: any) => {
//     event.preventDefault();
//     let body = {
//       baseCurrency: baseCurrency?.code ?? "",
//       baseAmount: parseFloat(baseAmount.replace(/,/g, "")),
//       pairCurrency: pairCurrency?.code ?? "",
//       pairAmount: parseFloat(pairAmount),
//       exchangeFee: parseFloat(exchangeFee),
//       rate: parseFloat(rate),
//     };
//     try {
//       const response = await dispatch(PeerToPeer(body));
//       console.log("Response:", response);
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Invalid credentials";
//       toast.error(errorMessage);
//     }
//     pairToAmount(event);
//   };

//   return (
//     <>
//       <main className="font-br-regular">
//         <header>
//           <h1 className="font-br-semibold text-xl lg:text-2xl">
//             Peer to Peer currency exchange
//           </h1>
//         </header>
//         <section className="h-[calc(100vh - 4em)] m-auto mt-[1em] rounded-lg bg-dashboard px-[1.5em] py-[2em] lg:px-[3em]">
//           <h1 className="text-2xl">Send Money</h1>
//           <div className="mt-[2em] h-auto lg:mt-[3em] lg:w-[80%]">
//             <form action="submit" className="mt-[2em]">
//               <h1 className="font-br-semibold text-textp">You Send</h1>

//               <div className="xs:flex-col mt-[2em] flex flex-col gap-[2em] sm:flex-col md:flex-row lg:flex-row">
//                 <div className="w-full">
//                   <label
//                     htmlFor="currency"
//                     className="flex-start flex font-br-semibold text-xs text-textp"
//                   >
//                     {" "}
//                     Currency{" "}
//                   </label>
//                   <div className="relative mt-[1em]">
//                     <button
//                       type="button"
//                       name="BaseCurrency"
//                       className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left"
//                       onClick={() => setIsBaseDropdownOpen(!isBaseDropdownOpen)}
//                     >
//                       {baseCurrency ? baseCurrency.name : "Select a currency"}
//                     </button>
//                     {isBaseDropdownOpen && (
//                       <div
//                         ref={dropdownRef}
//                         className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] border-border bg-inherit bg-input"
//                       >
//                         {currencyList.data.map((currency: any) => (
//                           <div
//                             key={currency.code}
//                             className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
//                             onClick={() => handleBaseCurrencySelect(currency)}
//                           >
//                             {currency.name}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="w-full">
//                   <label
//                     htmlFor="country"
//                     className="flex-start flex font-br-semibold text-xs text-textp"
//                   >
//                     Amount
//                   </label>
//                   <input
//                     type="text"
//                     value={baseAmount}
//                     onChange={handleBaseAmountChange}
//                     className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3"
//                   />
//                 </div>
//               </div>

//               <div className="mt-[1em] flex justify-center">
//                 <img src={spin} alt="spin" />
//               </div>

//               <h1 className="font-br-semibold text-textp">You Receive</h1>

//               <div className="xs:flex-col mt-[2em] flex flex-col gap-[2em] sm:flex-col md:flex-row lg:flex-row">
//                 <div className="w-full">
//                   <label
//                     htmlFor="currency"
//                     className="flex-start flex font-br-semibold text-xs text-textp"
//                   >
//                     Currency
//                   </label>
//                   <div className="relative mt-[1em]">
//                     <button
//                       type="button"
//                       name="peerCurrency"
//                       className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left"
//                       onClick={() => setisPairDropdownOpen(!isPairDropdownOpen)}
//                     >
//                       {pairCurrency ? pairCurrency.name : "Select a currency"}
//                     </button>
//                     {isPairDropdownOpen && (
//                       <div
//                         ref={dropdownRef}
//                         className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] bg-inherit bg-input"
//                       >
//                         {currencyList.data.map((currency: any) => (
//                           <div
//                             key={currency.code}
//                             className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
//                             onClick={() => handlePeerCurrencySelect(currency)}
//                           >
//                             {currency.name}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="w-full">
//                   <label
//                     htmlFor="amount"
//                     className="flex-start flex font-br-semibold text-xs text-textp"
//                   >
//                     Amount
//                   </label>
//                   <input
//                     name="amount"
//                     id="amount"
//                     type="text"
//                     value={pairAmount}
//                     disabled // Make this input disabled
//                     className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
//                   />
//                 </div>
//               </div>
//               <div className="mt-[1.5em] flex flex-col gap-4 lg:flex-row">
//                 <p>
//                   {baseCurrency?.code} / {pairCurrency?.code}
//                 </p>
//                 <div className="flex gap-3">
//                   <p>Rate:</p>
//                   <p className="font-br-semibold">{rate}</p>
//                 </div>
//                 <div className="flex gap-3">
//                   <p>Exchange Fee:</p>
//                   <p className="font-br-semibold">{exchangeFee} USD</p>
//                 </div>
//               </div>
//             </form>
//             <div className="flex justify-center sm:mt-[2em] lg:mt-[7em]">
//               <button.PrimaryButton
//                 className=" w-full lg:w-[80%]"
//                 onClick={openModal}
//               >
//                 Continue
//               </button.PrimaryButton>
//             </div>
//           </div>
//         </section>
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <div className="mt-[1.5em] flex flex-col items-center justify-center">
//             <header>
//               <h1 className="mb-4 font-br-semibold text-2xl text-text lg:text-3xl">
//                 Confirm Transaction
//               </h1>
//             </header>
//             <p className="mb-4 text-center text-textp">
//               Please confirm your transaction before you proceed
//             </p>

//             <div className="lg:mt-[1.5em] lg:w-[57%]">
//               <div className="w-full">
//                 <label
//                   htmlFor="paymentFor"
//                   className="flex-start flex font-br-semibold text-xs text-textp"
//                 >
//                   Payment for
//                 </label>
//                 <input
//                   name="paymentFor"
//                   id="paymentFor"
//                   type="text"
//                   className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
//                 />
//               </div>

//               <div className="mt-[1.5em] w-full">
//                 <label
//                   htmlFor="amountToReceive"
//                   className="flex-start flex font-br-semibold text-xs text-textp"
//                 >
//                   Amount to receive
//                 </label>
//                 <input
//                   name="amountToReceive"
//                   id="amountToReceive"
//                   type="text"
//                   className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
//                 />
//               </div>
//               <div className="mt-[1.5em] flex gap-1">
//                 <img src={exclamation} alt="information" />
//                 <p className="text-sm text-text">
//                   Please note that you will be charged an exchange fee after
//                   invoice has been received.
//                 </p>
//               </div>
//             </div>
//             <button.PrimaryButton
//               onClick={closeModal}
//               className="mt-[1.5em] w-full text-text lg:mt-[4em] lg:w-[75%]"
//             >
//               Make Payment
//             </button.PrimaryButton>
//             <section className="mt-[1.3em]">
//               <p className="gradient-text font-br-semibold">
//                 Get A Discounted offer
//               </p>
//             </section>
//           </div>
//         </Modal>
//       </main>
//     </>
//   );
// };

// export default Peer;
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrencies } from "../../../../shared/redux/slices/transaction.slices";
import { toast } from "react-toastify";
import { setMessage } from "../../../../shared/redux/slices/message.slices";
import Modal from "../../../../shared/modal/Modal";
import spin from "../../../../assets/svg/spin.svg";
import exclamation from "../../../../assets/svg/exclamation.svg";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { button } from "../../../../shared/button/button";
import {
  PaymentRate,
  PeerToPeer,
} from "../../../../shared/redux/slices/landing.slices";

interface Currency {
  name: string;
  code: string;
}

interface RateResponse {
  rate: number;
  exchangeFee: number;
}

const Peer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBaseDropdownOpen, setIsBaseDropdownOpen] = useState(false);
  const [isPairDropdownOpen, setisPairDropdownOpen] = useState(false);

  const [baseCurrency, setBaseCurrency] = useState<Currency | null>(null);
  const [pairCurrency, setPairCurrency] = useState<Currency | null>(null);
  const [baseAmount, setBaseAmount] = useState("");
  const [pairAmount, setPairAmount] = useState("");
  const [rate, setRate] = useState("");
  const [exchangeFee, setExchangeFee] = useState("20"); // Fixed exchange fee of 20

  const handleAmountChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, "").replace(/^0+/, "");

    const [wholePart, fractionalPart] = value.split(".");

    value = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    value = fractionalPart ? `${value}.${fractionalPart}` : value;

    setBaseAmount(value);
  };

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
      dispatch(GetCurrencies())
        .unwrap()
        .then(() => {})
        .catch((error: { message: any }) => {
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

  useEffect(() => {
    if (baseAmount && rate) {
      const baseAmountNumber = parseFloat(baseAmount.replace(/,/g, ""));
      const rateNumber = parseFloat(rate);
      const exchangeFeeNumber = parseFloat(exchangeFee);

      const calculatedPairAmount =
        baseAmountNumber * rateNumber - exchangeFeeNumber;
      setPairAmount(calculatedPairAmount.toFixed(2));
    }
  }, [baseAmount, rate, exchangeFee]);

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };

  const GetRate = async () => {
    if (baseCurrency && pairCurrency) {
      let body = {
        baseCurrency: baseCurrency?.code ?? "",
        pairCurrency: pairCurrency?.code ?? "",
      };
      try {
        const response = (await dispatch(
          PaymentRate(body),
        ).unwrap()) as RateResponse;
        const rate = response?.rate ?? 0;
        const exchangeFee = response?.exchangeFee ?? 0;
        setRate(rate.toString());
        setExchangeFee("20"); // Fixed exchange fee of 20
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message || "Invalid credentials";
        toast.error(errorMessage);
      }
    }
  };

  const handleBaseAmountChange = (event: any) => {
    setBaseAmount(event.target.value);
  };

  const pairToAmount = async () => {
    let body = {
      baseCurrency: baseCurrency?.code ?? "",
      baseAmount: parseFloat(baseAmount.replace(/,/g, "")),
      pairCurrency: pairCurrency?.code ?? "",
      pairAmount: parseFloat(pairAmount),
      exchangeFee: parseFloat(exchangeFee),
      rate: parseFloat(rate),
    };
    try {
      const response = await dispatch(PeerToPeer(body));
      console.log("Response:", response);
      // You can handle the response or close the modal if needed
      closeModal();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    }
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
                    {" "}
                    Currency{" "}
                  </label>
                  <div className="relative mt-[1em]">
                    <button
                      type="button"
                      name="BaseCurrency"
                      className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left"
                      onClick={() => setIsBaseDropdownOpen(!isBaseDropdownOpen)}
                    >
                      {baseCurrency ? baseCurrency.name : "Select a currency"}
                    </button>
                    {isBaseDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] border-border bg-inherit bg-input"
                      >
                        {currencyList.data.map((currency: any) => (
                          <div
                            key={currency.code}
                            className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
                            onClick={() => handleBaseCurrencySelect(currency)}
                          >
                            {currency.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="country"
                    className="flex-start flex font-br-semibold text-xs text-textp"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    value={baseAmount}
                    onChange={handleBaseAmountChange}
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
                  <div className="relative mt-[1em]">
                    <button
                      type="button"
                      name="peerCurrency"
                      className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left"
                      onClick={() => setisPairDropdownOpen(!isPairDropdownOpen)}
                    >
                      {pairCurrency ? pairCurrency.name : "Select a currency"}
                    </button>
                    {isPairDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] bg-inherit bg-input"
                      >
                        {currencyList.data.map((currency: any) => (
                          <div
                            key={currency.code}
                            className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
                            onClick={() => handlePeerCurrencySelect(currency)}
                          >
                            {currency.name}
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
                  <input
                    name="amount"
                    id="amount"
                    type="text"
                    value={pairAmount}
                    disabled // Make this input disabled
                    className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                  />
                </div>
              </div>
              <div className="mt-[1.5em] flex flex-col gap-4 lg:flex-row">
                <p>
                  {baseCurrency?.code} / {pairCurrency?.code}
                </p>
                <div className="flex gap-3">
                  <p>Rate:</p>
                  <p className="font-br-semibold">{rate}</p>
                </div>
                <div className="flex gap-3">
                  <p>Exchange Fee:</p>
                  <p className="font-br-semibold">{exchangeFee} USD</p>
                </div>
              </div>
              <div className="flex justify-center sm:mt-[2em] lg:mt-[7em]">
                <button.PrimaryButton
                  type="button"
                  className="w-full lg:w-[80%]"
                  onClick={openModal}
                >
                  Continue
                </button.PrimaryButton>
              </div>
            </div>
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
                      htmlFor="paymentFor"
                      className="flex-start flex font-br-semibold text-xs text-textp"
                    >
                      Payment for
                    </label>
                    <input
                      name="paymentFor"
                      id="paymentFor"
                      type="text"
                      className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                    />
                  </div>

                  <div className="mt-[1.5em] w-full">
                    <label
                      htmlFor="amountToReceive"
                      className="flex-start flex font-br-semibold text-xs text-textp"
                    >
                      Amount to receive
                    </label>
                    <input
                      name="amountToReceive"
                      id="amountToReceive"
                      type="text"
                      className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                      value={pairAmount}
                      readOnly
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
                  type="button"
                  onClick={pairToAmount}
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
          </div>
        </section>
      </main>
    </>
  );
};

export default Peer;
