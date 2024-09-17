import React from "react";
import { IFixedItem } from "../../types/fixedItems";
import FixedItem from "./FixedItem";
import { IDeleteFixedItemModal } from "../../pages/FixedItems";

type Props = {
  fixedItems: IFixedItem[];
  onEditFixedItemModalOpen: (fixedItem: IFixedItem) => void;
  setIsDeleteFixedItemModalOpen: React.Dispatch<React.SetStateAction<IDeleteFixedItemModal>>
};

const FixedItemsList = ({ fixedItems, onEditFixedItemModalOpen, setIsDeleteFixedItemModalOpen }: Props) => {
  if (fixedItems.length === 0) {
    return <p className="text-center text-gray-500">No fixed item</p>;
  }

  return (
    <div className="flex flex-col gap-3 pb-14">
      {fixedItems.map((item) => (
        <FixedItem
          key={item._id}
          fixedItem={item}
          onEditFixedItemModalOpen={onEditFixedItemModalOpen}
          setIsDeleteFixedItemModalOpen={setIsDeleteFixedItemModalOpen}
        />
      ))}
    </div>
  );
};

export default FixedItemsList;
