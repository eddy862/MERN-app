import React from "react";
import { IBudget } from "../../types/budgets";
import BudgetItem from "./BudgetItem";

type Props = {
  budgets: IBudget[];
  handleEditModalOpen: (budget: IBudget) => void
};

const BudgetList = ({ budgets, handleEditModalOpen }: Props) => {
  if (budgets.length === 0) {
    return <p className="text-center text-gray-500">No budgets found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {budgets.map((budget) => (
        <BudgetItem key={budget._id} budget={budget} handleEditModalOpen={handleEditModalOpen} />
      ))}
    </div>
  );
};

export default BudgetList;
