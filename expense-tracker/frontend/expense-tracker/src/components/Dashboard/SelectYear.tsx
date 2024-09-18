import { Left, Right } from "@icon-park/react";
import React from "react";

type Props = {
  startDate: string;
  yearOffset: number;
  setYearOffset: React.Dispatch<React.SetStateAction<number>>;
};

const SelectYear = ({
  startDate,
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
