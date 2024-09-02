import React, { useState } from "react";
import Main from "../layouts/Main";
import TransactionArea from "../components/Transactions/TransactionArea";
import AddTransButton from "../components/Transactions/AddTransButton";
import UseTransactionGroups from "../hooks/useTransactionGroups";
import Modal from "react-modal";
import AddEditTransInner from "../components/Modals/AddEditTransInner";
import { ITransaction } from "../types/transactions";
import AddCategoriesInner from "../components/Modals/AddCategoriesInner";

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
  const { transactionGroups, loading, fetchTransGroups } = UseTransactionGroups(
    {}
  );
  const [isTransModalOpen, setIsTransModalOpen] = useState<ITransModal>({
    isOpen: false,
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<ICategoryModal>({
      isOpen: false,
    });

  return (
    <Main>
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
        <AddCategoriesInner isCategoryModalOpen={isCategoryModalOpen} setIsCategoryModalOpen={setIsCategoryModalOpen} />
      </Modal>
    </Main>
  );
};

export default Transactions;
