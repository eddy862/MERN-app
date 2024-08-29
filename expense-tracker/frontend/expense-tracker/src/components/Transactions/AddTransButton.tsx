import { AddOne } from "@icon-park/react";
import React from "react";
import CustomTooltip from "../CustomTooltip";

type Props = {
  toggleModal: () => void;
};

const AddTransButton = ({ toggleModal }: Props) => {
  return (
    <div className="absolute bottom-6 right-8 cursor-pointer">
      <CustomTooltip title="Add Transaction" placement="left">
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

export default AddTransButton;
