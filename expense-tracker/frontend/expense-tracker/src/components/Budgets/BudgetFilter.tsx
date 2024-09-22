import React, { useState, useEffect } from "react";
import { IBudget, IBudgetsFilter } from "../../types/budgets";
import { ICategory } from "../../types/categories";
import { Down, Right } from "@icon-park/react";
import CategoryIconBackground from "../Icons/CategoryIconBackground";

type Props = {
  fetchBudgets: (filter?: IBudgetsFilter, reset?: boolean) => Promise<void>;
  searchFilter: IBudgetsFilter;
  setSearchFilter: React.Dispatch<React.SetStateAction<IBudgetsFilter>>;
  onCategoryModalOpen: () => void;
  selectedCategory: ICategory | null;
};

const BudgetFilter = ({
  fetchBudgets,
  searchFilter,
  setSearchFilter,
  onCategoryModalOpen,
  selectedCategory,
}: Props) => {
  const [filterError, setFilterError] = useState("");
  const [allCategoryChecked, setAllCategoryChecked] = useState(true);
  const [allCompletedBudgetsChecked, setAllCompletedBudgetsChecked] =
    useState(false);
  const [filterIsExpanded, setFilterIsExpanded] = useState(false);
  const [displayBudgetsType, setDisplayBudgetsType] = useState<
    "all" | "income" | "expense"
  >("all");

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

  const handleAllCompletedBudgetsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllCompletedBudgetsChecked(event.target.checked);
  };

  // Update search filter when all category is checked or unchecked
  useEffect(() => {
    if (displayBudgetsType === "all") {
      setSearchFilter((prev) => ({ ...prev, categoryType: undefined }));
    }

    if (displayBudgetsType === "expense") {
      setSearchFilter((prev) => ({ ...prev, categoryType: "expense" }));
    }

    if (displayBudgetsType === "income") {
      setSearchFilter((prev) => ({ ...prev, categoryType: "income" }));
    }
  }, [displayBudgetsType]);

  // Update search filter when all category is checked or unchecked
  useEffect(() => {
    if (allCategoryChecked) {
      setSearchFilter((prev) => ({ ...prev, category: undefined }));
      setDisplayBudgetsType("all");
    } else {
      setSearchFilter((prev) => ({
        ...prev,
        category: selectedCategory?._id,
      }));
    }
  }, [allCategoryChecked, selectedCategory]);

  useEffect(() => {
    if (allCompletedBudgetsChecked) {
      setSearchFilter((prev) => ({ ...prev, completed: true }));
    } else {
      setSearchFilter((prev) => ({ ...prev, completed: undefined }));
    }
  }, [allCompletedBudgetsChecked]);

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
    fetchBudgets(searchFilter, true);
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
    setAllCompletedBudgetsChecked(false);
    setDisplayBudgetsType("all");
    fetchBudgets({}, true);
  };

  if (!selectedCategory) {
    return null;
  }

  return (
    <div
      className={`px-4 py-3 bg-white shadow-md rounded-lg text-sm mb-3 ${
        filterIsExpanded ? "" : "h-14"
      } overflow-hidden`}
    >
      <div
        className="mb-2 flex justify-between items-center cursor-pointer"
        onClick={() => setFilterIsExpanded((prev) => !prev)}
      >
        <h3 className="text-lg font-medium">Filter</h3>
        <Down theme="filled" size="20" fill="#333" />
      </div>
      <form onSubmit={onSearch}>
        <div className="flex flex-col md:flex-row mb-3 gap-2">
          <div className="flex-1">
            <label
              htmlFor="period"
              className="text-xs font-medium text-gray-700"
            >
              Period
            </label>
            <select
              id="period"
              value={searchFilter.period || "all"}
              onChange={onPeriodFilterChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 focus:outline-none rounded-md"
            >
              <option value="all">All</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="customised">Customised</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label
                htmlFor="startDate"
                className="font-medium text-gray-700 text-xs"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={searchFilter.startDate}
                onChange={onStartDateChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="endDate"
                className="text-xs font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={searchFilter.endDate}
                onChange={onEndDateChange}
                className="mt-1 w-full px-3 py-2 border outline-none border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-3">
          <div className="inline-flex items-center gap-3 md:flex-[0.5]">
            <div className="inline-flex items-center">
              <input
                type="checkbox"
                id="allCategory"
                checked={allCategoryChecked}
                onChange={handleAllCategoryChange}
                className="h-4 w-4"
              />
              <label
                htmlFor="allCategory"
                className="ml-2 block font-medium text-gray-700"
              >
                All Category
              </label>
            </div>

            {allCategoryChecked && (
              <>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={displayBudgetsType === "all"}
                    onChange={() => setDisplayBudgetsType("all")}
                  />
                  <label
                    htmlFor="allExpense"
                    className="ml-2 block font-medium text-gray-700"
                  >
                    All
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={displayBudgetsType === "expense"}
                    onChange={() => setDisplayBudgetsType("expense")}
                  />
                  <label
                    htmlFor="allExpense"
                    className="ml-2 block font-medium text-gray-700"
                  >
                    Expense
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={displayBudgetsType === "income"}
                    onChange={() => setDisplayBudgetsType("income")}
                  />
                  <label
                    htmlFor="allExpense"
                    className="ml-2 block font-medium text-gray-700"
                  >
                    Income
                  </label>
                </div>
              </>
            )}
          </div>

          {!allCategoryChecked && (
            <div className="md:flex-1">
              <p className="text-xs font-medium text-gray-700">Category</p>
              <div
                className="mt-1 flex items-center justify-between p-2 border outline-none border-gray-300 rounded-md cursor-pointer"
                onClick={onCategoryModalOpen}
              >
                <div className="inline-flex items-center gap-2">
                  <CategoryIconBackground categoryType={selectedCategory.type}>
                    <img
                      className="w-6 relative"
                      src={`category-icons/${selectedCategory.icon}`}
                      alt={selectedCategory.name}
                    />
                  </CategoryIconBackground>
                  {selectedCategory.name}
                </div>
                <Right theme="filled" size="18" fill="#333" />
              </div>
            </div>
          )}
        </div>

        <div className="inline-flex items-center">
          <input
            type="checkbox"
            id="completedBudgets"
            checked={allCompletedBudgetsChecked}
            onChange={handleAllCompletedBudgetsChange}
            className="h-4 w-4"
          />
          <label
            htmlFor="completedBudgets"
            className="ml-2 block font-medium text-gray-700"
          >
            Completed
            <span className="text-xs text-gray-500 ml-2">{`(Total Made >= Target Amount)`}</span>
          </label>
        </div>

        {filterError && <p className="text-red-500 text-xs">{filterError}</p>}

        <div className="flex space-x-4 mt-3">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetFilter;
