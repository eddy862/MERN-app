import React, { useContext, useEffect, useState } from "react";
import { IAddEditBudgetModal } from "../../pages/Budgets";
import { CloseSmall, Right } from "@icon-park/react";
import { ICategory } from "../../types/categories";
import CategoryIconBackground from "../Icons/CategoryIconBackground";
import SelectMonth from "../Dashboard/SelectMonth";
import SelectYear from "../Dashboard/SelectYear";
import SetCustomDate from "../Dashboard/SetCustomDate";
import axiosInstance from "../../utils/axiosInstance";
import { isAxiosError } from "axios";
import { CategoryContext } from "../../contexts/CategoryContext";
import { IBudgetsFilter } from "../../types/budgets";

type Props = {
  isAddEditModalOpen: IAddEditBudgetModal;
  setIsAddEditModalOpen: React.Dispatch<
    React.SetStateAction<IAddEditBudgetModal>
  >;
  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory) => void;
  fetchBudgets: (filter?: IBudgetsFilter) => Promise<void>;
  onCategoryModalOpen: () => void;
};

type IPeriod = "monthly" | "yearly" | "customised";

const AddEditBudget = ({
  isAddEditModalOpen,
  setIsAddEditModalOpen,
  selectedCategory,
  setSelectedCategory,
  fetchBudgets,
  onCategoryModalOpen,
}: Props) => {
  const { selectedBudget } = isAddEditModalOpen;

  const { categories } = useContext(CategoryContext);

  const [amount, setAmount] = useState(
    selectedBudget?.amount.toString() || "0"
  );
  const [period, setPeriod] = useState<IPeriod>(
    selectedBudget?.period || "monthly"
  );
  const [startDate, setStartDate] = useState(
    selectedBudget?.startDate
      ? selectedBudget.startDate
      : () => {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth(), 2)
            .toISOString()
            .split("T")[0];
        }
  );
  const [endDate, setEndDate] = useState(
    selectedBudget?.endDate
      ? selectedBudget.endDate
      : () => {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth() + 1, 1)
            .toISOString()
            .split("T")[0];
        }
  );
  const [yearOffset, setYearOffset] = useState(
    selectedBudget?.period === "yearly"
      ? new Date().getFullYear() -
          new Date(selectedBudget.startDate).getFullYear()
      : 0
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedBudget?.category) {
      const targetCategory = categories.find(
        (category) => category._id === selectedBudget.category
      );
      setSelectedCategory(targetCategory as ICategory);
    }
  }, [selectedBudget?.category]);

  useEffect(() => {
    if (period === "monthly" || period === "customised") {
      const now = new Date();
      setStartDate(
        new Date(now.getFullYear(), now.getMonth(), 2)
          .toISOString()
          .split("T")[0]
      );
      setEndDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 1)
          .toISOString()
          .split("T")[0]
      );
    }

    if (period === "yearly") {
      const now = new Date();
      const year = now.getFullYear() - yearOffset;
      const start = new Date(year, 0, 2); // January 1st of the selected year
      const end = new Date(year, 12, 1); // December 31st of the selected year
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [period, yearOffset]);

  const onModalClose = () => {
    setIsAddEditModalOpen((prev) => ({ ...prev, isOpen: false }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    try {
      if (isAddEditModalOpen.type === "add") {
        await axiosInstance.post("/api/budgets", {
          amount,
          period,
          category: selectedCategory._id,
          startDate,
          endDate,
        });
      }

      if (isAddEditModalOpen.type === "edit" && selectedBudget) {
        await axiosInstance.patch(`/api/budgets/${selectedBudget._id}`, {
          amount,
          period,
          category: selectedCategory._id,
          startDate,
          endDate,
        });
      }

      await fetchBudgets();
      onModalClose();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.msg) {
          if (Array.isArray(error.response.data.msg)) {
            setError(error.response.data.msg[0].msg);
          } else {
            setError(error.response.data.msg);
          }
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onDeleteBudget = async () => {
    if (selectedBudget) {
      try {
        await axiosInstance.delete(`/api/budgets/${selectedBudget._id}`);
        await fetchBudgets();
        onModalClose();
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response && error.response.data.msg) {
            setError(error.response.data.msg);
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  if (!selectedCategory) {
    return null;
  }

  return (
    <div className="relative text-sm pt-2">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={onModalClose}
      />

      <form action="" onSubmit={onSubmit}>
        <div>
          <label className="font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm"
          />
        </div>

        <div className="mt-2.5">
          <p className="font-medium text-gray-700">Category</p>
          <div
            className="mt-1 flex justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm cursor-pointer"
            onClick={onCategoryModalOpen}
          >
            <div className="flex items-center gap-2">
              {selectedCategory.name}
              <CategoryIconBackground categoryType={selectedCategory.type}>
                <img
                  className="w-5 relative"
                  src={`category-icons/${selectedCategory.icon}`}
                  alt={selectedCategory.name}
                />
              </CategoryIconBackground>
            </div>

            <Right theme="filled" size="18" fill="#333" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="font-medium text-gray-700">Period</label>
          <select
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm cursor-pointer"
            onChange={(e) => setPeriod(e.target.value as IPeriod)}
          >
            <option
              selected={selectedBudget?.period === "monthly"}
              value="monthly"
            >
              Monthly
            </option>
            <option
              selected={selectedBudget?.period === "yearly"}
              value="yearly"
            >
              Yearly
            </option>
            <option
              selected={selectedBudget?.period === "customised"}
              value="customised"
            >
              Customised
            </option>
          </select>
        </div>

        {period === "monthly" && (
          <SelectMonth
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
          />
        )}

        {period === "yearly" && (
          <SelectYear
            setYearOffset={setYearOffset}
            startDate={startDate}
            yearOffset={yearOffset}
          />
        )}

        {period === "customised" && (
          <SetCustomDate
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
          />
        )}

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          className="bg-purple-500 hover:bg-purple-600 font-medium text-white py-1.5 rounded-md w-full mt-3"
          type="submit"
        >
          {isAddEditModalOpen.type === "add" ? "Add" : "Update"}
        </button>

        {isAddEditModalOpen.type === "edit" && (
          <button
            className="bg-red-500 hover:bg-red-600 font-medium text-white py-1.5 rounded-md w-full mt-2"
            onClick={onDeleteBudget}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditBudget;
