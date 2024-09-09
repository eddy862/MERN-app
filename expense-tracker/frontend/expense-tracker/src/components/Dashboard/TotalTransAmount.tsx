import React from "react";
import { toCurrency } from "../../utils/helper";

type Props = {
  transactionType: "income" | "expense" | "balance";
  totalAmount: number;
};

const TotalTransAmount = ({ transactionType, totalAmount }: Props) => {
  const title = transactionType === "expense" ? "Total Income" : transactionType === "income" ? "Total Income" : "Balance";

  return (
    <div className="bg-white py-3 px-4 rounded-lg shadow mt-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>
      <p
        className={`text-3xl font-bold ${
          transactionType === "income" ? "text-green-600" : transactionType === "expense" ? "text-red-600" : "text-slate-600"
        }`}
      >
        RM {toCurrency(totalAmount)}
      </p>
    </div>
  );
};

export default TotalTransAmount;
