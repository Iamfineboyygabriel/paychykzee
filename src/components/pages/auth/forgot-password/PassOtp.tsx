import { button } from "../../../../shared/button/button";

const PassOtp = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center text-logintext shadow-lg lg:w-[90%] lg:py-[3em]">
        <header>
          <h1 className="gradient-text font-br-bold text-[2.4em]">
            PayChyKzee
          </h1>
        </header>
        <div className="m-auto mt-[3em] w-[90%] lg:w-[50%]">
          <div>
            <header>
              <h1 className="font-br-semibold text-2xl text-text lg:text-[2.3em]">
                OTP Authentication
              </h1>
            </header>
            <p className="mt-[1em] font-br-thin text-sm">
              Enter the OPT authentication code sent to your email address
            </p>
          </div>
          <div className="mt-[2em]">
            <input
              type="number"
              name="otp"
              id="otp"
              className="focus:border-gradient-border w-full rounded-lg border text-[1.5em] border-border bg-inherit p-[1.5em] font-br-bold tracking-[2em] text-text "
            />
            <div className="mt-[1em] flex flex-col gap-3">
              <p className="br-font-thin text-purplewhite">
                Didn't Receive OTP Code ?
              </p>
              <p className="font-br-semibold text-primary underline">
                Resend Code
              </p>
            </div>
          </div>
          <div className="mt-[3em]">
            <button.PrimaryButton className="w-full">
              Continue
            </button.PrimaryButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PassOtp;
