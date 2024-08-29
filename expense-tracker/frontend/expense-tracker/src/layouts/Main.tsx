import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { HamburgerButton } from "@icon-park/react";
import Navbar from "../components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative">
      <HamburgerButton
        className="absolute top-5 left-5 cursor-pointer"
        theme="outline"
        size="30"
        fill="#333"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      />

      <Sidebar isOpen={isSidebarOpen} />

      <div className="bg-slate-100 flex-1 relative">
        <Navbar  />
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default Main;
