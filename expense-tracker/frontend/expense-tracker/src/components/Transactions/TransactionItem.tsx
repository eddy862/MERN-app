import React, { useContext, useMemo } from "react";
import { ITransaction } from "../../types/transactions";
import { CategoryContext } from "../../contexts/CategoryContext";
import { toCurrency } from "../../utils/helper";

type Props = {
  transaction: ITransaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const categories = useContext(CategoryContext);

  const category = useMemo(() => (
    categories.find((cat) => cat._id === transaction.category)
  ), [categories, transaction.category]);

  return (
    <li className="flex justify-between items-center py-2">
      <div className="flex gap-2 items-center">
        <img className="w-5" src={`icons/${category?.icon}`} alt={category?.name} />
        <p>{transaction.description}</p>
      </div>
      <div>
        RM {transaction.type === "expense" && "-"}
        {toCurrency(transaction.amount)}
      </div>
    </li>
  );
};

export default TransactionItem;
