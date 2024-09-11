import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type Props = {
  balance: number;
  totalIncome: number;
  totalExpense: number;
};

const IncomeExpensePie = ({ balance, totalIncome, totalExpense }: Props) => {
  const pieChartData = useMemo(
    () => [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
    ],
    [totalIncome, totalExpense]
  );

  const COLORS = ["#60a5fa", "#f472b6"];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Balance: RM {balance.toFixed(2)}
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              stroke="#000000" 
            >
              {pieChartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#000000"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                `RM ${typeof value === "number" ? value.toFixed(2) : value}`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpensePie;
