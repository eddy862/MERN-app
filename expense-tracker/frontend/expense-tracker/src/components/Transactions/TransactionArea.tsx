import React from "react";
import TransactionGroup from "./TransactionGroup";
import UseTransactionGroups from "../../hooks/useTransactionGroups";
import { ITransactionGroup } from "../../types/transactions";
import { IModal } from "../../pages/Transactions";

type Props = {
  transactionGroups: ITransactionGroup[];
  loading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<IModal>>
};

const TransactionArea = ({ transactionGroups, loading, setIsModalOpen }: Props) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (transactionGroups.length === 0) {
    return <p>No transaction</p>;
  }

  return (
    <div className="flex flex-col gap-2 font-semibold overflow-y-auto">
      {transactionGroups.map((group) => (
        <TransactionGroup key={group._id} group={group} setIsModalOpen={setIsModalOpen} />
      ))}
    </div>
  );
};

export default TransactionArea;
