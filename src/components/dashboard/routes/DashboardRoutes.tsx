import { Routes, Route } from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import DashboardLayout from "../layout/DasboardLayout";
import Peer from "../../pages/dashboard/peer/Peer";
import BillPayment from "../../pages/dashboard/bill/BillPayment";
import ReachOut from "../../pages/dashboard/reachout/ReachOut";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="peer-to-peer" element={<Peer />} />
        <Route path="bill-payment" element={<BillPayment />} />
        <Route path="reach-out" element={<ReachOut />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
