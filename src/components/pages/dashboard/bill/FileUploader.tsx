import React, { useEffect, useRef, useState } from "react";
import useCloudinaryImageUpload from "../../../../shared/redux/hooks/useCloudinaryImageUpload";
import { button } from "../../../../shared/button/button";
import dot from "../../../../assets/svg/dot.svg";
import upload from "../../../../assets/svg/upload.svg";
import ReactLoading from "react-loading";
import document from "../../../../assets/svg/document-successfull.svg";

interface File {
  secure_url: string;
  name: string;
  size: number;
}

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
  setInvoiceDocument: (url: string) => void;
  reset: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
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
        console.error("Error uploading file:", error);
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
              {isLoading ? (
                <ReactLoading
                  type="spin"
                  height={20}
                  width={20}
                  color="white"
                />
              ) : (
                <img src={document} alt="document" />
              )}
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
