import React from 'react'

type Props = {
  selectedTimeFrame: "monthly" | "last6months" | "year" | "custom";
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<"monthly" | "last6months" | "year" | "custom">>;
}

const SelectTimeFrame = ({ selectedTimeFrame, setSelectedTimeFrame }: Props) => {
  return (
    <div className="flex justify-center mt-3 divide-x-2 divide-slate-600 text-xs sm:text-base">
        <button
          className={`px-3 ${
            selectedTimeFrame === "monthly" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTimeFrame("monthly")}
        >
          Month
        </button>
        <button
          className={`px-3 ${
            selectedTimeFrame === "last6months" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTimeFrame("last6months")}
        >
          Last 6 Months
        </button>
        <button
          className={`px-3 ${
            selectedTimeFrame === "year" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTimeFrame("year")}
        >
          Year
        </button>
        <button
          className={`px-3 ${
            selectedTimeFrame === "custom" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setSelectedTimeFrame("custom")}
        >
          Custom
        </button>
      </div>
  )
}

export default SelectTimeFrame