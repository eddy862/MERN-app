import { Left, Right } from "@icon-park/react";
import React from "react";

type Props = {
  sixMonthsOffset: number;
  setSixMonthsOffset: React.Dispatch<React.SetStateAction<number>>;
  startDate: string;
  endDate: string;
};

const SelectSixMonths = ({
  sixMonthsOffset,
  setSixMonthsOffset,
  startDate,
  endDate,
}: Props) => {
  return (
    <div className="mt-3 text-sm flex justify-center gap-2">
      <div className="flex items-center gap-2">
        <Left
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setSixMonthsOffset((prev) => prev + 1)}
        />
        <p className="text-center">
          {new Date(startDate).toLocaleDateString("ms-MY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(endDate).toLocaleDateString("ms-MY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <Right
          className={`cursor-pointer ${
            sixMonthsOffset === 0 ? "invisible" : "visible"
          }`}
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setSixMonthsOffset((prev) => prev - 1)}
        />
      </div>
    </div>
  );
};

export default SelectSixMonths;
