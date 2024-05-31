import { button } from "../../../../shared/button/button";

const ForgotPassword = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center text-logintext shadow-lg lg:w-[90%] lg:py-[5em]">
        <header>
          <h1 className="gradient-text font-br-bold text-[2.4em]">
            PayChyKzee
          </h1>
        </header>
        <div className="m-auto mt-[4em] w-[90%] lg:w-[50%]">
          <div className="m-auto w-[80%]">
            <header>
              <h1 className="font-br-semibold text-2xl text-text lg:text-[2.3em]">
                Forgot Password?
              </h1>
            </header>
            <p className="mt-[1.6em] font-br-thin text-sm">
              Enter your registered email address to reset your password
            </p>
          </div>
          <div className="mt-[1.5em] flex flex-col gap-3 text-left">
            <label htmlFor="email" className="font-br-semibold text-logintext">
              Email Address
            </label>
            <input
              type="number"
              name="otp"
              id="otp"
              className="focus:border-gradient rounded-lg border-2 border-border bg-inherit p-2 focus:outline-none"
            />
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

export default ForgotPassword;
