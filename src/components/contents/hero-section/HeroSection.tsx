import { useNavigate } from "react-router-dom";
import { button } from "../../../shared/button/button";
import card from "../../../assets/png/hero-card.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const signUp = async () => {
    navigate("/sign-up");
  };

  return (
    <main className="relative flex h-full w-full flex-col items-center justify-center bg-hero-pattern bg-cover  px-3 font-br-regular">
      <section className="w-full  text-center md:w-[60%]">
        <article className="gradient-border m-auto mt-[3em] flex w-full justify-center rounded-lg py-3 text-center lg:mt-[6em] lg:w-[50%]">
          <p className="font-br-semibold text-text sm:text-sm">
            Seamless currency exchange at your fingertips
          </p>
        </article>
        <header>
          <h1 className="gradient-text animate__animated animate__zoomIn font-br-bold text-[2em] sm:text-[2em] lg:text-[4em]">
            Welcome
          </h1>
          <h1 className="gradient-text font-br-bold animate__animated animate__zoomIn text-[2em] sm:text-[2em] lg:text-[4em]">
            to Pay ChyKzee
          </h1>
        </header>
        <article className="m-auto mt-[1em] text-center lg:w-[72%] ">
          <p className="text-text">
            Pay to Chykzee is your one-stop solution for all your currency
            exchange needs. Whether you're travelling, trading, or sending money
            overseas, we provide the best rates with unmatched conveniences.
          </p>
        </article>
        <div className="mt-[2em]">
          <button.PrimaryButton className="text-text" onClick={signUp}>
            Create account
          </button.PrimaryButton>
        </div>
      </section>
      <div className=" mt-[4em] flex w-full justify-center">
        <img src={card} alt="hero-card" />
      </div>
    </main>
  );
};

export default HeroSection;
