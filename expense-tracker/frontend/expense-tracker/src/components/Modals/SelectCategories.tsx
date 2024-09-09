import React from "react";
import SelectCategoriesItem from "./SelectCategoriesItem";

type Props = {
  categories: string[];
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SelectCategories = ({
  categories,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
}: Props) => {
  return (
    <div className=" mt-4 overflow-y-auto h-48">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <SelectCategoriesItem
            key={index}
            category={category}
            selected={selectedCategoryIndex === index}
            setSelectedCategoryIndex={() => setSelectedCategoryIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectCategories;
