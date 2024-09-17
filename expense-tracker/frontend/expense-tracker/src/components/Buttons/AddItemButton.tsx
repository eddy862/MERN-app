import { AddOne } from "@icon-park/react";
import React from "react";
import CustomTooltip from "../CustomTooltip";

type Props = {
  toggleModal: () => void;
  tooltipTitle: string;
};

const AddItemButton = ({ toggleModal, tooltipTitle }: Props) => {
  return (
    <div className="fixed cursor-pointer right-8 bottom-5 hover:scale-105 transform transition-transform">
      <CustomTooltip title={tooltipTitle} placement="left">
        <AddOne
          theme="filled"
          size="70"
          fill="#9013fe"
          strokeWidth={2}
          onClick={toggleModal}
        />
      </CustomTooltip>
    </div>
  );
};

export default AddItemButton;
