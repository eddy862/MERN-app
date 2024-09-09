import React from "react";
import { ITransByCategory } from "../../hooks/useTransactionAnalysis";
import TransactionByCategoryItem from "./TransactionsByCategoryItem";

type Props = {
  transactionsByCategory: ITransByCategory[];
};

const Transactions = ({ transactionsByCategory }: Props) => {
  return (
    <div className="border-2 border-slate-500 rounded-lg overflow-hidden divide-y-2 divide-slate-500 w-full">
      {transactionsByCategory.map((category) => (
        <TransactionByCategoryItem key={category.category} category={category} />
      ))}
    </div>
  );
};

export default Transactions;
