import React from "react";
import { toCurrency } from "../../utils/helper";

type Props = {
  transactionType: "income" | "expense";
  totalAmount: number;
};

const TotalTransAmount = ({ transactionType, totalAmount }: Props) => {
  return (
    <div className="bg-white py-3 px-4 rounded-lg shadow mt-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {transactionType === "income" ? "Total Income" : "Total Expense"}
      </h2>
      <p
        className={`text-3xl font-bold ${
          transactionType === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        RM {toCurrency(totalAmount)}
      </p>
    </div>
  );
};

export default TotalTransAmount;
