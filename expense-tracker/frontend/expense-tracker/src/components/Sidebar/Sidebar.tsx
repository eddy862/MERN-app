import React from "react";
import MenuItem from "./MenuItem";
import {
  AllApplication,
  Exchange,
  SettingTwo,
  TagOne,
  WalletThree,
} from "@icon-park/react";
import LogoutButton from "./LogoutButton";

type Props = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: Props) => {
  return (
    // a vertical flex container
    <div
      className={`flex flex-col justify-between h-screen w-[280px] transition-[width] duration-500 ease-in-out px-3 py-6 bg-white ${
        isOpen ? "w-[280px]" : "w-[70px] pl-4"
      }`}
    >
      <div className="mt-12">
        {isOpen && (
          <p className="uppercase text-xs tracking-wide text-slate-600 mb-2">
            General
          </p>
        )}
        <ul className={`flex flex-col ${!isOpen ? "gap-2" : "gap-0"}`}>
          <li>
            <MenuItem
              title="Dashboard"
              to="/dashboard"
              icon={AllApplication}
              isSidebarOpen={isOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Transactions"
              to="/transactions"
              icon={Exchange}
              isSidebarOpen={isOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Fixed Items"
              to="/fixed-items"
              icon={TagOne}
              isSidebarOpen={isOpen}
            />
          </li>
          <li>
            <MenuItem
              title="Budgets" 
              to="/budgets"
              icon={WalletThree}
              isSidebarOpen={isOpen}
            />
          </li>
        </ul>

        {isOpen ? (
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
              isSidebarOpen={isOpen}
            />
          </li>
        </ul>
      </div>

      <div>
        <LogoutButton isSidebarOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
