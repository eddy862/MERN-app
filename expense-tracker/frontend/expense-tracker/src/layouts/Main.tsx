import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <div className="flex relative">
      <Sidebar />

      <div className="bg-slate-100 flex-1 h-screen overflow-y-auto">
        <Navbar />
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default Main;
