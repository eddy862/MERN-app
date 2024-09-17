import React from "react";
import { ICategory } from "../../types/categories";
import CategoryItem from "../Categories/CategoryItem";

type Props = {
  categoriesType: string;
  categories: ICategory[];
  selectedCategory: ICategory;
  setSelectedCategory: (id: string) => void;
};

const FixedItemCategoryList = ({
  categoriesType,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-medium text-gray-700 capitalize">{categoriesType}</div>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-3">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            selectedId={selectedCategory._id}
            setSelectedId={setSelectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default FixedItemCategoryList;
