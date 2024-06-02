import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { button } from "../../../shared/button/button";
import logo from "../../../assets/png/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setModal(!modal);
    setShowMenu(!showMenu);
  };

  const Create = () => {
    navigate("/sign-up");
  };

  return (
    <nav className="top-0 flex h-[70px] w-full items-center justify-around bg-inherit bg-purpleprimary text-center font-br-light">
      <div className="m-auto flex w-full items-center justify-between px-3 lg:w-[80%]">
        <header>
          <img src={logo} alt="" />
        </header>
        <div className="hidden  items-center gap-7 lg:flex">
          <ScrollLink
            className="cursor-pointer text-text"
            to="services"
            smooth={true}
            duration={500}
          >
            Service
          </ScrollLink>
          <ScrollLink
            className="cursor-pointer text-text"
            to="about-us"
            smooth={true}
            duration={500}
          >
            About Us
          </ScrollLink>
          <ScrollLink
            className="cursor-pointer text-text"
            to="contact-us"
            smooth={true}
            duration={500}
          >
            Contact Us
          </ScrollLink>
          <Link to="/login" className="text-text">
            Login
          </Link>
          <div>
            <button.PrimaryButton onClick={Create} className="text-text">
              Create account
            </button.PrimaryButton>
          </div>
        </div>
        <div className="block lg:hidden">
          <AiOutlineMenu
            onClick={toggle}
            size={30}
            className="cursor-pointer text-text"
          />
        </div>
      </div>
      <Modal
        className="block lg:hidden"
        isOpen={modal}
        toggle={toggle}
        fullscreen
      >
        <ModalBody className="flex h-screen w-screen flex-col items-center justify-center bg-purpleblack p-7 text-center">
          <div className="absolute right-8 top-6">
            <AiOutlineClose
              onClick={toggle}
              className="cursor-pointer text-text"
              size={40}
            />
          </div>
          <motion.div
            initial={{ y: -100 }}
            className="mt-8 flex flex-col gap-8"
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", duration: 7 }}
          >
            <ScrollLink
              className="cursor-pointer font-br-regular text-xl text-text"
              to="services"
              smooth={true}
              duration={500}
              onClick={toggle}
            >
              Service
            </ScrollLink>
            <ScrollLink
              className="cursor-pointer font-br-regular text-xl text-text"
              to="about-us"
              smooth={true}
              duration={500}
              onClick={toggle}
            >
              About Us
            </ScrollLink>
            <ScrollLink
              className="cursor-pointer font-br-regular text-xl text-text"
              to="contact-us"
              smooth={true}
              duration={500}
              onClick={toggle}
            >
              Contact Us
            </ScrollLink>
            <Link to="/login" className="text-xl text-text">
              Login
            </Link>

            <button.PrimaryButton className="text-text">
              Create account
            </button.PrimaryButton>
          </motion.div>
        </ModalBody>
      </Modal>
    </nav>
  );
};

export default Navbar;
