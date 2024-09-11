import React from "react";
import TransactionGroup from "./TransactionGroup";
import { ITransactionGroup } from "../../types/transactions";
import { ITransModal } from "../../pages/Transactions";

type Props = {
  transactionGroups: ITransactionGroup[];
  loading: boolean;
  setIsTransModalOpen: React.Dispatch<React.SetStateAction<ITransModal>>
};

const TransactionArea = ({ transactionGroups, loading, setIsTransModalOpen }: Props) => {
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (transactionGroups.length === 0) {
    return <p className="text-center text-gray-500">No transaction</p>;
  }

  return (
    <div className="flex flex-col gap-2 font-semibold overflow-y-auto pb-16">
      {transactionGroups.map((group) => (
        <TransactionGroup key={group._id} group={group} setIsTransModalOpen={setIsTransModalOpen} />
      ))}
    </div>
  );
};

export default TransactionArea;
