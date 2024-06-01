import { useNavigate } from "react-router-dom";
import card from "../../../assets/png/exhange.png";
import { button } from "../../../shared/button/button";

const GetStarted = () => {
  const navigate = useNavigate();
  const SignUp = () => {
    navigate("/sign-up");
  };
  return (
    <div>
      <main className="w-full font-br-regular">
        <section className="ml-auto  flex w-[90%] flex-col justify-between lg:flex-row">
          <div className="w-full text-center lg:w-[27%] lg:pt-[3.5em] lg:text-left">
            <header className="mt-[1.7em]">
              <h1 className="gradient-text font-br-bold text-3xl">
                Get Started
              </h1>
            </header>
            <div className="mt-[1.7em]">
              <article className="leading-7 text-textp">
                Join thousands of satisfied users who trust Pay Chykzee for
                their currency exchange needs. Create an account now and
                experience the ease of currency exchange.
              </article>
            </div>
            <div className="mt-[1.5em]">
              <button.PrimaryButton onClick={SignUp} className="text-text">
                Create account
              </button.PrimaryButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img src={card} alt="card" className="mt-[5em]" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default GetStarted;
