import React, { useEffect, useState } from "react";
import { IBudget, IBudgetsFilter } from "../../types/budgets";
import BudgetItem from "./BudgetItem";
import { ICategory } from "../../types/categories";

type Props = {
  budgets: IBudget[];
  handleEditModalOpen: (budget: IBudget) => void;
  fetchBudgets: (filter?: IBudgetsFilter) => Promise<void>;
  searchFilter: IBudgetsFilter;
  setSearchFilter: React.Dispatch<React.SetStateAction<IBudgetsFilter>>;
  onCategoryModalOpen: () => void;
  selectedCategory: ICategory | null;
};

const BudgetList = ({
  budgets,
  handleEditModalOpen,
  fetchBudgets,
  searchFilter,
  setSearchFilter,
  onCategoryModalOpen,
  selectedCategory,
}: Props) => {
  const [filterError, setFilterError] = useState("");
  const [allCategoryChecked, setAllCategoryChecked] = useState(true);

  const onPeriodFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSearchFilter((prev) => ({ ...prev, period: undefined }));
    } else {
      setSearchFilter((prev) => ({
        ...prev,
        period: e.target.value as IBudget["period"],
      }));
    }
  };

  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter((prev) => ({ ...prev, endDate: e.target.value }));
  };

  const handleAllCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllCategoryChecked(event.target.checked);
  };

  // Update search filter when all category is checked or unchecked
  useEffect(() => {
    if (allCategoryChecked) {
      setSearchFilter((prev) => ({ ...prev, category: undefined }));
    } else {
      setSearchFilter((prev) => ({
        ...prev,
        category: selectedCategory?._id,
      }));
    }
  }, [allCategoryChecked, selectedCategory]);

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      searchFilter.startDate &&
      searchFilter.endDate &&
      searchFilter.startDate > searchFilter.endDate
    ) {
      setFilterError("Start date cannot be greater than end date");
      return;
    }

    setFilterError("");
    fetchBudgets(searchFilter);
  };

  const onReset = async () => {
    setSearchFilter({
      startDate: new Date(new Date().getFullYear(), 0, 2)
        .toISOString()
        .split("T")[0],
      endDate: new Date(new Date().getFullYear(), 12, 1)
        .toISOString()
        .split("T")[0],
    });
    setAllCategoryChecked(true);
    fetchBudgets();
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <select
          value={searchFilter.period || "all"}
          onChange={onPeriodFilterChange}
        >
          <option value="all">All</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="customised">Customised</option>
        </select>

        <input
          type="date"
          value={searchFilter.startDate}
          onChange={onStartDateChange}
        />
        <input
          type="date"
          value={searchFilter.endDate}
          onChange={onEndDateChange}
        />

        <input
          type="checkbox"
          id="allCategory"
          checked={allCategoryChecked}
          onChange={handleAllCategoryChange}
        />
        <label htmlFor="allCategory">All Category</label>

        {!allCategoryChecked && (
          <div className="cursor-pointer" onClick={onCategoryModalOpen}>
            Selected Category: {selectedCategory?.name}
          </div>
        )}

        {filterError && <p className="text-red-500 text-xs">{filterError}</p>}

        <button type="submit">Search</button>
        <button onClick={onReset}>Reset</button>
      </form>

      {budgets.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {budgets.map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              handleEditModalOpen={handleEditModalOpen}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No budgets found</p>
      )}
    </>
  );
};

export default BudgetList;
