import { CloseSmall } from "@icon-park/react";
import React, { useEffect, useState } from "react";
import { ISchedule } from "../../pages/FixedItems";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysOfMonth = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

type Props = {
  onModalClose: () => void;
  selectedSchedule: ISchedule;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<ISchedule>>;
};

const SelectFixedItemSchedule = ({
  onModalClose,
  selectedSchedule,
  setSelectedSchedule,
}: Props) => {
  const [error, setError] = useState("");

  const handlePeriodClick = (period: "weekly" | "monthly") => {
    setSelectedSchedule((prev) => ({
      ...prev,
      period: period,
    }));
  };

  const handleDaysOfWeekChange = (index: number) => {
    setSelectedSchedule((prev) => {
      const newDaysOfWeek = prev.daysOfWeek.includes(index)
        ? prev.daysOfWeek.filter((day) => day !== index)
        : [...prev.daysOfWeek, index];

      if (newDaysOfWeek.length === 0) {
        setError("At least one day must be selected");
        return prev;
      }

      setError("");

      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  const handleDayOfMonthChange = (index: number) => {
    setSelectedSchedule((prev) => {
      const newDaysOfMonth = prev.daysOfMonth.includes(index)
        ? prev.daysOfMonth.filter((day) => day !== index)
        : [...prev.daysOfMonth, index];

      if (newDaysOfMonth.length === 0) {
        setError("At least one day must be selected");
        return prev;
      }

      setError("");

      return {
        ...prev,
        daysOfMonth: newDaysOfMonth,
      };
    });
  };

  return (
    <div className="relative text-sm">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={onModalClose}
      />

      <div className="flex items-center justify-center font-medium">
        <div className="border-2 border-black rounded overflow-hidden">
          <button
            className={`${
              selectedSchedule.period === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } py-2 px-3 border-r border-black`}
            onClick={() => handlePeriodClick("weekly")}
          >
            Weekly
          </button>
          <button
            className={`${
              selectedSchedule.period === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } py-2 px-3 border-l border-black`}
            onClick={() => handlePeriodClick("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="flex flex-col divide-y mt-3 max-h-80 overflow-y-auto">
        {selectedSchedule.period === "weekly"
          ? daysOfWeek.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDaysOfWeekChange(index)}
                className={`${
                  selectedSchedule.daysOfWeek.includes(index)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-gray-100"
                } p-2 cursor-pointer`}
              >
                {day}
              </div>
            ))
          : daysOfMonth.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDayOfMonthChange(index)}
                className={`${
                  selectedSchedule.daysOfMonth.includes(++index)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-gray-100"
                } p-2 cursor-pointer`}
              >
                {day}
              </div>
            ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default SelectFixedItemSchedule;
