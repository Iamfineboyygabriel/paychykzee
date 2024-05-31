import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Entry from "./components/pages/entry/Entry";
import UserLogin from "./components/pages/auth/login/UserLogin";
import SignUp from "./components/pages/auth/signup/SignUp";
import ForgotPasswrod from "./components/pages/auth/forgot-password//ForgotPassword";
import DashboardRoutes from "./components/dashboard/routes/DashboardRoutes";
import NewPassword from "./components/pages/auth/forgot-password/NewPassword";
import PassOtp from "./components/pages/auth/forgot-password/PassOtp";
import Updated from "./components/pages/auth/forgot-password/Updated";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswrod />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/verification-otp" element={<PassOtp />} />
        <Route path="/reset-successfull" element={<Updated />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
