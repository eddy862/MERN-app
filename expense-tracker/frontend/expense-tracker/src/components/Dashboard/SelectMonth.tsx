import React from "react";

type Props = {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};

const SelectMonth = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const onMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-");
    const lastDayOfMonth = new Date(
      parseInt(year),
      parseInt(month),
      0
    ).getDate();
    setStartDate(`${year}-${month}-01`);
    setEndDate(`${year}-${month}-${lastDayOfMonth}`);
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <input
        className="bg-transparent text-sm cursor-pointer"
        type="month"
        value={startDate.slice(0, 7)}
        onChange={onMonthChange}
      />
    </div>
  );
};

export default SelectMonth;
