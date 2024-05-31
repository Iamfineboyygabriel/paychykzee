import image from "../../../../assets/svg/success.svg";
import { button } from "../../../../shared/button/button";

const Updated = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-hero-pattern bg-cover bg-center font-br-regular">
      <div className="m-auto w-[90%] max-w-3xl rounded-xl bg-dashboard px-5 py-14 text-center text-logintext shadow-lg lg:w-[80%] lg:py-[9em]">
        <header className="flex flex-col items-center">
          <img src={image} alt="Success" className="mb-4 h-24 w-24" />
          <h1 className="font-br-semibold text-2xl text-text lg:text-[2em]">
            Password Updated
          </h1>
          <p className="mt-[1em] font-br-thin text-sm">
            Your password has been updated successfully
          </p>
        </header>
        <div className="mt-[3em]">
          <button.PrimaryButton className="w-full lg:w-[60%]">
            Proceed to Login
          </button.PrimaryButton>
        </div>
      </div>
    </main>
  );
};

export default Updated;
