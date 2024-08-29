import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "bootstrap";

type Props = {
  title: string;
  children: React.ReactNode;
  placement?: "auto" | "top" | "bottom" | "left" | "right";
  isEnabled?: boolean;
};

const CustomTooltip = ({ title, children, placement, isEnabled }: Props) => {
  const toolTipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEnabled || isEnabled === undefined) {
      const tooltip = new Tooltip(toolTipRef.current!, {
        title: title,
        placement: placement || "auto",
        trigger: "hover",
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [title, isEnabled, placement]);

  return (
    <span ref={toolTipRef} data-bs-toggle="tooltip">
      {children}
    </span>
  );
};

export default CustomTooltip;
