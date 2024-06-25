import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { IdleTimerProvider } from "react-idle-timer";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const handleOnIdle = () => {
    sessionStorage.removeItem("userData");
    toast.info("You have been logged out due to inactivity.");
    navigate("/login");
  };

  const token = sessionStorage.getItem("userData");
  return token ? (
    <IdleTimerProvider onIdle={handleOnIdle} timeout={1 * 60 * 1000}>
      <Outlet />
    </IdleTimerProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
