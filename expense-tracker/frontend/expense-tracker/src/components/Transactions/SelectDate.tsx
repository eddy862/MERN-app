import { Left, Right } from "@icon-park/react";
import React from "react";

type Props = {
  startDate: string;
  setMonthOffset: React.Dispatch<React.SetStateAction<number>>;
  setYearOffset: React.Dispatch<React.SetStateAction<number>>;
};

const SelectDate = ({
  startDate,
  setMonthOffset,
  setYearOffset,
}: Props) => {
  return (
    <div className="flex justify-around items-center mb-3 text-sm">
      <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow">
        <Left
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setMonthOffset((prev) => prev - 1)}
        />
        <p>
          {new Date(startDate).toLocaleDateString("ms-MY", {
            month: "short",
          })}
        </p>
        <Right
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setMonthOffset((prev) => prev + 1)}
        />
      </div>
      <div className="flex items-center gap-2 bg-black text-white p-1 rounded-full">
        <Left
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#ffffff"
          onClick={() => setYearOffset((prev) => prev - 1)}
        />
        <p>
          {new Date(startDate).toLocaleDateString("ms-MY", {
            year: "numeric",
          })}
        </p>
        <Right
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#ffffff"
          onClick={() => setYearOffset((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default SelectDate;
