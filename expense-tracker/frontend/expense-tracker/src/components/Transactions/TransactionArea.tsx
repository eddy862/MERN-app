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
    return <p>Loading...</p>;
  }

  if (transactionGroups.length === 0) {
    return <p>No transaction</p>;
  }

  return (
    <div className="flex flex-col gap-2 font-semibold overflow-y-auto">
      {transactionGroups.map((group) => (
        <TransactionGroup key={group._id} group={group} setIsTransModalOpen={setIsTransModalOpen} />
      ))}
    </div>
  );
};

export default TransactionArea;
