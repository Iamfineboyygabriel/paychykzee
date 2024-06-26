import { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingServices from "../../../../shared/redux/services/landing.services";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { button } from "../../../../shared/button/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const forgotPasswordFunc = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const endpoint = `${process.env.REACT_APP_API_URL}/auth/forgotPassword`;

    try {
      const response: any = await landingServices.Forgot_Password(endpoint, {
        email,
      });
      setLoading(false);

      if (response?.status === 200) {
        toast.success(response.message);
        navigate(`/reset-otp?email=${email}`);
      } else {
        toast.error("An error occurred");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center text-logintext shadow-lg lg:w-[90%] lg:py-[5em]">
        <header>
          <h1 className="gradient-text font-br-bold text-2xl lg:text-[2.4em]">
            PayChyKzee
          </h1>
        </header>
        <div className="m-auto mt-[1em] w-[90%] lg:mt-[4em] lg:w-[70%]">
          <div className="m-auto lg:w-[60%]">
            <header>
              <h1 className="font-br-semibold text-2xl text-text lg:text-[2.3em]">
                Forgot Password?
              </h1>
            </header>
            <p className="mt-[1.6em] font-br-thin text-sm">
              Enter your registered email address to reset your password
            </p>
            <form onSubmit={forgotPasswordFunc}>
              <div className="mt-[1.5em] flex flex-col gap-3 text-left">
                <label
                  htmlFor="email"
                  className="font-br-semibold text-logintext"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-2 border-border bg-inherit p-3 focus:border-side focus:outline-none"
                  required
                />
              </div>
            </form>
          </div>
          <div className="mt-[3em]">
            <button.PrimaryButton
              type="submit"
              disabled={!email || loading}
              className="w-full"
              onClick={forgotPasswordFunc}
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
    </main>
  );
};

export default ForgotPassword;
