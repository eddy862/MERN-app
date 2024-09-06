import React from "react";

type Props = {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};

const SetCustomDate = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  return (
    <div className="mt-3 text-sm flex justify-center">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <div className="inline-flex items-center gap-2">
          <p>From</p>
          <input
            className="py-1 px-2"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <p>To</p>
          <input
          className="p-1"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SetCustomDate;
