import React, { useContext } from "react";
import { IBudget } from "../../types/budgets";
import { CategoryContext } from "../../contexts/CategoryContext";
import CategoryIconBackground from "../Icons/CategoryIconBackground";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  budget: IBudget;
  handleEditModalOpen: (budget: IBudget) => void;
};

const BudgetItem = ({ budget, handleEditModalOpen }: Props) => {
  const { categories } = useContext(CategoryContext);

  const category = categories.find((c) => c._id === budget.category);

  const progressPercentage = Math.min(
    (budget.totalMade / budget.amount) * 100,
    100
  );

  const isExceeded = budget.totalMade > budget.amount;

  if (!category) {
    return null;
  }

  return (
    <div
      className="p-4 bg-slate-50 hover:bg-slate-100 shadow-md rounded-lg text-sm sm:text-base  cursor-pointer"
      onClick={() => handleEditModalOpen(budget)}
    >
      <div className="flex items-center mb-3">
        <CategoryIconBackground categoryType={category.type}>
          <img
            className="relative w-8"
            src={`category-icons/${category.icon}`}
            alt={category.name}
          />
        </CategoryIconBackground>
        <h2 className="ml-4 text-lg sm:text-xl font-semibold leading-tight">
          {category.name}
        </h2>
      </div>
      {budget.period == "customised" ? (
        <div className="mb-2">
          {new Date(budget.startDate).toLocaleDateString("ms-MY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          {" - "}
          {new Date(budget.endDate).toLocaleDateString("ms-MY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      ) : budget.period == "monthly" ? (
        <div className="mb-2">
          {new Date(budget.startDate).toLocaleDateString("ms-MY", {
            month: "short",
            year: "numeric",
          })}
        </div>
      ) : (
        <div className="mb-2">
          {new Date(budget.startDate).toLocaleDateString("ms-MY", {
            year: "numeric",
          })}
        </div>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <LinearProgress
            color={
              isExceeded
                ? category.type === "expense"
                  ? "error"
                  : "success"
                : "primary"
            }
            variant="determinate"
            value={progressPercentage}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {budget.totalMade.toFixed(2)} / {budget.amount.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default BudgetItem;
