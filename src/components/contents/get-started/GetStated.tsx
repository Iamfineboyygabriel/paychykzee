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
      <main className="w-full  font-br-regular">
        <section className="ml-auto flex w-[90%] justify-between">
          <div className="w-[27%] pt-[3.5em]">
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
          <div>
            <img src={card} alt="card" className="mt-[5em]" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default GetStarted;
