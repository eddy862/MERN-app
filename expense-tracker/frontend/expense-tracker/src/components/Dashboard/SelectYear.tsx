import { Left, Right } from "@icon-park/react";
import React from "react";

type Props = {
  startDate: string;
  endDate: string;
  yearOffset: number;
  setYearOffset: React.Dispatch<React.SetStateAction<number>>;
};

const SelectYear = ({
  startDate,
  endDate,
  yearOffset,
  setYearOffset,
}: Props) => {
  return (
    <div className="flex justify-center mt-3 text-sm">
      <div className="flex items-center gap-2">
        <Left
          className="cursor-pointer"
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setYearOffset((prev) => prev + 1)}
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
            yearOffset === 0 ? "invisible" : "visible"
          }`}
          theme="outline"
          size="20"
          fill="#333"
          onClick={() => setYearOffset((prev) => prev - 1)}
        />
      </div>
    </div>
  );
};

export default SelectYear;
