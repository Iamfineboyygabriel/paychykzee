import React, { useEffect, useRef, useState } from "react";
import { countries as countryData } from "country-data";
import Flag from "react-world-flags";
import useCloudinaryImageUpload from "../../../../shared/redux/hooks/useCloudinaryImageUpload";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrencies } from "../../../../shared/redux/slices/transaction.slices";
import { setMessage } from "../../../../shared/redux/slices/message.slices";
import { Bill } from "../../../../shared/redux/slices/landing.slices";
import { button } from "../../../../shared/button/button";
import Modal from "../../../../shared/modal/Modal";
import dot from "../../../../assets/svg/dot.svg";
import exclamation from "../../../../assets/svg/exclamation.svg";
import document from "../../../../assets/svg/document-successfull.svg";
import upload from "../../../../assets/svg/upload.svg";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

interface Country {
  name: string;
  code: string;
}

interface File {
  secure_url: string;
  name: string;
  size: number;
}

interface Currency {
  name: string;
  code: string;
}

interface Billp {
  status: number;
  message: string;
  data: {
    redirectUrl: string;
  };
}
interface UploadedFile {
  secure_url: string;
  name: string;
  size: number;
}

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
  setInvoiceDocument: (url: string) => void;
  reset: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileChange,
  setInvoiceDocument,
  reset,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const documentDoc = useRef<HTMLInputElement>(null);
  const [uploadImageToCloudinary] = useCloudinaryImageUpload();
  const [isLoading, setIsLoading] = useState(false);

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
    const uploadedFiles = Array.from(e.dataTransfer.files) as unknown as File[];
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        setIsLoading(true);
        const cloudinaryResponse = await uploadImageToCloudinary(
          uploadedFiles[0],
        );
        onFileChange(
          uploadedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            secure_url: cloudinaryResponse,
          })),
        );
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []) as unknown as File[];
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      try {
        setIsLoading(true);
        const cloudinaryResponses = await Promise.all(
          uploadedFiles.map((file) => uploadImageToCloudinary(file)),
        );
        const uploadedFilesWithUrl = uploadedFiles.map((file, index) => ({
          name: file.name,
          size: file.size,
          secure_url: cloudinaryResponses[index],
        }));
        onFileChange(uploadedFilesWithUrl);
        setInvoiceDocument(uploadedFilesWithUrl[0].secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClickDoc = () => {
    documentDoc.current?.click();
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

  const formatFileSize = (size: number) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${
      ["B", "kB", "MB", "GB", "TB"][i]
    }`;
  };

  useEffect(() => {
    if (reset && documentDoc.current) {
      documentDoc.current.value = "";
      setFiles([]);
    }
  }, [reset]);

  return (
    <div className="w-full lg:w-1/2">
      <label htmlFor="invoice" className="font-br-semibold text-xs text-textp">
        Invoice Document
      </label>
      <div
        className={`mt-[1em] flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-9 ${
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
          <button.PrimaryButton className="bg-primary">
            Browse file
          </button.PrimaryButton>
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
      {isLoading && (
        <ReactLoading type="spin" height={20} width={20} color="white" />
      )}
    </div>
  );
};

const BillPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyDropdown, setIsCurrencyDropdown] = useState(false);
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [uploadedFileNames, setUploadedFileNames] = useState<UploadedFile[]>(
    [],
  );

  const [description, setDescription] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentInstruction, setPaymentInstruction] = useState("");
  const [invoiceDocument, setInvoiceDocument] = useState("");

  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [resetFileInput, setResetFileInput] = useState<boolean>(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Node).contains(event.target as Node)
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
    setCountry(country);
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

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setUploadedFileNames(files);
      setInvoiceDocument(files[0].secure_url);
    } else {
      setUploadedFileNames([]);
      setInvoiceDocument("");
    }
  };

  const BillPayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    let body = {
      description: description,
      country: country?.name ?? "",
      currency: currency?.code ?? "",
      amount: parseFloat(amount.replace(/,/g, "")),
      paymentInstruction,
      invoiceDocument: invoiceDocument,
    };

    try {
      const response = (await dispatch(Bill(body)).unwrap()) as Billp;

      setRedirectUrl(response.data.redirectUrl);
      openModal();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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

  const formatFileSize = (size: number) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${["B", "kB", "MB", "GB", "TB"][i]}`;
  };

  const isFormIncomplete =
    !description ||
    !country ||
    !currency ||
    !amount ||
    !paymentInstruction ||
    uploadedFileNames.length === 0;

  const clearFields = () => {
    setDescription("");
    setCountry(null);
    setCurrency(null);
    setAmount("");
    setPaymentInstruction("");
    setUploadedFileNames([]);
    setInvoiceDocument("");
    clearFileInput();
  };

  const clearFileInput = () => {
    setUploadedFileNames([]);
    setInvoiceDocument("");
    setResetFileInput(true);
    setTimeout(() => setResetFileInput(false), 0);
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    {country ? (
                      <div className="flex items-center">
                        <Flag
                          code={country.code}
                          key={country.code}
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "8px",
                          }}
                        />
                        {country.name}
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
                          onClick={() => handleCountrySelect(country)}
                          className="flex cursor-pointer items-center p-2 hover:bg-purpleblack"
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
              <FileUploader
                onFileChange={handleFileChange}
                reset={resetFileInput}
                setInvoiceDocument={setInvoiceDocument}
              />
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="instruction"
                  className="font-br-semibold text-xs text-textp"
                >
                  Payment Instruction
                </label>
                <textarea
                  name="instruction"
                  value={paymentInstruction}
                  onChange={(e) => setPaymentInstruction(e.target.value)}
                  id="instruction"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3"
                  rows={9}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <button.PrimaryButton
              className={`mt-[1em] w-full lg:w-[80%] ${isFormIncomplete ? "cursor-not-allowed bg-disabledPrimary text-gray-500" : "bg-primary text-white"}`}
              onClick={BillPayment}
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
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="mt-[1.5em]  flex flex-col items-center justify-center text-text">
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
                value={description}
                readOnly
                name="amount"
                id="amount"
                type="text"
                disabled
                className="mt-[1em] w-full flex-1 rounded-lg border-[2px] border-side bg-inherit bg-input p-3 text-xl font-semibold text-textp"
              />
            </div>

            <div className="mt-[1.5em] w-full">
              <label
                htmlFor="amount"
                className="flex-start flex font-br-semibold text-xs text-textp"
              >
                Amount to receive
              </label>
              <div className="w-ful text-textl relative mt-[1em]  flex items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                  {currency?.code}
                </span>
                <input
                  name="amount"
                  id="amount"
                  readOnly
                  type="text"
                  value={amount}
                  className="flex-1 rounded-lg border-[2px] border-side bg-inherit  bg-input  p-3 pl-10 font-br-semibold focus:border-side focus:bg-inherit focus:outline-none"
                  style={{ textAlign: "right" }}
                />
              </div>
            </div>

            <div className="flex gap-1">
              {uploadedFileNames.length > 0 && (
                <div>
                  <ul className="mt-2 list-inside list-disc">
                    {uploadedFileNames.map((file, index) => (
                      <div
                        key={index}
                        className="mt-2 flex items-start gap-3 p-2"
                      >
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
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-[1em] flex gap-1">
              <img src={exclamation} alt="information" />
              <p className="text-sm text-text">
                Please note that you will be charged an exchange fee after
                invoice has been received.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              clearFields();
              window.open(redirectUrl, "_blank");
            }}
          >
            <div className="mt-[1.5em] w-[35em] rounded-md bg-primary px-4 py-3 text-center font-br-semibold text-text lg:mt-[4em] ">
              Make Payment
            </div>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BillPayment;
