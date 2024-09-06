import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ITransaction } from "../types/transactions";
import { ICategory } from "../types/categories";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export type ITransByCategory = {
  category: string;
  amount: number;
  icon: string;
};

const useTransactionAnalysis = (startDate: string, endDate: string) => {
  const [balance, setBalance] = useState(0);
  const [expenseByCategory, setExpenseByCategory] = useState<
    ITransByCategory[]
  >([]);
  const [incomeByCategory, setIncomeByCategory] = useState<ITransByCategory[]>(
    []
  );
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const resp1 = await axiosInstance.get("/api/categories");

      const categories: ICategory[] = resp1.data.categories;

      const resp2 = await axiosInstance.get("/api/transactions", {
        params: {
          startDate,
          endDate,
        },
      });

      const transactions: ITransaction[] = resp2.data.transactions;

      let totalIncome = 0;
      let totalExpense = 0;
      
      const balance = transactions.reduce(
        (acc: any, transaction: ITransaction) => {
          if (transaction.type === "income") {
            totalIncome += transaction.amount;
            return acc + transaction.amount;
          } else {
            totalExpense += transaction.amount;
            return acc - transaction.amount;
          }
        },
        0
      );

      const expenseByCategory = categories.map((category: ICategory) => {
        const amount = transactions.reduce((acc: number, transaction: any) => {
          return (
            acc +
            (transaction.category === category._id &&
            transaction.type === "expense"
              ? transaction.amount
              : 0)
          );
        }, 0);
        return { category: category.name, amount, icon: category.icon };
      });

      const incomeByCategory = categories.map((category: ICategory) => {
        const amount = transactions.reduce((acc: number, transaction: any) => {
          return (
            acc +
            (transaction.category === category._id &&
            transaction.type === "income"
              ? transaction.amount
              : 0)
          );
        }, 0);
        return { category: category.name, amount, icon: category.icon };
      });

      setBalance(balance);
      setExpenseByCategory(expenseByCategory);
      setIncomeByCategory(incomeByCategory);
      setTotalIncome(totalIncome);
      setTotalExpense(totalExpense);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [startDate, endDate]);

  return { balance, expenseByCategory, incomeByCategory, totalIncome, totalExpense };
};

export default useTransactionAnalysis;
