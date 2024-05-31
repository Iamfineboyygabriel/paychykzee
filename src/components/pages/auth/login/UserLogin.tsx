import { useEffect, useState } from "react";
import image from "../../../../assets/png/hands-money.png";
import { button } from "../../../../shared/button/button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface UserLoginProps {
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

const UserLogin: React.FC<UserLoginProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password",
    );
  };
  const Home = () => {
    navigate("/");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-purpleblack py-9 font-br-regular text-text">
      <section className="flex h-full w-[95%] flex-row justify-between gap-5">
        <div className="background-gradient flex w-[100%] flex-1 flex-col items-center justify-center rounded-xl pt-[5em] sm:hidden lg:block ">
          <div className="flex flex-col items-center justify-center text-center">
            <header className="cursor-pointer" onClick={Home}>
              <h1 className="font-br-bold text-4xl">PayChyKzee</h1>
            </header>
            <div className="mt-[2em] w-[60%]">
              <p className="font-br-light">
                Choose your currencies and start exchanging the best rates
              </p>
            </div>
            <div className=" flex w-full flex-1 items-center">
              <img
                className="mt-[1.5em] h-[80%] w-full rounded-xl"
                src={image}
                alt="Hands holding money"
              />
            </div>
          </div>
        </div>
        <section className="flex flex-1 flex-col items-center justify-center rounded-xl bg-dashboard px-4 py-[2em]">
          <div className="text-center lg:w-[85%]">
            <header>
              <h1 className="font-br-regular text-4xl leading-10">Login</h1>
            </header>
            <div className="m-auto w-full lg:w-[78%]">
              <div className="mt-[1em]">
                <p className="font-br-thin text-logintext">
                  Login with the right details to start using the platform
                </p>
              </div>
              <form action="login" className="mt-[1.5em] text-logintext">
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="flex-start flex">
                    Email Address
                  </label>
                  <input
                    name="email"
                    id="email"
                    className="rounded-lg border-[2px]  border-border  bg-inherit p-3 focus:border-side focus:outline-none"
                  />
                </div>
                <div className="mt-[1.5em] flex flex-col gap-3">
                  <label htmlFor="password" className="flex-start flex">
                    Password
                  </label>
                  <div className="relative flex items-center text-center">
                    <input
                      name="password"
                      id="password"
                      type={passwordType}
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      className=" w-full items-center rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
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

                <div className="mt-[1em] flex justify-end text-primary">
                  <p>
                    <Link to="/forgot-password">Forget Password?</Link>
                  </p>
                </div>
                <div className="flex-start mt-4 flex gap-2">
                  <input type="checkbox" name="checkbox" id="checkbox" />
                  <p className="text-">Remember Password</p>
                </div>
              </form>
            </div>
            <div className="mt-[1.5em]">
              <button.PrimaryButton className="w-full">
                Login
              </button.PrimaryButton>
            </div>
            <section className="mt-[1.5em]">
              <p className="font-br-light">
                Don't have an account yet?
                <span className="ml-2 font-br-semibold text-primary">
                  <Link to="/sign-up">Sign up</Link>
                </span>
              </p>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserLogin;
