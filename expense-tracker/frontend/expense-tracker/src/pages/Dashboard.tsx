import React, { useEffect, useState } from "react";
import Main from "../layouts/Main";
import useTransactionAnalysis, {
  ITransByCategory,
} from "../hooks/useTransactionAnalysis";
import TransactionsByCategory from "../components/Dashboard/TransactionsByCategory";
import Transactions from "../components/Dashboard/Transactions";
import SelectTimeFrame from "../components/Dashboard/SelectTimeFrame";
import SelectTransType from "../components/Dashboard/SelectTransType";
import SelectMonth from "../components/Dashboard/SelectMonth";
import TotalTransAmount from "../components/Dashboard/TotalTransAmount";
import SelectSixMonths from "../components/Dashboard/SelectSixMonths";
import SelectYear from "../components/Dashboard/SelectYear";
import SetCustomDate from "../components/Dashboard/setCustomDate";

type Props = {};

const Dashboard = (props: Props) => {
  const [transactionsType, setTransactionsType] = useState<
    "income" | "expense"
  >("expense");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<
    "monthly" | "last6months" | "year" | "custom"
  >("monthly");
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 2)
      .toISOString()
      .split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
      .toISOString()
      .split("T")[0];
  });
  const [sixMonthsOffset, setSixMonthsOffset] = useState(0);
  const [yearOffset, setYearOffset] = useState(0);

  useEffect(() => {
    if (selectedTimeFrame === "monthly" || selectedTimeFrame === "custom") {
      const now = new Date();
      setStartDate(
        new Date(now.getFullYear(), now.getMonth(), 2)
          .toISOString()
          .split("T")[0]
      );
      setEndDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 1)
          .toISOString()
          .split("T")[0]
      );
    }

    if (selectedTimeFrame === "last6months") {
      const now = new Date();
      const end = new Date(
        now.getFullYear(),
        now.getMonth() - sixMonthsOffset + 1,
        1
      );
      const start = new Date(end);
      start.setMonth(end.getMonth() - 6);
      start.setDate(start.getDate() + 1);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }

    if (selectedTimeFrame === "year") {
      const now = new Date();
      const year = now.getFullYear() - yearOffset;
      const start = new Date(year, 0, 2); // January 1st of the selected year
      const end = new Date(year, 12, 1); // December 31st of the selected year
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [selectedTimeFrame, sixMonthsOffset, yearOffset]);

  const {
    balance,
    expenseByCategory,
    incomeByCategory,
    totalIncome,
    totalExpense,
  } = useTransactionAnalysis(startDate, endDate);

  const filteredExpenseByCategory = expenseByCategory.filter(
    (category: ITransByCategory) => category.amount > 0
  );
  const filteredIncomeByCategory = incomeByCategory.filter(
    (category: ITransByCategory) => category.amount > 0
  );

  const targetTransactionsByCategory =
    transactionsType === "expense"
      ? filteredExpenseByCategory
      : filteredIncomeByCategory;

  const totalAmount =
    transactionsType === "expense" ? totalExpense : totalIncome;

  return (
    <Main>
      <SelectTransType
        transactionsType={transactionsType}
        setTransactionsType={setTransactionsType}
      />

      <SelectTimeFrame
        selectedTimeFrame={selectedTimeFrame}
        setSelectedTimeFrame={setSelectedTimeFrame}
      />

      {selectedTimeFrame === "monthly" && (
        <SelectMonth
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      {selectedTimeFrame === "last6months" && (
        <SelectSixMonths
          sixMonthsOffset={sixMonthsOffset}
          setSixMonthsOffset={setSixMonthsOffset}
          startDate={startDate}
          endDate={endDate}
        />
      )}

      {selectedTimeFrame === "year" && (
        <SelectYear
          startDate={startDate}
          endDate={endDate}
          yearOffset={yearOffset}
          setYearOffset={setYearOffset}
        />
      )}

      {selectedTimeFrame === "custom" && (
        <SetCustomDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}

      {targetTransactionsByCategory.length > 0 ? (
        <>
          <TotalTransAmount
            transactionType={transactionsType}
            totalAmount={totalAmount}
          />

          <div className="flex flex-col items-center md:items-start gap-2 md:flex-row md:gap-4">
            <TransactionsByCategory
              transactionsByCategory={targetTransactionsByCategory}
            />

            <Transactions
              transactionsByCategory={targetTransactionsByCategory}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-5">No transactions found</p>
      )}
    </Main>
  );
};

export default Dashboard;
