import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Settings = () => {
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
    <main className="font-br-regular">
      <h1 className="font-br-semibold text-xl lg:text-2xl">Settings</h1>
      <div className="h-[calc(100vh - 4em)] m-auto mt-[1em] flex gap-[2em] rounded-lg bg-dashboard px-[1.5em] py-[2em] lg:px-[2em]">
        <div>
          <nav className="flex hidden h-screen w-56 flex-col gap-[3em] border-r-2 border-r-border bg-inherit lg:block">
            <div className="flex flex-col gap-4">
              <NavLink
                to="personal"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-2 border-primary p-4 font-br-semibold text-primary"
                    : "p-4"
                }
              >
                <div>
                  Personal Information
                  <p className="mt-[1em] text-xs text-logintext">
                    Name, email, phone
                  </p>
                </div>
              </NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <NavLink
                to="security"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-2 border-primary p-4 font-br-semibold text-primary"
                    : "p-4"
                }
              >
                <div>
                  Security
                  <p className="mt-[1em] text-xs  text-logintext">
                    Change Password
                  </p>
                </div>
              </NavLink>
            </div>
            <div className="ml-[3em] mt-[3em] text-textp">
              <p onClick={handleLogout} className="cursor-pointer">
                Log Out
              </p>
            </div>
          </nav>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Settings;
