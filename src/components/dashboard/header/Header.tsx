import { useState } from "react";
import logo from "../../../assets/png/PayChykzee.png";
import SideModal from "../sidemodal/SideModal";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { button } from "../../../shared/button/button";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = () => {
    closeModal();
  };

  return (
    <header className="bg-dashboard p-6 text-white">
      <div className="flex justify-between lg:px-[1em]">
        <div>
          <img src={logo} alt="paychykzee-logo" />
        </div>
        <div className="hidden lg:block">profile</div>
        <AiOutlineMenu
          onClick={toggle}
          size={30}
          className="cursor-pointer text-text lg:hidden"
        />
      </div>
      <SideModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="mt-[4em] flex flex-col gap-[2em]">
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="/dashboard/home"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="peer-to-peer"
            onClick={handleLinkClick}
          >
            Peer-to-Peer
          </Link>
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="bill-payment"
            onClick={handleLinkClick}
          >
            Bill Payment
          </Link>
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="reach-out"
            onClick={handleLinkClick}
          >
            Contact Us
          </Link>
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="settings/personal"
            onClick={handleLinkClick}
          >
            Personal
          </Link>
          <Link
            className="cursor-pointer font-br-regular text-xl text-text"
            to="settings/security"
            onClick={handleLinkClick}
          >
            Security
          </Link>
          <div>
            <button.PrimaryButton className="text-text">
              Log Out
            </button.PrimaryButton>
          </div>
        </div>
      </SideModal>
    </header>
  );
};

export default Header;
