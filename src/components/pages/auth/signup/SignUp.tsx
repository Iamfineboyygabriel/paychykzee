import { Link, useNavigate } from "react-router-dom";
import image from "../../../../assets/svg/hand.svg";
import { button } from "../../../../shared/button/button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useEffect, useState } from "react";

interface SignUpProps {
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

const SignUp: React.FC<SignUpProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const Home = () => {
    navigate("/");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-purpleblack py-9 font-br-regular text-text">
      <section className="flex h-full w-[95%] flex-row justify-between gap-5">
        <div className="bg-side flex w-[35%] flex-col items-center rounded-xl sm:hidden lg:flex">
          <header className="mt-[4em] cursor-pointer" onClick={Home}>
            <h1 className="font-br-bold text-4xl">PayChyKzee</h1>
          </header>
          <div className="mt-[1.5em]">
            <p>Create your account with just a few details</p>
          </div>
          <img
            className="mt-[3em] h-auto w-full rounded-xl"
            src={image}
            alt="Money Bag"
          />
        </div>
        <section className="w-full rounded-xl bg-dashboard p-6 lg:w-[65%]">
          <div className="text-center">
            <h2 className="font-br-semibold text-3xl">Create an account</h2>
            <p className="mt-4 font-br-light text-logintext">
              Register with the right details to start using the platform
            </p>
          </div>
          <form action="login" className="mt-[1.5em] w-full text-logintext">
            <div className="flex gap-3">
              <div className="w-full">
                <label htmlFor="firstName" className="flex-start flex">
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="flex-start flex">
                  Last Name
                </label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-2"
                />
              </div>
            </div>

            <div className="mt-[1em] w-full">
              <label htmlFor="email" className="flex-start flex">
                Email Address
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-2"
              />
            </div>

            <div className="mt-[1em] flex gap-3">
              <div className="w-full">
                <label htmlFor="firstName" className="flex-start flex">
                  Country
                </label>
                <input
                  name="country"
                  id="country"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-2"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="flex-start flex">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="number"
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-2"
                />
              </div>
            </div>

            <div className="mt-[1em] flex gap-3">
              <div className="w-full">
                <label htmlFor="firstName" className="flex-start flex">
                  Password
                </label>
                <div className="relative flex items-center text-center">
                  <input
                    name="password"
                    id="password"
                    type={passwordType}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    className="mt-[1em] flex w-full  rounded-lg border-[2px] border-border bg-inherit p-2 "
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
                <label htmlFor="lastName" className="flex-start flex">
                  Confirm Password
                </label>
                <div className="relative flex items-center text-center">
                  <input
                    name="password"
                    id="password"
                    type={passwordType}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    className="mt-[1em] flex w-full  rounded-lg border-[2px] border-border bg-inherit p-2 "
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
            </div>
          </form>
          <div className="mt-[4em] text-center">
            <button.PrimaryButton className="w-[70%]">
              Create account
            </button.PrimaryButton>
          </div>
          <section className="mt-[1.5em] items-center text-center ">
            <p className="font-br-light">
              Already have an account?
              <span className="ml-2 font-br-semibold text-primary">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </section>
        </section>
      </section>
    </main>
  );
};

export default SignUp;
