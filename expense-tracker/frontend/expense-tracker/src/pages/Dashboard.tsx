import React, { useEffect, useState } from "react";
import Main from "../layouts/Main";
import useTransactionAnalysis, {
  ITransByCategory,
} from "../hooks/useTransactionAnalysis";
import TransactionsByCategoryChart from "../components/Dashboard/TransactionsByCategoryChart";
import TransactionsByCategory from "../components/Dashboard/TransactionsByCategory";
import SelectTimeFrame from "../components/Dashboard/SelectTimeFrame";
import SelectTransType from "../components/Dashboard/SelectTransType";
import SelectMonth from "../components/Dashboard/SelectMonth";
import TotalTransAmount from "../components/Dashboard/TotalTransAmount";
import SelectSixMonths from "../components/Dashboard/SelectSixMonths";
import SelectYear from "../components/Dashboard/SelectYear";
import SetCustomDate from "../components/Dashboard/SetCustomDate";
import useTransactionGroups from "../hooks/useTransactionGroups";
import SelectBalanceTimeFrame from "../components/Dashboard/SelectBalanceTimeFrame";
import TransactionsByDate from "../components/Dashboard/TransactionsByDate";
import TransactionsByDateChart from "../components/Dashboard/TransactionsByDateChart";
import SetCustomMonth from "../components/Dashboard/SetCustomMonth";

type Props = {};

const Dashboard = (props: Props) => {
  useEffect(() => {
    // Retrieve access token and refresh token from cookies
    const accessToken = getCookieValue("token");
    const refreshToken = getCookieValue("refreshToken");

    if (accessToken && refreshToken) {
      // Save tokens to localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Optionally: Clear the cookies after transferring to localStorage
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, []);

  const [transactionsType, setTransactionsType] = useState<
    "income" | "expense" | "balance"
  >("expense");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<
    "monthly" | "last6months" | "year" | "custom"
  >("monthly");
  const [selectedBalanceTimeFrame, setSelectedBalanceTimeFrame] = useState<
    "monthly" | "year" | "custom"
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
    if (
      selectedTimeFrame === "monthly" ||
      selectedTimeFrame === "custom" ||
      selectedBalanceTimeFrame === "monthly" ||
      selectedBalanceTimeFrame === "custom"
    ) {
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

    if (selectedTimeFrame === "year" || selectedBalanceTimeFrame === "year") {
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
    loading,
  } = useTransactionAnalysis(startDate, endDate);

  const { transactionGroups } = useTransactionGroups({
    startDate,
    endDate,
    groupByDate: selectedBalanceTimeFrame === "monthly" ? "day" : "month",
  });

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
    transactionsType === "expense"
      ? totalExpense
      : transactionsType === "income"
      ? totalIncome
      : balance;

  if (loading) {
    return (
      <Main>
        <p className="text-center text-gray-500 mt-5">Loading...</p>
      </Main>
    );
  }

  return (
    <Main>
      <SelectTransType
        transactionsType={transactionsType}
        setTransactionsType={setTransactionsType}
      />

      {transactionsType !== "balance" ? (
        <SelectTimeFrame
          selectedTimeFrame={selectedTimeFrame}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
      ) : (
        <SelectBalanceTimeFrame
          selectedBalanceTimeFrame={selectedBalanceTimeFrame}
          setSelectedBalanceTimeFrame={setSelectedBalanceTimeFrame}
        />
      )}

      {(((transactionsType === "income" || transactionsType === "expense") &&
        selectedTimeFrame === "monthly") ||
        (transactionsType === "balance" &&
          selectedBalanceTimeFrame === "monthly")) && (
        <SelectMonth
          startDate={startDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}

      {selectedTimeFrame === "last6months" &&
        transactionsType !== "balance" && (
          <SelectSixMonths
            sixMonthsOffset={sixMonthsOffset}
            setSixMonthsOffset={setSixMonthsOffset}
            startDate={startDate}
            endDate={endDate}
          />
        )}

      {(((transactionsType === "income" || transactionsType === "expense") &&
        selectedTimeFrame === "year") ||
        (transactionsType === "balance" &&
          selectedBalanceTimeFrame === "year")) && (
        <SelectYear
          startDate={startDate}
          yearOffset={yearOffset}
          setYearOffset={setYearOffset}
        />
      )}

      {transactionsType === "balance" &&
        selectedBalanceTimeFrame === "custom" && (
          <SetCustomMonth
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        )}

      {(transactionsType === "income" || transactionsType === "expense") &&
        selectedTimeFrame === "custom" && (
          <SetCustomDate
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        )}

      <TotalTransAmount
        transactionType={transactionsType}
        totalAmount={totalAmount}
      />

      {transactionsType === "balance" && transactionGroups.length > 0 ? (
        <div className="flex flex-col items-center md:items-start gap-y-3 md:gap-x-6 md:flex-row">
          <TransactionsByDateChart
            transactionGroups={transactionGroups}
            groupByDate={
              selectedBalanceTimeFrame === "monthly" ? "day" : "month"
            }
          />
          <TransactionsByDate transactionGroups={transactionGroups} />
        </div>
      ) : transactionsType !== "balance" &&
        targetTransactionsByCategory.length > 0 ? (
        <div className="flex flex-col items-center md:items-start gap-y-3 md:gap-x-8 md:flex-row">
          <TransactionsByCategoryChart
            transactionsByCategory={targetTransactionsByCategory}
          />

          <TransactionsByCategory
            transactionsByCategory={targetTransactionsByCategory}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-5">No transactions found</p>
      )}
    </Main>
  );
};

export default Dashboard;

function getCookieValue(name: string) {
  const cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    let [key, value] = cookie.split("=");
    key = key.trim();
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
