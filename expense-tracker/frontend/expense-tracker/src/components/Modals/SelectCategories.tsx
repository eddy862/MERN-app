import React, { useMemo } from "react";
import { ICategory } from "../../types/categories";
import SelectCategoriesItem from "./SelectCategoriesItem";

type Props = {
  categories: ICategory[];
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SelectCategories = ({
  categories,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4 overflow-y-auto h-48 items-start">
      {categories.map((category, index) => (
        <SelectCategoriesItem
          key={category._id}
          category={category}
          selected={selectedCategoryIndex === index}
          setSelectedCategoryIndex={() => setSelectedCategoryIndex(index)}
        />
      ))}
    </div>
  );
};

export default SelectCategories;
