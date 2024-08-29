import React from "react";
import { ITransaction } from "../../types/transactions";

type Props = {
  transaction: ITransaction;
};

const TransactionItem = ({ transaction }: Props) => {
  return (
    <li className="flex justify-between items-center py-2">
      <div>{transaction.description}</div>
      <div>
        RM {transaction.type === "expense" && "-"}
        {transaction.amount}{" "}
      </div>
    </li>
  );
};

export default TransactionItem;
