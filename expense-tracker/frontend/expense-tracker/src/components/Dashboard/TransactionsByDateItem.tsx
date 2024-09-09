import React from "react";
import { ITransactionGroup } from "../../types/transactions";
import { toCurrency } from "../../utils/helper";

type Props = {
  group: ITransactionGroup;
};

const TransactionsByDateItem = ({ group }: Props) => {
  const totalAmount = group.transactions.reduce(
    (acc, transaction) =>
      transaction.type === "expense"
        ? acc - transaction.amount
        : acc + transaction.amount,
    0
  );

  return (
    <div className="bg-white py-1 px-3 flex justify-between items-center">
      <h3 className="font-semibold">{group._id.slice(5)}</h3>
      <p className="text-gray-600">RM {toCurrency(totalAmount)}</p>
    </div>
  );
};

export default TransactionsByDateItem;
