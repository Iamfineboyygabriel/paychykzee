import { NavLink, useLocation } from "react-router-dom";
import activehome from "../../../assets/svg/dashboard-icon.svg";
import inactivehome from "../../../assets/svg/inactive-home.svg";
import inactivepeer from "../../../assets/svg/inactivepeer.svg";
import activepeer from "../../../assets/svg/activepeer.svg";
import inactivebill from "../../../assets/svg/inactive-bill.svg";
import activebill from "../../../assets/svg/active-bill.svg";
import contact from "../../../assets/svg/contact.svg";

const Sidebar = () => {
  const location = useLocation().pathname;

  return (
    <aside className="hidden lg:block min-h-full w-64 bg-dashboard text-white">
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
                <span className="ml-2">
                  Peer-to-Peer
                  </span>
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
                <span className="ml-2">
                  Bill Payment
                  </span>
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
      </div>
    </aside>
  );
};

export default Sidebar;
