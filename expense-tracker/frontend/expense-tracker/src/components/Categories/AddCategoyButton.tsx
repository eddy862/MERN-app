import { Add } from "@icon-park/react";
import React from "react";
import { ICategoryModal } from "../../pages/Transactions";

type Props = {
  setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<ICategoryModal>>;
  transactionType: "expense" | "income";
};

const AddCategoyButton = ({ setIsCategoryModalOpen, transactionType }: Props) => {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div
        className="flex flex-col items-center rounded gap-2 w-16 p-2 hover:bg-slate-100"
        onClick={() =>
          setIsCategoryModalOpen({isOpen: true, type: transactionType})
        }
      >
        <Add theme="filled" size="26" fill="#9b9b9b" />
        <p className="text-xs text-center">Add</p>
      </div>
    </div>
  );
};

export default AddCategoyButton;
