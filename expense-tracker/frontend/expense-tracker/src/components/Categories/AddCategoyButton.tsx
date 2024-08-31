import { Add } from "@icon-park/react";
import React from "react";

type Props = {};

const AddCategoyButton = (props: Props) => {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div className="flex flex-col items-center rounded gap-2 w-16 p-2 hover:bg-slate-100">
        <Add theme="filled" size="26" fill="#9b9b9b" />
        <p className="text-xs text-center">Add</p>
      </div>
    </div>
  );
};

export default AddCategoyButton;
