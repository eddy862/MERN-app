import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { IBudget, IBudgetsFilter } from "../types/budgets";

const useBudgets = () => {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchBudgets = async (filter?: IBudgetsFilter, reset?: boolean) => {
    if (reset) {
      setPage(1);
      setBudgets([]);
      setHasMore(true);
    }

    setLoading(true);

    filter = { ...filter, page: reset ? 1 : page };

    try {
      const response = await axiosInstance.get("/api/budgets", {
        params: filter,
      });

      const newBudgets = response.data.budgets;

      if (newBudgets.length === 0) {
        setHasMore(false);
      } else {
        setBudgets((prevBudgets) =>
          reset ? [...newBudgets] : [...prevBudgets, ...newBudgets]
        );
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { budgets, fetchBudgets, loading, hasMore, setPage };
};

export default useBudgets;
