import money from "../../../assets/png/money-hand.png";
import calculator from "../../../assets/png/calculator.png";

const OurServices = () => {
  return (
    <main className="bg-gradient-to-b from-gradientColorStart to-gradientColorEnd font-br-regular">
      <section className="m-auto w-[90%] py-[5em] md:w-[80%]">
        <div>
          <header className="text-center text-3xl text-text">
            Our Services
          </header>
        </div>
        <div className="mt-[3em] flex justify-between text-text">
          <section className="flex w-[45%] flex-col">
            <div>
              <img src={money} alt="exchangeimage" />
            </div>
            <article className="mt-[1.5em] w-[72%]">
              <header>
                <h1 className="leading-11 text-center font-br-semibold text-3xl md:text-left">
                  Peer to Peer Currency Exchange Service
                </h1>
              </header>
              <div className="mt-[1.5em] font-br-light leading-8">
                <p>
                  Chykzee peer-to-peer (P2P) is a decentralized model where two
                  private individuals interact to buy and sell goods and
                  services directly with each other without an intermediary
                  third-party or the use of an incorporated entity or business
                  firm.
                </p>
                <p className="mt-[1.5em]">
                  In Chykzee peer-to-peer transactions, the buyer and the seller
                  transact directly with each other in terms of the delivery of
                  the goods and services and the exchange of payment.
                </p>
              </div>
            </article>
          </section>
          <section className="flex w-[45%] flex-col">
            <div>
              <img src={calculator} alt="exchangeimage" />
            </div>
            <article className="mt-[1.5em] w-[65%]">
              <header>
                <h1 className="leading-11 space-x-5 text-center font-br-semibold text-4xl md:text-left">
                  Outsourced Bill Payment
                </h1>
              </header>
              <div className="mt-[1.5em] font-br-light leading-8">
                <p>
                  We are an outsourced bill payment and procurement service
                  business, helping foreign students make tuition fees deposits
                  and secure accommodation and other expenses. We also help
                  overseas patients pay medical bills.
                </p>
                <p className="mt-[1.5em]">
                  We charge a small commission for our service, which is usually
                  a percentage of the transaction amount.
                </p>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
};

export default OurServices;
