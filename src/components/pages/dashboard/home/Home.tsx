import { useNavigate } from "react-router-dom";
import { button } from "../../../../shared/button/button";

const Home = () => {
  const navigate = useNavigate();

  const peer = () => {
    navigate("/dashboard/peer-to-peer");
  };

  const bill = () => {
    navigate("/dashboard/bill-payment");
  };

  return (
    <div className="h-auto overflow-auto font-br-regular">
      <h1 className="font-br-semibold text-2xl lg:text-left">Overview</h1>
      <div className="h-[calc(100vh - 4em)] m-auto mt-4 overflow-auto rounded-lg bg-dashboard px-4 py-4 lg:px-12 lg:py-5">
        <div className="mt-4 h-auto lg:mt-6 ">
          <div className="relative rounded-2xl bg-peer-background bg-cover bg-no-repeat p-4 lg:p-9">
            <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>
            <div className="relative z-10 lg:w-[70%]">
              <h1 className="text-lg text-white lg:text-3xl">
                Peer to Peer Currency Exchange Service
              </h1>
            </div>
            <div className="relative z-10 mt-4 font-br-light text-sm text-white lg:text-base">
              <p>
                ChyKzee Peer-to-Peer (P2P) is a decentralized model whereby two
                private individuals interact to buy and sell goods and services
                directly with each other without an intermediary third-party or
                the use of an incorporated entity or business firm.
              </p>
              <p className="mt-2">
                In ChyKzee Peer-to-Peer transactions, the buyer and the seller
                transact directly with each other in terms of the delivery of
                the goods and services and the exchange of payments.
              </p>
            </div>
            <div className="relative z-10 mt-9">
              <button.PrimaryButton
                className="bg-white font-br-regular text-primary"
                onClick={peer}
              >
                Exchange Currency
              </button.PrimaryButton>
            </div>
          </div>

          <div className="relative mt-11 rounded-2xl bg-outsourced-background bg-cover bg-no-repeat p-4 lg:p-9">
            <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>
            <div className="relative z-10">
              <h1 className="text-lg text-white lg:text-3xl">
                Outsourced Bill Payment
              </h1>
            </div>
            <div className="relative z-10 mt-4 font-br-light text-sm text-white lg:text-base">
              <p>
                We're an outsourced bill payment and procurement services
                business, helping foreign students make tuition fee deposits and
                secure accommodation and other expenses. We also help overseas
                patients with paying medical bills.
              </p>
              <p className="mt-2">
                We charge a small commission for our services, which is usually
                a percentage of the transaction amount.
              </p>
            </div>
            <div className="relative z-10 mt-9">
              <button.PrimaryButton
                className="bg-white font-br-regular text-primary"
                onClick={bill}
              >
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
