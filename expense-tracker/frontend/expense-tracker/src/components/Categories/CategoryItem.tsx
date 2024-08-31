import React from "react";
import { ICategory } from "../../types/categories";

type Props = {
  category: ICategory;
  index: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const CategoryItem = ({
  category,
  index,
  selectedIndex,
  setSelectedIndex,
}: Props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-16 flex flex-col gap-2 p-2 items-center justify-center hover:bg-slate-100 cursor-pointer rounded ${
          selectedIndex === index ? "bg-slate-200" : ""
        }`}
        onClick={() => setSelectedIndex(index)}
      >
        <img
          className="w-7"
          src={`icons/${category.icon}`}
          alt={category.icon}
        />
        <p className="text-xs text-center">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
