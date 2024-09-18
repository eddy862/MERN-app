import React, { useContext, useState } from "react";
import { ICategoryModal, ITransModal } from "../../pages/Transactions";
import { CloseSmall } from "@icon-park/react";
import { CategoryContext } from "../../contexts/CategoryContext";
import Categories from "../Categories/Categories";
import axiosInstance from "../../utils/axiosInstance";
import { isAxiosError } from "axios";

type Props = {
  isTransModalOpen: ITransModal;
  setIsTransModalOpen: React.Dispatch<React.SetStateAction<ITransModal>>;
  fetchTransactionGroups: () => Promise<void>;
  setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<ICategoryModal>>;
};

const AddEditTransInner = ({
  isTransModalOpen,
  setIsTransModalOpen,
  fetchTransactionGroups,
  setIsCategoryModalOpen,
}: Props) => {
  const { categories } = useContext(CategoryContext);

  const expenses = categories.filter((category) => category.type === "expense");
  const incomes = categories.filter((category) => category.type === "income");

  const selectedTransaction = isTransModalOpen.selectedTrans;

  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    selectedTransaction?.type || "expense"
  );
  const [selectedExpenseId, setSelectedExpenseId] = useState(
    selectedTransaction?.type === "expense"
      ? selectedTransaction.category
      : expenses[0]._id
  );
  const [selectedIncomeId, setSelectedIncomeId] = useState(
    selectedTransaction?.type === "income"
      ? selectedTransaction.category
      : incomes[0]._id
  );
  const [amount, setAmount] = useState(
    selectedTransaction?.amount.toString() || "0"
  );
  const [date, setDate] = useState(
    selectedTransaction?.date
      ? selectedTransaction.date.split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState(
    selectedTransaction?.description || ""
  );
  const [error, setError] = useState("");

  const deleteTransaction = async () => {
    try {
      if (selectedTransaction) {
        await axiosInstance.delete(
          `/api/transactions/${selectedTransaction._id}`
        );
        await fetchTransactionGroups();
        setIsTransModalOpen({ isOpen: false });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.msg) {
          setError(error.response.data.msg);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount.length > 10) {
      setError("Amount cannot exceed 10 digits");
      return;
    }

    if (description.length > 100) {
      setError("Description cannot exceed 100 characters");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    const categoryId =
      transactionType === "expense" ? selectedExpenseId : selectedIncomeId;

    try {
      if (isTransModalOpen.type === "add") {
        await axiosInstance.post("/api/transactions", {
          amount,
          type: transactionType,
          description,
          category: categoryId,
          date,
        });
      }

      if (isTransModalOpen.type === "edit" && selectedTransaction) {
        await axiosInstance.patch(
          `/api/transactions/${selectedTransaction._id}`,
          {
            amount,
            type: transactionType,
            description,
            category: categoryId,
            date,
          }
        );
      }

      await fetchTransactionGroups();

      setIsTransModalOpen({ isOpen: false });
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

  return (
    <div className="relative">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={() => setIsTransModalOpen({ isOpen: false })}
      />

      <div className="flex justify-center text-sm font-medium">
        <div
          className={`${
            transactionType === "expense" ? "bg-pink-400" : ""
          } py-2 px-3 rounded-l-full cursor-pointer border-r-[1px] border-t-2 border-l-2 border-b-2 border-slate-700`}
          onClick={() => setTransactionType("expense")}
        >
          Expense
        </div>
        <div
          className={`${
            transactionType === "income" ? "bg-blue-400" : ""
          } py-2 px-3 rounded-r-full cursor-pointer border-l-[1px] border-t-2 border-r-2 border-b-2 border-slate-700 `}
          onClick={() => setTransactionType("income")}
        >
          Income
        </div>
      </div>

      <Categories
        transactionType={transactionType}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        type={transactionType}
        expenses={expenses}
        incomes={incomes}
        selectedExpenseId={selectedExpenseId}
        selectedIncomeId={selectedIncomeId}
        setSelectedExpenseId={setSelectedExpenseId}
        setSelectedIncomeId={setSelectedIncomeId}
      />

      <form onSubmit={addTransaction} className="mt-3">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm"
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none text-sm"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="py-2 flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-medium"
          >
            {isTransModalOpen.type === "add" ? "Add" : "Update"} Transaction
          </button>

          {isTransModalOpen.type === "edit" && (
            <button
              className="py-2 flex-1 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
              onClick={deleteTransaction}
            >
              Delete Transaction
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditTransInner;
