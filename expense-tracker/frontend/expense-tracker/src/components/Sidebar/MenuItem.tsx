import { Icon } from "@icon-park/react/lib/runtime";
import React, { useState } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import CustomTooltip from "../CustomTooltip";

type Props = {
  title: string;
  to: LinkProps["to"];
  icon: Icon;
  isSidebarOpen: boolean;
};

const MenuItem = ({ title, to, icon, isSidebarOpen }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const path = useLocation().pathname;
  const isPageActive = path === to;

  const hoverBg = isHover || isPageActive ? "#ffffff" : "#333";

  return (
    <div className="group">
      <CustomTooltip title={title} isEnabled={!isSidebarOpen}>
        <Link
          className={`gap-3 p-2 text-sm hover:bg-purple-600 ${
            isSidebarOpen ? "rounded flex" : "rounded-full inline-flex"
          } ${isPageActive ? "bg-purple-600" : ""}`}
          to={to}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {icon({ theme: "outline", size: 20, fill: hoverBg })}
          {isSidebarOpen && (
            <div className={`${isPageActive ? "text-white" : ""} group-hover:text-white`}>{title}</div>
          )}
        </Link>
      </CustomTooltip>
    </div>
  );
};

export default MenuItem;
