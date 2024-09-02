import React from "react";
import { IParentCategory } from "../../types/parentCategories";

type Props = {
  parentCategory: IParentCategory;
  selectedParentCategoryIndex: number;
  setSelectedParentCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

const ParentCategoriesItem = ({
  parentCategory,
  selectedParentCategoryIndex,
  setSelectedParentCategoryIndex,
  index,
}: Props) => {
  return (
    <div
      className={`border-2 border-slate-700 py-0.5 px-2 rounded-full cursor-pointer ${
        selectedParentCategoryIndex === index ? "bg-slate-800 text-white" : ""
      }`}
      onClick={() => setSelectedParentCategoryIndex(index)}
    >
      {parentCategory.name}
    </div>
  );
};

export default ParentCategoriesItem;
