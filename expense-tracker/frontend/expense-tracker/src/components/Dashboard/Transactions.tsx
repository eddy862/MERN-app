import React from "react";
import { ITransByCategory } from "../../hooks/useTransactionAnalysis";
import TransactionItem from "./TransactionItem";

type Props = {
  transactionsByCategory: ITransByCategory[];
};

const Transactions = ({ transactionsByCategory }: Props) => {
  return (
    <div className="border-2 border-slate-500 rounded-lg overflow-hidden divide-y-2 divide-slate-500 w-full">
      {transactionsByCategory.map((category) => (
        <TransactionItem key={category.category} category={category} />
      ))}
    </div>
  );
};

export default Transactions;
