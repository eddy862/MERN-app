import React, { useState } from "react";
import Main from "../layouts/Main";
import TransactionArea from "../components/Transactions/TransactionArea";
import AddTransButton from "../components/Transactions/AddTransButton";
import UseTransactionGroups from "../hooks/useTransactionGroups";
import Modal from "react-modal";
import AddTransInner from "../components/Transactions/AddTransInner";

type Props = {};

export type IModal = {
  type?: "add" | "edit";
  isOpen: boolean;
};

Modal.setAppElement("#root");

const Transactions = (props: Props) => {
  const { transactionGroups, loading } = UseTransactionGroups({});
  const [isModalOpen, setIsModalOpen] = useState<IModal>({ isOpen: false });

  return (
    <Main>
      <TransactionArea
        transactionGroups={transactionGroups}
        loading={loading}
      />

      <AddTransButton
        toggleModal={() => setIsModalOpen({ type: "add", isOpen: true })}
      />

      <Modal
        isOpen={isModalOpen.isOpen}
        onRequestClose={() => setIsModalOpen({ isOpen: false })}
        contentLabel="Example Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white mx-auto mt-28 rounded-md outline-none p-3"
      >
        <AddTransInner isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </Main>
  );
};

export default Transactions;
