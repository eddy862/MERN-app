import React, { useContext, useState } from "react";
import { IModal } from "../../pages/Transactions";
import { CloseSmall, Delete } from "@icon-park/react";
import { CategoryContext } from "../../contexts/CategoryContext";
import Categories from "../Categories/Categories";
import axiosInstance from "../../utils/axiosInstance";
import { isAxiosError } from "axios";

type Props = {
  isModalOpen: IModal;
  setIsModalOpen: React.Dispatch<React.SetStateAction<IModal>>;
  fetchTransactionGroups: () => Promise<void>;
};

const AddTransInner = ({
  isModalOpen,
  setIsModalOpen,
  fetchTransactionGroups,
}: Props) => {
  const categories = useContext(CategoryContext);

  const expenses = categories.filter((category) => category.type === "expense");
  const incomes = categories.filter((category) => category.type === "income");

  const selectedTransaction = isModalOpen.selectedTrans;

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
  const [amount, setAmount] = useState(selectedTransaction?.amount || "0");
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
        await axiosInstance.delete(`/api/transactions/${selectedTransaction._id}`);
        await fetchTransactionGroups();
        setIsModalOpen({ isOpen: false });
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
  }

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryId =
      transactionType === "expense" ? selectedExpenseId : selectedIncomeId;

    try {
      if (isModalOpen.type === "add") {
        await axiosInstance.post("/api/transactions", {
          amount,
          type: transactionType,
          description,
          category: categoryId,
          date,
        });
      }

      if (isModalOpen.type === "edit" && selectedTransaction) {
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

      setIsModalOpen({ isOpen: false });
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
    <div className="relative z-20">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={() => setIsModalOpen({ isOpen: false })}
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
            className="py-2 flex-1 bg-purple-500 hover:bg-purple-400 text-white rounded-md font-medium"
          >
            {isModalOpen.type === "add" ? "Add" : "Update"} Transaction
          </button>

          {isModalOpen.type === "edit" && (
            <button
              className="py-2 flex-1 bg-slate-400 hover:bg-slate-300 text-white rounded-md font-medium"
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

export default AddTransInner;
