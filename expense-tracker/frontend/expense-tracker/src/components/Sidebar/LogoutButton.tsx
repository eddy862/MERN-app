import { Logout } from "@icon-park/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";

type Props = {
  isSidebarOpen: boolean;
};

const LogoutButton = ({isSidebarOpen}: Props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <>
      <CustomTooltip title="Logout" placement="right" isEnabled={!isSidebarOpen}>
        <div
          className={`gap-3 text-sm p-2 cursor-pointer hover:bg-slate-100 ${
            isSidebarOpen ? "rounded flex" : "rounded-full inline-flex"
          }`}
          onClick={onLogout}
        >
          <Logout theme="outline" size="20" fill="#333" />
          {isSidebarOpen && <span>Logout</span>}
        </div>
      </CustomTooltip>
    </>
  );
};

export default LogoutButton;
