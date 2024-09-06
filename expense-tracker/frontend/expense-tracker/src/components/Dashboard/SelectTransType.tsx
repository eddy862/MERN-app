import React from "react";

type Props = {
  transactionsType: "expense" | "income";
  setTransactionsType: React.Dispatch<React.SetStateAction<"expense" | "income">>;
};

const SelectTransType = ({ transactionsType, setTransactionsType }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-slate-600 rounded divide-x-2 divide-slate-600 overflow-hidden">
        <button
          className={`px-2 py-1 ${
            transactionsType === "expense" ? "bg-pink-400 text-white" : ""
          }`}
          onClick={() => setTransactionsType("expense")}
        >
          Expense
        </button>
        <button
          className={`px-2 py-1 ${
            transactionsType === "income" ? "bg-blue-400 text-white" : ""
          }`}
          onClick={() => setTransactionsType("income")}
        >
          Income
        </button>
      </div>
    </div>
  );
};

export default SelectTransType;
