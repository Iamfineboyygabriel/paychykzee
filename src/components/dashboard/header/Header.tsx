import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/png/PayChykzee.png";
import SideModal from "../sidemodal/SideModal";
import { AiOutlineMenu } from "react-icons/ai";
import { button } from "../../../shared/button/button";
import { useSelector } from "react-redux";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useSelector((state: any) => state.transaction.userProfile);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLinkClick = () => {
    closeModal();
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    const rememberMe = sessionStorage.getItem("rememberMe") === "true";

    if (rememberMe) {
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");
      sessionStorage.clear();
      if (email && password) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
      }
      sessionStorage.setItem("rememberMe", "true");
    } else {
      sessionStorage.clear();
    }

    navigate("/");
  };

  return (
    <header className="bg-dashboard p-6 font-br-regular text-white">
      <div className="flex justify-between lg:px-[1em]">
        <div>
          <img src={logo} alt="paychykzee-logo" />
        </div>
        <div className="hidden gap-2 lg:flex">
          <h1 className="font-sm text-textp">Welcome</h1>
          <div className="gradient-text">{userData?.firstName}</div>
          <div className="gradient-text">{userData?.lastName}</div>
        </div>
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
            <button.PrimaryButton className="text-text" onClick={handleLogout}>
              Log Out
            </button.PrimaryButton>
          </div>
        </div>
      </SideModal>
    </header>
  );
};

export default Header;
