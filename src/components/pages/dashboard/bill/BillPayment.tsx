import { useEffect, useRef, useState } from "react";
import upload from "../../../../assets/svg/upload.svg";
import dot from "../../../../assets/svg/dot.svg";
import document from "../../../../assets/svg/document-successfull.svg";
import { button } from "../../../../shared/button/button";
import exclamation from "../../../../assets/svg/exclamation.svg";
import Modal from "../../../../shared/modal/Modal";
import { countries as countryData } from "country-data";
import Flag from "react-world-flags";
import useCloudinaryImageUpload from "../../../../shared/redux/hooks/useCloudinaryImageUpload";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrencies } from "../../../../shared/redux/slices/transaction.slices";
import { setMessage } from "../../../../shared/redux/slices/message.slices";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

interface Country {
  name: string;
  code: string;
}

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
}
interface Currency {
  name: string;
  code: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const documentDoc = useRef<HTMLInputElement>(null);
  const [uploadImageToCloudinary] = useCloudinaryImageUpload();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        const imageUrl = await uploadImageToCloudinary(uploadedFiles[0]);
        onFileChange(imageUrl);
      } catch (error) {}
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        const imageUrl = await uploadImageToCloudinary(uploadedFiles[0]);
        onFileChange(imageUrl);
      } catch (error) {}
    }
  };

  const handleClickDoc = () => {
    documentDoc.current?.click();
  };

  const formatFileSize = (size: number) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${["B", "kB", "MB", "GB", "TB"][i]}`;
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="w-full lg:w-1/2">
      <label htmlFor="invoice" className="font-br-semibold text-xs text-textp">
        Invoice Document
      </label>
      <div
        className={`mt-[1em] flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-5 ${
          dragOver ? "bg-purpleblack" : ""
        }`}
        onClick={handleClickDoc}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
          ref={documentDoc}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <img src={upload} alt="upload icon" />
        <div className="flex flex-col items-center gap-3 text-xs lg:px-[3em]">
          <p className="mt-2 text-center leading-5 text-gray-500">
            <span className="mr-1 text-primary">Click to upload</span>
            or drag and drop SVG, PNG, JPG, OR GIF (max 800x 400px)
          </p>
        </div>
        <div className="mt-5">
          <button className="w-full font-br-regular">Browse file</button>
        </div>
      </div>
      <div className="filename mt-2 overflow-auto">
        {files.length > 0 &&
          files.map((file) => (
            <div key={file.name} className="mt-2 flex items-start gap-3 p-2">
              <img src={document} alt="document" />
              <div>
                <p className="font-semibold">{file.name}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-600">
                    {getCurrentDateTime()}
                  </p>
                  <div className="flex items-center gap-2">
                    <img src={dot} alt="dot" />
                    <p className="text-xs text-gray-600">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
const BillPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyDropdown, setIsCurrencyDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [amount, setAmount] = useState("");

  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
  const userToken = sessionStorage.getItem("userData");

  const currencyList = useSelector(
    (state: any) => state.transaction.getCurrencies,
  );
  const countryList: Country[] = countryData.all.map((country: any) => ({
    name: country.name,
    code: country.alpha2,
  }));

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Node).contains(event.target as Node)
      ) {
        setIsCurrencyDropdown(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleBaseCurrencySelect = (currency: Currency) => {
    setCurrency(currency);
    setIsCurrencyDropdown(false);
  };

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
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
  }, [dispatch, userToken]);

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

    setAmount(value);
  };

  return (
    <div className="h-auto overflow-auto font-br-regular">
      <h1 className="font-br-semibold text-2xl">Outsourced Bill Payment</h1>
      <div className="h-[calc(100vh - 4em)] m-auto mt-[1em] overflow-auto rounded-lg bg-dashboard px-[1.5em] py-[2em] lg:px-[3em]">
        <h1 className="text-2xl">Bill Information</h1>
        <div className="mt-[3em] h-auto lg:w-[80%]">
          <form>
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
                <div className="relative mt-[1em]">
                  <button
                    type="button"
                    className="w-full rounded-lg border-[2px] border-border bg-inherit bg-input p-3 text-left"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedCountry ? (
                      <div className="flex items-center">
                        <Flag
                          code={selectedCountry.code}
                          key={selectedCountry.code}
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "8px",
                          }}
                        />
                        {selectedCountry.name}
                      </div>
                    ) : (
                      "Select a country"
                    )}
                  </button>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border-[2px] border-border bg-inherit bg-input"
                    >
                      {countryList.map((country) => (
                        <div
                          key={country.code}
                          className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <Flag
                            code={country.code}
                            style={{
                              width: "32px",
                              height: "32px",
                              marginRight: "8px",
                            }}
                          />
                          {country.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-[2em]">
              <h1 className="font-br-semibold text-xl text-textp">
                Amount to be paid
              </h1>
            </div>

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
                    onClick={() => setIsCurrencyDropdown(!isCurrencyDropdown)}
                    disabled={currencyLoading}
                    type="button"
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
                      currency?.name || "Select base currency"
                    )}
                  </button>
                  {isCurrencyDropdown && (
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
                  htmlFor="amount"
                  className="flex-start flex font-br-semibold text-xs text-textp"
                >
                  Amount
                </label>
                <div className="relative mt-[1em] flex w-full items-center">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                    {currency?.code}
                  </span>
                  <input
                    name="amount"
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={handleBaseAmountChange}
                    className="flex-1 rounded-lg border-[2px] border-border bg-inherit bg-input p-3 pl-10 focus:border-border focus:bg-inherit focus:outline-none"
                    style={{ textAlign: "right" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[2em] flex flex-col gap-[2em] lg:flex-row">
              <FileUploader onFileChange={(files) => console.log(files)} />
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="instruction"
                  className="font-br-semibold text-xs text-textp"
                >
                  Payment Instruction
                </label>
                <textarea
                  name="instruction"
                  id="instruction"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit"
                  rows={9}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <button.PrimaryButton
              className="mt-[1em] w-full lg:w-[80%]"
              onClick={openModal}
            >
              Continue
            </button.PrimaryButton>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="mt-[1.5em] flex flex-col items-center justify-center">
          <h1 className="mb-4 font-br-semibold text-2xl text-text lg:text-3xl">
            Confirm Transaction
          </h1>
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

export default BillPayment;
