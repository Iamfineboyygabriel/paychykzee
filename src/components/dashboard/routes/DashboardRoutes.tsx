import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import DashboardLayout from "../layout/DasboardLayout";
import Peer from "../../pages/dashboard/peer/Peer";
import BillPayment from "../../pages/dashboard/bill/BillPayment";
import ReachOut from "../../pages/dashboard/reachout/ReachOut";
import Settings from "../../pages/dashboard/settings/Settings";
import Personal from "../../pages/dashboard/settings/personal-info/Personal";
import Security from "../../pages/dashboard/settings/security/Security";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route
          path="peer-to-peer"
          element={
            <Peer
              // baseCurrency={null}
              // baseAmount={0}
              // peerCurrency={null}
              // peerAmount={0}
              // exchangeFee={0}
              // rate={0}
            />
          }
        />
        <Route path="bill-payment" element={<BillPayment />} />
        <Route path="reach-out" element={<ReachOut />} />
        <Route path="settings/*" element={<Settings />}>
          <Route index element={<Navigate to="personal" replace />} />
          <Route path="personal" element={<Personal />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
