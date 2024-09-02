import React from "react";
import { ICategory } from "../../types/categories";

type Props = {
  category: ICategory;
  selected: boolean;
  setSelectedCategoryIndex: () => void;
};

const SelectCategoriesItem = ({
  category,
  selected,
  setSelectedCategoryIndex,
}: Props) => {
  return (
    <div className="inline-flex items-center justify-center">
      <img
        src={`./category-icons/${category.icon}`}
        alt={category.name}
        className={`w-7 cursor-pointer ${
          selected ? "opacity-100" : "opacity-50"
        }`}
        onClick={setSelectedCategoryIndex}
      />
    </div>
  );
};

export default SelectCategoriesItem;
