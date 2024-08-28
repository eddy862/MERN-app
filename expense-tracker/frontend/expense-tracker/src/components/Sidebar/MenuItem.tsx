import { Icon } from "@icon-park/react/lib/runtime";
import React, { useState } from "react";
import { Link, LinkProps } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";

type Props = {
  title: string;
  to: LinkProps["to"];
  icon: Icon;
  isSidebarOpen: boolean;
};

const MenuItem = ({ title, to, icon, isSidebarOpen }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const hoverBg = isHover ? "#ffffff" : "#333";

  return (
    <div>
      <CustomTooltip title={title} isEnabled={!isSidebarOpen}>
        <Link
          className={`gap-3 p-2 text-sm hover:bg-purple-600 hover:text-white ${
            isSidebarOpen ? "rounded flex" : "rounded-full inline-flex"
          } `}
          to={to}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {icon({ theme: "outline", size: 20, fill: hoverBg })}
          {isSidebarOpen && <div>{title}</div>}
        </Link>
      </CustomTooltip>
    </div>
  );
};

export default MenuItem;
