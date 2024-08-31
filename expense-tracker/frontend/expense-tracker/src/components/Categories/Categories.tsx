import React from "react";
import { ICategory } from "../../types/categories";
import CategoryItem from "./CategoryItem";
import AddCategoyButton from "./AddCategoyButton";

type Props = {
  expenses: ICategory[];
  incomes: ICategory[];
  selectedExpenseIndex: number;
  selectedIncomeIndex: number;
  setSelectedExpenseIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIncomeIndex: React.Dispatch<React.SetStateAction<number>>;
  type: "expense" | "income";
};

const Categories = ({
  expenses,
  incomes,
  selectedExpenseIndex,
  selectedIncomeIndex,
  setSelectedExpenseIndex,
  setSelectedIncomeIndex,
  type,
}: Props) => {
  const categories = type === "expense" ? expenses : incomes;
  const selectedIndex =
    type === "expense" ? selectedExpenseIndex : selectedIncomeIndex;
  const setSelectedIndex =
    type === "expense" ? setSelectedExpenseIndex : setSelectedIncomeIndex;

  return (
    <div className="overflow-y-auto h-72">
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-3 mt-4 ">
        <AddCategoyButton />
        {categories.map((category, index) => (
          <CategoryItem
            key={category._id}
            category={category}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
