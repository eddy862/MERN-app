import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ITransactionGroup } from "../../types/transactions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  transactionGroups: ITransactionGroup[];
  groupByDate: "day" | "month";
};

const TransactionsByDateChart = ({ transactionGroups, groupByDate }: Props) => {
  const labels = transactionGroups.map(group => group._id.slice(5));
  const amounts = transactionGroups.map(group => 
    group.transactions.reduce((acc, transaction) => 
      transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount, 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Amount',
        data: amounts,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: groupByDate === "day" ? "Day" : "Month"
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (RM)'
        }
      }
    }
  };

  return (
    <div className="w-96 md:w-full h-52 flex justify-center items-center">
      <Line options={options} data={data} />
    </div>
  );
};

export default TransactionsByDateChart;