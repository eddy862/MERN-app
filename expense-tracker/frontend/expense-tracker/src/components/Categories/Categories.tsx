import React from "react";
import { ICategory } from "../../types/categories";
import CategoryItem from "./CategoryItem";
import AddCategoyButton from "./AddCategoyButton";
import { ICategoryModal } from "../../pages/Transactions";

type Props = {
  expenses: ICategory[];
  incomes: ICategory[];
  selectedExpenseId: string;
  selectedIncomeId: string;
  setSelectedExpenseId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIncomeId: React.Dispatch<React.SetStateAction<string>>;
  type: "expense" | "income";
  setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<ICategoryModal>>;
  transactionType: "expense" | "income";
};

const Categories = ({
  expenses,
  incomes,
  selectedExpenseId,
  selectedIncomeId,
  setSelectedExpenseId,
  setSelectedIncomeId,
  type,
  setIsCategoryModalOpen,
  transactionType
}: Props) => {
  const categories = type === "expense" ? expenses : incomes;
  const selectedId =
    type === "expense" ? selectedExpenseId : selectedIncomeId;
  const setSelectedId =
    type === "expense" ? setSelectedExpenseId : setSelectedIncomeId;

  return (
    <div className="overflow-y-auto h-72">
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-3 mt-4 ">
        <AddCategoyButton setIsCategoryModalOpen={setIsCategoryModalOpen} transactionType={transactionType} />
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
