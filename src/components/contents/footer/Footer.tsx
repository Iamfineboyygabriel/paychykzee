import { Link } from "react-router-dom";
import mail from "../../../assets/svg/mail.svg";
import mobile from "../../../assets/svg/mobile.svg";
import location from "../../../assets/svg/location.png";
import facebook from "../../../assets/svg/facebook.svg";
import tweeter from "../../../assets/svg/tweeter.svg";
import lnkdln from "../../../assets/svg/lnkdn.svg";

export const Footer = () => {
  return (
    <main className="bg-border pb-5 pt-[4em] font-br-regular">
      <div className="m-auto text-center lg:w-[80%]">
        <header>
          <h1 className="gradient-text font-br-bold text-3xl">PayChyKzee</h1>
        </header>
        <div className="mt-[2em] space-x-2 font-br-light text-text lg:space-x-5">
          <Link to="#">Service</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
        <hr className="border-1 mt-[2em] border-line" />
        <div className="mt-[2em] flex flex-col items-center justify-center gap-5 font-br-light text-text lg:flex-row">
          <div className="flex items-center gap-2">
            <img src={mail} alt="mail-icon" />
            hello@paychykzee.com
          </div>
          <div className="flex items-center gap-2">
            <img src={mobile} alt="mobile-icon" />
            +444 356 988
          </div>
          <div className="flex items-center gap-2">
            <img src={location} alt="mobile-icon" />
            Lagos,Nigeria.
          </div>
        </div>
        <hr className="border-1 mt-[2em] border-line" />
        <div className="mt-[2em] flex items-center justify-between gap-2 rounded-full border border-none bg-inherit px-3 py-1.5 text-textp sm:flex-col lg:flex-row lg:border-line lg:bg-purpleblack">
          <div className="flex gap-3">
            <div>
              <img src={facebook} alt="facebookk-logo" />
            </div>
            <div>
              <img src={tweeter} alt="tweeter-logo" />
            </div>
            <div>
              <img src={lnkdln} alt="tweeter-logo" />
            </div>
          </div>
          <div>
            <p className="font-br-light">PayChykzee All Rights Reserved</p>
          </div>
          <div className="">
            <p className="font-br-light">Privacy Policy | Terms of service</p>
          </div>
        </div>
      </div>
    </main>
  );
};
