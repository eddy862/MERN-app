import React, { useContext, useEffect, useRef, useState } from "react";
import { IFixedItem } from "../../types/fixedItems";
import { CategoryContext } from "../../contexts/CategoryContext";
import CategoryIconBackground from "../Icons/CategoryIconBackground";
import { getDayName, getOrdinalSuffix } from "../../utils/helper";
import { DeleteFour, Edit } from "@icon-park/react";
import useDebounce from "../../hooks/useDebounce";
import updateFixedItem from "../../services/updateFixedItem";
import { IDeleteFixedItemModal } from "../../pages/FixedItems";

type Props = {
  fixedItem: IFixedItem;
  onEditFixedItemModalOpen: (fixedItem: IFixedItem) => void;
  setIsDeleteFixedItemModalOpen: React.Dispatch<
    React.SetStateAction<IDeleteFixedItemModal>
  >;
};

const FixedItem = ({
  fixedItem,
  onEditFixedItemModalOpen,
  setIsDeleteFixedItemModalOpen,
}: Props) => {
  const { categories } = useContext(CategoryContext);

  const [isActive, setIsActive] = useState(fixedItem.isActive);
  const debouncedIsActive = useDebounce(isActive, 1000);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const updateItem = async () => {
      try {
        await updateFixedItem(fixedItem._id, { isActive: debouncedIsActive });
      } catch (error) {
        console.log(error);
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    updateItem();
  }, [debouncedIsActive]);

  const icon = categories.find(
    (category) => category._id === fixedItem.category
  )?.icon;
  const categoryName = categories.find(
    (category) => category._id === fixedItem.category
  )?.name;
  const timesCreated =
    fixedItem.frequency === "unlimited"
      ? "Unlimited"
      : `${fixedItem.timesCreated}/${fixedItem.frequency}`;

  const daysOfWeek = fixedItem.daysOfWeek
    ?.map((day) => getDayName(day))
    .join(", ");
  const daysOfMonth = fixedItem.daysOfMonth
    ?.map((day) => `${day}${getOrdinalSuffix(day)}`)
    .join(", ");

  const onDeleteFixedItemModalOpen = () => {
    setIsDeleteFixedItemModalOpen({ isOpen: true, itemId: fixedItem._id });
  };

  return (
    <div className="flex justify-between">
      <div className="inline-flex items-center gap-3">
        <CategoryIconBackground categoryType={fixedItem.type}>
          <img
            className="w-7 relative"
            src={`category-icons/${icon}`}
            alt={categoryName}
          />
        </CategoryIconBackground>

        <div className="inline-flex flex-col">
          <div className="inline-flex font-medium sm:text-lg gap-2">
            <p>{fixedItem.description}</p>
            <p className="text-purple-600">RM{fixedItem.amount}</p>
          </div>

          <div className="inline-flex text-xs sm:text-sm text-slate-500 text-wrap overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p>{`${categoryName} - 
            ${fixedItem.period} / 
            ${fixedItem.period === "weekly" ? `${daysOfWeek} - ` : ""}
            ${fixedItem.period === "monthly" ? `${daysOfMonth} - ` : ""}
            ${timesCreated}`}</p>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>

        <Edit
          className="cursor-pointer"
          theme="filled"
          size="16"
          fill="#333"
          onClick={() => onEditFixedItemModalOpen(fixedItem)}
        />

        <DeleteFour
          className="cursor-pointer"
          theme="filled"
          size="16"
          fill="#333"
          onClick={onDeleteFixedItemModalOpen}
        />
      </div>
    </div>
  );
};

export default FixedItem;
