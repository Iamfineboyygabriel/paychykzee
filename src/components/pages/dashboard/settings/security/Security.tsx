import React, { useState } from "react";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { button } from "../../../../../shared/button/button";

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
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [oldPasswordType, setOldPasswordType] = useState("password");

  const toggleOldPasswordVisibility = () => {
    setOldPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOldPasswordValue(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPasswordValue(event.target.value);
  };

  return (
    <main className="font-br-regular lg:px-[3em]">
      <div className="text-center">
        <header>
          <h1 className="font-br-semibold text-xl">Change Password</h1>
        </header>
        <form action="login" className="mt-[1.5em] w-full text-logintext">
          <div className="m-auto mt-[1em] flex flex-col gap-3 lg:w-[50%] ">
            <div className="w-full">
              <label
                htmlFor="password"
                className="flex-start flex font-br-semibold"
              >
                Old Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="password"
                  id="password"
                  type={oldPasswordType}
                  value={oldPasswordValue}
                  onChange={handleOldPasswordChange}
                  className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
                />
                <button
                  type="button"
                  onClick={toggleOldPasswordVisibility}
                  className="absolute right-4 mt-[1em] self-center"
                >
                  {passwordType === "password" ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="flex-start flex font-br-semibold"
              >
                Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="password"
                  id="password"
                  type={passwordType}
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 mt-[1em] self-center"
                >
                  {passwordType === "password" ? (
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
                Confirm Password
              </label>
              <div className="relative flex items-center text-center">
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type={confirmPasswordType}
                  value={confirmPasswordValue}
                  onChange={handleConfirmPasswordChange}
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
            <p className="text-side">Forgot Password ?</p>
          </div>
          <button.PrimaryButton className="mt-[1.5em] w-full text-text">
            Change Password
          </button.PrimaryButton>
        </form>
      </div>
    </main>
  );
};

export default Security;
