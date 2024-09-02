import React from "react";
import { ITransactionGroup } from "../../types/transactions";
import TransactionItem from "./TransactionItem";
import { toCurrency } from "../../utils/helper";
import { ITransModal } from "../../pages/Transactions";

type Props = {
  group: ITransactionGroup;
  setIsTransModalOpen: React.Dispatch<React.SetStateAction<ITransModal>>
};

const TransactionGroup = ({ group, setIsTransModalOpen }: Props) => {
  const totalTransactionAmount = group.transactions.reduce(
    (acc, transaction) =>
      transaction.type === "expense"
        ? acc - transaction.amount
        : acc + transaction.amount,
    0
  );

  const date = new Date(group._id);
  const formattedDate = date.toLocaleDateString("en-MY", { weekday: "short" });

  return (
    <div className="border-2 border-slate-500 rounded bg-white">
      <div className="py-2 px-3 border-b-2 border-slate-500 flex justify-between items-center">
        <div className="inline-flex gap-2">
          <p>{group._id}</p>
          <p>{formattedDate}</p>
        </div>
        <p
          className={`${
            totalTransactionAmount > 0
              ? "text-green-500"
              : totalTransactionAmount < 0
              ? "text-red-500"
              : "text-slate-500"
          }`}
        >
          RM {toCurrency(totalTransactionAmount)}
        </p>
      </div>
      <ul className="divide-y-2">
        {group.transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} setIsTransModalOpen={setIsTransModalOpen} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionGroup;
