import React, { useState } from "react";

type Props = {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};

const SetCustomMonth = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  const [error, setError] = useState("");

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (new Date(e.target.value) < new Date(startDate)) {
      setError("End date cannot be before start date");
      return;
    }

    setError("");
    setEndDate(e.target.value);
  };

  return (
    <div className="mt-3 text-sm flex justify-center">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <div className="inline-flex items-center gap-2">
          <p>From</p>
          <input
            className="py-1 px-2"
            type="month"
            value={startDate.slice(0, 7)}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <p>To</p>
          <input
            className="p-1"
            type="month"
            value={endDate.slice(0, 7)}
            onChange={handleEndDateChange}
          />
        </div>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SetCustomMonth;
