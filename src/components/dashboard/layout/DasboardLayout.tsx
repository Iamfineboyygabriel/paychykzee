import { ReactNode } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen  flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="h-auto flex-1 overflow-y-auto bg-purpleprimary px-[1.5em] py-[2em]  text-text">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
