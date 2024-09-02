import React, { useContext, useMemo } from "react";
import { ITransaction } from "../../types/transactions";
import { CategoryContext } from "../../contexts/CategoryContext";
import { toCurrency } from "../../utils/helper";
import { ITransModal } from "../../pages/Transactions";

type Props = {
  transaction: ITransaction;
  setIsTransModalOpen: React.Dispatch<React.SetStateAction<ITransModal>>;
};

const TransactionItem = ({ transaction, setIsTransModalOpen }: Props) => {
  const { categories } = useContext(CategoryContext);

  const category = useMemo(
    () => categories.find((cat) => cat._id === transaction.category),
    [categories, transaction.category]
  );

  return (
    <li
      className="flex justify-between items-center py-2 cursor-pointer hover:bg-slate-100 px-3"
      onClick={() =>
        setIsTransModalOpen({
          isOpen: true,
          type: "edit",
          selectedTrans: transaction,
        })
      }
    >
      <div className="flex gap-2 items-center">
        <div
          className={`relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full ${
            transaction.type === "expense"
              ? "before:bg-pink-400"
              : "before:bg-blue-400"
          } before:bottom-1/2 before:right-1/2 before:translate-x-1/2 before:translate-y-1/2`}
        >
          <img
            className="relative w-6"
            src={`./category-icons/${category?.icon}`}
            alt={category?.name}
          />
        </div>
        <p>{transaction.description}</p>
      </div>
      <div>
        RM {transaction.type === "expense" && "-"}
        {toCurrency(transaction.amount)}
      </div>
    </li>
  );
};

export default TransactionItem;
