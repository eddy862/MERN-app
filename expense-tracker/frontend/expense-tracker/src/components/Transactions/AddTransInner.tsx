import React from "react";
import { IModal } from "../../pages/Transactions";
import { CloseSmall } from "@icon-park/react";

type Props = {
  isModalOpen: IModal;
  setIsModalOpen: React.Dispatch<React.SetStateAction<IModal>>;
};

const AddTransInner = ({ isModalOpen, setIsModalOpen }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {isModalOpen.type === "add" ? "Add" : "Edit"} Transaction
        </h3>
        <CloseSmall
          theme="outline"
          size="24"
          fill="#333"
          className="cursor-pointer"
          onClick={() => setIsModalOpen({ isOpen: false })}
        />
      </div>
    </div>
  );
};

export default AddTransInner;
