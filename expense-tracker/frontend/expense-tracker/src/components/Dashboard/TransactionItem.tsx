import React from "react";
import { ITransByCategory } from "../../hooks/useTransactionAnalysis";
import { toCurrency } from "../../utils/helper";

type Props = {
  category: ITransByCategory;
};

const TransactionItem = ({ category }: Props) => {
  return (
    <div className="bg-white py-2 px-3 flex justify-between items-center">
      <div className="inline-flex items-center gap-2">
        <img className="w-5" src={`./category-icons/${category.icon}`} alt="" />
        <p>{category.category}</p>
      </div>
      <p>RM {toCurrency(category.amount)}</p>
    </div>
  );
};

export default TransactionItem;
