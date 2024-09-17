import React from "react";
import { ICategory } from "../../types/categories";

type Props = {
  category: ICategory;
  selectedId?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>> | ((id: string) => void);
};

const CategoryItem = ({ category, selectedId, setSelectedId }: Props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-16 flex flex-col gap-2 p-2 items-center justify-center hover:bg-slate-100 cursor-pointer rounded ${
          selectedId === category._id ? "bg-slate-200" : ""
        }`}
        onClick={() => setSelectedId(category._id)}
      >
        <img
          className="w-7"
          src={`./category-icons/${category.icon}`}
          alt={category.icon}
        />
        <p className="text-xs text-center">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
