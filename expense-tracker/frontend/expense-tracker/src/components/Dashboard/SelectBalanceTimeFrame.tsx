import React from 'react'

type Props = {
  selectedBalanceTimeFrame: "monthly" | "year" | "custom";
  setSelectedBalanceTimeFrame: React.Dispatch<React.SetStateAction<"monthly" | "year" | "custom">>;
}

const SelectBalanceTimeFrame = ({ selectedBalanceTimeFrame, setSelectedBalanceTimeFrame }: Props) => {
  return (
    <div className="flex justify-center mt-3 divide-x-2 divide-slate-600 text-xs sm:text-base">
        <button
          className={`px-3 ${
            selectedBalanceTimeFrame === "monthly" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedBalanceTimeFrame("monthly")}
        >
          Month
        </button>
        <button
          className={`px-3 ${
            selectedBalanceTimeFrame === "year" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedBalanceTimeFrame("year")}
        >
          Year
        </button>
        <button
          className={`px-3 ${
            selectedBalanceTimeFrame === "custom" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedBalanceTimeFrame("custom")}
        >
          Custom
        </button>
      </div>
  )
}

export default SelectBalanceTimeFrame