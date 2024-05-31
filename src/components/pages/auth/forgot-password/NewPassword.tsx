import { useState } from "react";
import { button } from "../../../../shared/button/button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
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

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center text-logintext shadow-lg lg:w-[90%] lg:py-[6em]">
        <header>
          <h1 className="gradient-text font-br-bold text-[2.4em]">
            PayChyKzee
          </h1>
        </header>
        <div className="m-auto mt-[4em] w-[90%] lg:w-[50%]">
          <div className="m-auto w-[80%]">
            <header>
              <h1 className="font-br-semibold text-2xl text-text lg:text-[2.3em]">
                Reset Password?
              </h1>
            </header>
            <p className="mt-[1em] font-br-thin text-sm">
              Reset Your Password to login
            </p>
          </div>
          <div className="mt-[1.5em] flex flex-col gap-3 text-left">
            <label htmlFor="email" className="font-br-semibold text-logintext">
              Password
            </label>
            <div className="relative flex items-center text-center">
              <input
                name="password"
                id="password"
                type={passwordType}
                value={password}
                onChange={handlePasswordChange}
                className="focus:border-gradient w-full rounded-lg border-2 border-border bg-inherit p-2 focus:outline-none"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 flex items-center"
              >
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>
          <div className="mt-[1.5em] flex flex-col gap-3 text-left">
            <label htmlFor="email" className="font-br-semibold text-logintext">
              Confirm Password
            </label>
            <div className="relative flex items-center text-center">
              <input
                name="confirmPassword"
                id="confirmPassword"
                type={confirmPasswordType}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="focus:border-gradient w-full rounded-lg border-2 border-border bg-inherit p-2 focus:outline-none"
              />

              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 flex items-center"
              >
                {passwordType === "password" ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[3em]">
          <button.PrimaryButton className="w-full lg:w-[67%]">
            Continue
          </button.PrimaryButton>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
