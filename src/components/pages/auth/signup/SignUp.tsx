import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import {
  RegisterUser,
  VerifyUserAuth,
} from "../../../../shared/redux/slices/landing.slices";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { button } from "../../../../shared/button/button";
import { toast } from "react-toastify";
import { countries as countryData } from "country-data";
import image from "../../../../assets/svg/hand.svg";
import { TokenModal } from "../../../../shared/modal/TokenModal";
import ReactLoading from "react-loading";
import { SuccessModal } from "../../../../shared/modal/SuccessModal";

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

const getCountries = () =>
  countryData.all.map((country: any) => ({
    name: country.name,
  }));

const SignUp: React.FC<SignUpProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("token");
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPasswordValue(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const Home = () => {
    navigate("/");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setToken("");
  };

  const registerUser = useAppSelector(
    (state: any) => state.landing.getUserRegistered,
  );
  console.log("registerUser", registerUser);
  const areFieldsFilled = () => {
    return (
      firstName &&
      lastName &&
      email &&
      country &&
      phoneNumber &&
      password &&
      confirmPasswordValue
    );
  };

  const registerUserData: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (!areFieldsFilled()) {
      toast.error("All fields must be filled");
      return;
    }

    if (password !== confirmPasswordValue) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const body = {
      firstName,
      lastName,
      email,
      country,
      phoneNumber,
      password,
    };
    dispatch(RegisterUser(body))
      .unwrap()
      .then(() => {
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setCountry("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPasswordValue("");
        setIsModalOpen(true);
        setToken("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }

        setLoading(false);
      });
    setUserEmail(email);
  };

  const handleTokenChange = (tokenValue: string) => {
    setToken(tokenValue.slice(0, 6));
  };

  const verifyUserData = async (email: string, token: string) => {
    setLoading(true);
    const body = { email, token };
    try {
      await dispatch(VerifyUserAuth(body)).unwrap();
      setModalType("proceed");
      setIsModalOpen(false);
      toast.success("User verified successfully");
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async () => {
    if (token.length === 6) {
      await verifyUserData(userEmail, token);
    } else {
      toast.error("Invalid token");
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-purpleblack py-9 font-br-regular text-text">
      <section className="flex h-full w-[95%] flex-row justify-between gap-5">
        <div className="flex w-[35%] flex-col items-center rounded-xl bg-side sm:hidden lg:flex">
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
          <form
            className="mt-[1.5em] w-full text-logintext"
            onSubmit={registerUserData}
          >
            <div className="flex gap-3 sm:flex-col lg:flex-row">
              <div className="w-full">
                <label htmlFor="firstName" className="flex-start flex">
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className=" mt-[1em] w-full rounded-lg border-[2px] bg-inherit p-3 focus:border-side focus:outline-none"
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
                value={email}
                onChange={handleEmailChange}
                className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
              />
            </div>

            <div className="mt-[1em] flex gap-3 sm:flex-col lg:flex-row">
              <div className="w-full">
                <label htmlFor="country" className="flex-start flex">
                  Country
                </label>
                <select
                  className="mt-[1em] flex w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
                  value={country}
                  id="country"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {getCountries().map((country: any) => (
                    <option
                      className="bg-purpleblack text-text"
                      key={country.code}
                      value={country.code}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="phoneNumber" className="flex-start flex">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 text-text focus:border-side focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-[1em] flex gap-3 sm:flex-col lg:flex-row">
              <div className="w-full">
                <label htmlFor="password" className="flex-start flex">
                  Password
                </label>
                <div className="relative flex items-center text-center">
                  <input
                    name="password"
                    id="password"
                    type={passwordType}
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-[1em] flex w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
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
                <label htmlFor="confirmPassword" className="flex-start flex">
                  Confirm Password
                </label>
                <div className="relative flex items-center text-center">
                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type={confirmPasswordType}
                    value={confirmPasswordValue}
                    onChange={handleConfirmPasswordChange}
                    className="mt-[1em] flex w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
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
            <div className="mt-[4em] text-center">
              <button.PrimaryButton
                type="submit"
                className={`w-full lg:w-[70%] ${!areFieldsFilled() ? "cursor-not-allowed bg-disabledPrimary" : "text-text"}`}
                disabled={!areFieldsFilled() || loading}
              >
                {loading ? (
                  <ReactLoading
                    color="#FFFFFF"
                    width={25}
                    height={25}
                    type="spin"
                  />
                ) : (
                  "Create Account"
                )}
              </button.PrimaryButton>
            </div>
          </form>
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
      {isModalOpen && (
        <TokenModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleTokenChange={handleTokenChange}
          token={token}
          handleVerifyUser={handleVerifyUser}
        />
      )}

      {modalType === "proceed" && (
        <SuccessModal
          isOpen={true}
          onClose={() => setModalType("")}
          setModalType={setModalType}
        />
      )}
    </main>
  );
};

export default SignUp;
