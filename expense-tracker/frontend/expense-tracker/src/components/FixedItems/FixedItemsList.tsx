import React from "react";
import { IFixedItem } from "../../types/fixedItems";
import FixedItem from "./FixedItem";

type Props = {
  fixedItems: IFixedItem[];
};

const FixedItemsList = ({ fixedItems }: Props) => {
  return (
    <div className="flex flex-col">
      {fixedItems.map((item) => (
        <FixedItem key={item._id} fixedItem={item} />
      ))}
    </div>
  );
};

export default FixedItemsList;
