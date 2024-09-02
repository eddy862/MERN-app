import React from "react";
import { IParentCategory } from "../../types/parentCategories";
import ParentCategoriesItem from "./ParentCategoriesItem";

type Props = {
  parentCategories: IParentCategory[];
  selectedParentCategoryIndex: number;
  setSelectedParentCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ParentCategories = ({
  parentCategories,
  selectedParentCategoryIndex,
  setSelectedParentCategoryIndex,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 font-medium text-sm">
      {parentCategories.map((parentCategory, index) => (
        <ParentCategoriesItem
          key={parentCategory._id}
          parentCategory={parentCategory}
          selectedParentCategoryIndex={selectedParentCategoryIndex}
          setSelectedParentCategoryIndex={setSelectedParentCategoryIndex}
          index={index}
        />
      ))}
    </div>
  );
};

export default ParentCategories;
