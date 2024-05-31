import { button } from "../../../../shared/button/button";

const Home = () => {
  return (
    <div className="h-auto overflow-auto font-br-regular">
      <h1 className="font-br-semibold text-2xl">Outsourced Bill Payment</h1>
      <div className="h-[calc(100vh - 4em)] m-auto mt-[1em] overflow-auto rounded-lg bg-dashboard px-[3em] py-[2em]">
        <h1 className="text-2xl">Overview</h1>
        <div className="mt-[3em] h-auto ">
          <div className="bg-peer-background relative rounded-2xl bg-cover bg-no-repeat p-[3em]">
            <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>
            <div className="relative z-10 w-[60%]">
              <h1 className="text-3xl text-white">
                Peer to Peer Currency Exchange Service
              </h1>
            </div>
            <div className="relative z-10 mt-[1em] font-br-light text-white">
              <p>
                ChyKzee Peer-to-Peer(P2P) is a decentralised an model whereby
                two private individuals interact to buy and sell goods and
                services directly with each other without an intermediary
                third-party or the use of an incorporated entity or business
                firm.
              </p>
              <p className="mt-[1em]">
                in ChyKzee Peer-to-Peer transaction,the buyer and the seller
                transact directly with each other in terms of the delivery of
                the goods and services and the exchange of payments.
              </p>
            </div>
            <div className="relative z-10 mt-5">
              <button.PrimaryButton className="bg-white font-br-regular text-primary">
                Exchange Currency
              </button.PrimaryButton>
            </div>
          </div>

          <div className="bg-outsourced-background relative mt-[2em] rounded-2xl bg-cover bg-no-repeat p-[3em]">
            <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>
            <div className="relative z-10">
              <h1 className="text-3xl text-white">Outsourced Bill Payment</h1>
            </div>
            <div className="relative z-10 mt-[1em] font-br-light text-white">
              <p>
                We're an outsourced bill payment and procurement services
                business, helping foreign students make tuition fee deposits and
                secure accommodation and other expenses. We also help overseas
                patients with paying medical bills.
              </p>
              <p className="mt-[1em]">
                We charge a small commission for our services, which is usually
                a percentage of the transaction amount.
              </p>
            </div>
            <div className="relative z-10 mt-5">
              <button.PrimaryButton className="bg-white font-br-regular text-primary">
                Pay your Bills
              </button.PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
