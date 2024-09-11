import React, { useContext, useState } from "react";
import { IFixedItem } from "../../types/fixedItems";
import { CategoryContext } from "../../contexts/CategoryContext";
import CategoryIconBackground from "../Icons/CategoryIconBackground";
import { getDayName, getOrdinalSuffix } from "../../utils/helper";
type Props = {
  fixedItem: IFixedItem;
};

const FixedItem = ({ fixedItem }: Props) => {
  const { categories } = useContext(CategoryContext);

  const [isActive, setIsActive] = useState(fixedItem.isActive);

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
          <div className="inline-flex font-medium text-lg gap-2">
            <p>{fixedItem.description}</p>
            <p className="text-purple-600">RM{fixedItem.amount}</p>
          </div>

          <div className="inline-flex text-sm text-slate-500 text-wrap">
            <p>{`${categoryName} - 
            ${fixedItem.period} / 
            ${fixedItem.period === "weekly" ? `${daysOfWeek} - ` : ""}
            ${fixedItem.period === "monthly" ? `${daysOfMonth} - ` : ""}
            ${timesCreated}`}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default FixedItem;
