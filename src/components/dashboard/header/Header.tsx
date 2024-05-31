import logo from "../../../assets/png/PayChykzee.png";
const Header = () => {
  return (
    <header className="bg-dashboard p-6 text-white">
      <div className="flex justify-between px-[1em]">
        <div>
          <img src={logo} alt="paychykzee-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
