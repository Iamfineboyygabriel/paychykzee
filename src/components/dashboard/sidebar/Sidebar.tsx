import { NavLink, useNavigate } from "react-router-dom";
import activehome from "../../../assets/svg/dashboard-icon.svg";
import inactivehome from "../../../assets/svg/inactive-home.svg";
import inactivepeer from "../../../assets/svg/inactivepeer.svg";
import activepeer from "../../../assets/svg/activepeer.svg";
import inactivebill from "../../../assets/svg/inactive-bill.svg";
import activebill from "../../../assets/svg/active-bill.svg";
import contact from "../../../assets/svg/contact.svg";
import settings from "../../../assets/svg/settings-01 (1).svg";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
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
    <aside className="hidden min-h-full w-64 bg-dashboard text-white lg:block">
      <div className="py-[2em]">
        <div>
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] p-2 px-[2em] font-br-regular text-white"
                : "flex items-center  p-2 px-[2em] text-gray-400"
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? activehome : inactivehome} alt="home" />
                <span className="ml-2">Dashboard</span>
              </>
            )}
          </NavLink>
        </div>

        <div className="mt-[1em]">
          <NavLink
            to="peer-to-peer"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] p-3 px-[2em] font-br-regular text-white"
                : "flex items-center p-2 px-[2em] text-gray-400"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activepeer : inactivepeer}
                  alt="peer-to-peer"
                />
                <span className="ml-2">Peer-to-Peer</span>
              </>
            )}
          </NavLink>
        </div>

        <div className="mt-[1em]">
          <NavLink
            to="bill-payment"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] p-3 px-[2em] font-br-regular text-white"
                : "flex items-center p-2 px-[2em] text-gray-400"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activebill : inactivebill}
                  alt="bill-payment"
                />
                <span className="ml-2">Bill Payment</span>
              </>
            )}
          </NavLink>
        </div>

        <div className="mt-[1em]">
          <NavLink
            to="reach-out"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] p-3 px-[2em] font-br-regular text-white"
                : "flex items-center p-2 px-[2em] text-gray-400"
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? contact : contact} alt="reach-out" />
                <span className="ml-2">Contact Us</span>
              </>
            )}
          </NavLink>
        </div>

        <div className="mt-[1em]">
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] p-3 px-[2em] font-br-regular text-white"
                : "flex items-center p-2 px-[2em] text-gray-400"
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? settings : settings} alt="settings" />
                <span className="ml-2">Settings</span>
              </>
            )}
          </NavLink>
        </div>

        <div className="mt-[5em] flex justify-center">
          <button
            className="w-full bg-gradient-to-r from-[#4c1ef5] to-[#b81ef5] py-[1em] font-br-regular"
            onClick={handleLogout}
          >
            <h1>Log Out</h1>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
