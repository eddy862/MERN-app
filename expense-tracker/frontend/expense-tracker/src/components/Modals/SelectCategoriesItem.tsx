import React from "react";

type Props = {
  category: string;
  selected: boolean;
  setSelectedCategoryIndex: () => void;
};

const SelectCategoriesItem = ({
  category,
  selected,
  setSelectedCategoryIndex,
}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={`./category-icons/${category}`}
        alt={category}
        className={`w-7 cursor-pointer ${
          selected ? "opacity-100" : "opacity-50"
        }`}
        onClick={setSelectedCategoryIndex}
      />
    </div>
  );
};

export default SelectCategoriesItem;
