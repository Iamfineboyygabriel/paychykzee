import { useState } from "react";
import { button } from "../../../../shared/button/button";
import { useNavigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const ResetOtp = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const token = event.target.value;
    setToken(token.slice(0, 6));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    navigate(`/new-password?token=${token}&email=${email}`);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center text-logintext shadow-lg lg:w-[90%] lg:py-[3em]">
        <header>
          <h1 className="gradient-text font-br-bold text-[1.5em] lg:text-[2.4em]">
            PayChyKzee
          </h1>
        </header>
        <div className="m-auto mt-[1.5em] w-[90%] lg:mt-[3em] lg:w-[50%]">
          <div>
            <header>
              <h1 className="font-br-semibold text-[1.5em] text-text lg:text-[2.3em]">
                OTP Authentication
              </h1>
            </header>
            <p className="mt-[1em] font-br-thin text-sm">
              Enter the OTP authentication code sent to your email address
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-[2em]">
            <input
              type="number"
              name="token"
              id="token"
              value={token}
              maxLength={6}
              onChange={handleTokenChange}
              className="focus:border-gradient-border w-full rounded-lg border border-border bg-inherit p-[1em] text-center  font-br-bold text-sm tracking-[2em] text-text lg:p-[1.5em] lg:text-[1.5em]"
            />

            <div className="mt-[1em] flex flex-col gap-3">
              <p className="br-font-thin text-purplewhite">
                Didn't Receive OTP Code?
              </p>
              <p className="font-br-semibold text-primary underline">
                Resend Code
              </p>
            </div>
            <div className="mt-[3em]">
              <button.PrimaryButton
                className={`w-full ${token.length !== 6 ? "bg-disabledPrimary cursor-not-allowed" : "text-text"}`}
                type="submit"
                disabled={token.length !== 6 || loading}
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
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetOtp;
