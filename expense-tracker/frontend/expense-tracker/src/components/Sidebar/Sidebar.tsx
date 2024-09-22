import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import {
  AllApplication,
  Exchange,
  HamburgerButton,
  SettingTwo,
  TagOne,
  WalletThree,
} from "@icon-park/react";
import LogoutButton from "./LogoutButton";

type Props = {};

const Sidebar = ({}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      return;
    }
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    // a vertical flex container
    <div
      className={`flex flex-col justify-between h-screen w-[280px] transition-[width] duration-500 ease-in-out px-3 py-6 bg-white ${
        isSidebarOpen ? "w-[280px]" : "w-[70px] pl-4"
      }`}
    >
      <HamburgerButton
        className="absolute top-5 left-5 cursor-pointer"
        theme="outline"
        size="30"
        fill="#333"
        onClick={toggleSidebar}
      />

      <div className="mt-12">
        {isSidebarOpen && (
          <p className="uppercase text-xs tracking-wide text-slate-600 mb-2">
            General
          </p>
        )}
        <ul className={`flex flex-col ${!isSidebarOpen ? "gap-2" : "gap-0"}`}>
          <li>
            <MenuItem
              title="Dashboard"
              to="/dashboard"
              icon={AllApplication}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Transactions"
              to="/transactions"
              icon={Exchange}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Fixed Items"
              to="/fixed-items"
              icon={TagOne}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Budgets"
              to="/budgets"
              icon={WalletThree}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
        </ul>

        {isSidebarOpen ? (
          <p className="uppercase text-xs tracking-wide text-slate-600 mt-4 mb-2">
            System
          </p>
        ) : (
          <div className="h-0.5 bg-slate-200 my-2"></div>
        )}
        <ul>
          <li>
            <MenuItem
              title="Settings"
              to="/settings"
              icon={SettingTwo}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
        </ul>
      </div>

      <div>
        <LogoutButton isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
