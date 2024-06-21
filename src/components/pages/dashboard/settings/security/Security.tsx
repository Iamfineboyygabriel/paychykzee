import React, { useState, useEffect } from "react";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { Update_Password } from "../../../../../shared/redux/slices/landing.slices";
import ReactLoading from "react-loading";
import { button } from "../../../../../shared/button/button";
import Modal from "../../../../../shared/modal/Modal";
import image from "../../../../../assets/svg/success.svg";

interface SecurityProps {
  emailInputProps?: {
    type?: "email";
    value?: string;
    className?: string;
  };
  passwordInputProps?: {
    type?: "password";
    value?: string;
    className?: string;
  };
  passwordType?: "password" | "text";
}

const Security: React.FC<SecurityProps> = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const togglePasswordVisibility = () => {
    setNewPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const dispatch: AppDispatch = useDispatch();

  const UpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    let body = {
      newPassword,
      oldPassword,
    };
    const response: any = await dispatch(Update_Password(body)).unwrap();
    if (response.status !== 200) {
      setLoading(false);
      toast.error(response?.message);
      setLoading(false);
      return;
    }
    console.log("Response:", response);
    openModal();
    setOldPassword("");
    setNewPassword("");
    setConfirmPasswordValue("");
  };

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPasswordValue);
  }, [newPassword, confirmPasswordValue]);

  return (
    <main className="font-br-regular lg:px-[3em]">
      <div className="text-center">
        <header>
          <h1 className="font-br-semibold text-xl">Change Password</h1>
        </header>
        <form
          onSubmit={UpdatePassword}
          className="mt-[1.5em] w-full text-logintext"
        >
          <div className="m-auto mt-[1em] flex flex-col gap-3 lg:w-[50%] ">
            <div className="w-full">
              <label
                htmlFor="oldPassword"
                className="flex-start flex font-br-semibold"
              >
                Old Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="oldPassword"
                  id="oldPassword"
                  type={oldPasswordType}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-[1em] flex w-full rounded-lg border-[2px] border-border  bg-inherit p-3 focus:border-focus:outline-none "
                />
                <button
                  type="button"
                  onClick={toggleOldPasswordVisibility}
                  className="absolute right-4 mt-[1em] self-center"
                >
                  {oldPasswordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="newPassword"
                className="flex-start flex font-br-semibold"
              >
                New Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="newPassword"
                  id="newPassword"
                  type={newPasswordType}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 mt-[1em] self-center"
                >
                  {newPasswordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="flex-start flex font-br-semibold"
              >
                Confirm New Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type={confirmPasswordType}
                  value={confirmPasswordValue}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-4 mt-[1em] self-center"
                >
                  {confirmPasswordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button.PrimaryButton
            className="mt-[1.5em] w-full text-text"
            type="submit"
            disabled={!passwordsMatch || loading}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Change Password"
            )}
          </button.PrimaryButton>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center lg:p-[4em]">
          <img src={image} alt="Success" className="mb-4 h-24 w-24" />
          <h1 className="mb-4 space-x-12 font-br-semibold text-3xl text-text">
            Password updated successfully
          </h1>
          <p className="mb-4 text-center text-textp">
            You successfully updated your password
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default Security;
