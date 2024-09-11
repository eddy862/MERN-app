import React, { useEffect, useMemo, useState } from "react";
import Main from "../layouts/Main";
import TransactionArea from "../components/Transactions/TransactionArea";
import AddTransButton from "../components/Transactions/AddTransButton";
import UseTransactionGroups from "../hooks/useTransactionGroups";
import Modal from "react-modal";
import AddEditTransInner from "../components/Modals/AddEditTransInner";
import { ITransaction } from "../types/transactions";
import AddCategoriesInner from "../components/Modals/AddCategoriesInner";
import SelectDate from "../components/Transactions/SelectDate";
import IncomeExpensePie from "../components/Transactions/IncomeExpensePie";

type Props = {};

export type ITransModal = {
  type?: "add" | "edit";
  isOpen: boolean;
  selectedTrans?: ITransaction;
};

export type ICategoryModal = {
  isOpen: boolean;
  type?: "expense" | "income";
};

Modal.setAppElement("#root");

const Transactions = (props: Props) => {
  const [isTransModalOpen, setIsTransModalOpen] = useState<ITransModal>({
    isOpen: false,
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<ICategoryModal>({
      isOpen: false,
    });
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
  const [monthOffset, setMonthOffset] = useState(0);
  const [yearOffset, setYearOffset] = useState(0);

  // Update start and end date when monthOffset changes
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() + monthOffset, 2)
      .toISOString()
      .split("T")[0];
    const end = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 1)
      .toISOString()
      .split("T")[0];
    setStartDate(start);
    setEndDate(end);
  }, [monthOffset]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(
      now.getFullYear() + yearOffset,
      now.getMonth() + monthOffset,
      2
    )
      .toISOString()
      .split("T")[0];
    const end = new Date(
      now.getFullYear() + yearOffset,
      now.getMonth() + monthOffset + 1,
      1
    )
      .toISOString()
      .split("T")[0];
    setStartDate(start);
    setEndDate(end);
  }, [yearOffset]);

  const { transactionGroups, loading, fetchTransGroups } = UseTransactionGroups(
    { startDate, endDate }
  );

  let totalIncome = 0;
  let totalExpense = 0;

  const balance = useMemo(() => {
    return transactionGroups.reduce((acc, transaction) => {
      return (
        acc +
        transaction.transactions.reduce((acc, transaction) => {
          if (transaction.type === "expense") {
            totalExpense += transaction.amount;
            return acc - transaction.amount;
          } else {
            totalIncome += transaction.amount;
            return acc + transaction.amount;
          }
        }, 0)
      );
    }, 0);
  }, [transactionGroups]);

  return (
    <Main>
      <SelectDate
        startDate={startDate}
        setMonthOffset={setMonthOffset}
        setYearOffset={setYearOffset}
      />

      {transactionGroups.length > 0 && <IncomeExpensePie
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />}

      <TransactionArea
        transactionGroups={transactionGroups}
        loading={loading}
        setIsTransModalOpen={setIsTransModalOpen}
      />

      <AddTransButton
        toggleModal={() =>
          setIsTransModalOpen((prev) => ({
            ...prev,
            type: "add",
            isOpen: true,
          }))
        }
      />

      <Modal
        isOpen={isTransModalOpen.isOpen}
        onRequestClose={() =>
          setIsTransModalOpen((prev) => ({ ...prev, isOpen: false }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white mx-auto mt-16 rounded-md outline-none px-3 py-4"
      >
        <AddEditTransInner
          isTransModalOpen={isTransModalOpen}
          setIsTransModalOpen={setIsTransModalOpen}
          fetchTransactionGroups={fetchTransGroups}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen.isOpen}
        onRequestClose={() =>
          setIsCategoryModalOpen((prev) => ({ ...prev, isOpen: false }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-h-3/4 bg-white mx-auto mt-20 rounded-md outline-none px-3 py-4"
      >
        <AddCategoriesInner
          isCategoryModalOpen={isCategoryModalOpen}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
        />
      </Modal>
    </Main>
  );
};

export default Transactions;
