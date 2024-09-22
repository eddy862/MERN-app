import React from "react";
import { ISortBudgets } from "../../pages/Budgets";
import { ArrowUp } from "@icon-park/react";

type Props = {
  sortBudgets: ISortBudgets;
  setSortBudgets: React.Dispatch<React.SetStateAction<ISortBudgets>>;
};

const BudgetSort = ({ sortBudgets, setSortBudgets }: Props) => {
  const { name, isAsc } = sortBudgets;

  return (
    <div className="mb-3 text-sm inline-flex gap-2 items-center">
      <div className="inline-flex items-center gap-2">
        <label htmlFor="period" className="text-xs font-medium text-gray-700">
          Sort By
        </label>
        <select
          id="period"
          value={name}
          onChange={(e) =>
            setSortBudgets((prev) => ({
              ...prev,
              name: e.target.value as "amount",
            }))
          }
          className="mt-1 px-2 py-1 border border-gray-300 focus:outline-none rounded-md"
        >
          <option value="amount">Amount</option>
          <option value="createdAt">Created at</option>
          <option value="completed%">Completed %</option>
        </select>
      </div>

      <ArrowUp
        className={`cursor-pointer bg-white p-1 rounded-md border border-gray-300 ${
          !isAsc ? "rotate-180" : ""
        }`}
        theme="filled"
        size="18"
        fill="#333"
        onClick={() => setSortBudgets((prev) => ({ ...prev, isAsc: !isAsc }))}
      />
    </div>
  );
};

export default BudgetSort;
