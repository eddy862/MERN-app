import React from "react";
import { ITransactionGroup } from "../../types/transactions";
import TransactionsByDateItem from "./TransactionsByDateItem";

type Props = {
  transactionGroups: ITransactionGroup[];
};

const TransactionsByDate = ({ transactionGroups }: Props) => {
  return (
    <div className="border-2 border-slate-500 rounded-lg overflow-hidden divide-y-2 divide-slate-500 w-full">
      {transactionGroups.map((group) => (
        <TransactionsByDateItem key={group._id} group={group} />
      ))}
    </div>
  );
};

export default TransactionsByDate;
