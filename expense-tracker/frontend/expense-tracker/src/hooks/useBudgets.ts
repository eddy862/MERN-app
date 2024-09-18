import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { IBudget } from "../types/budgets";

const useBudgets =  () => {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchBudgets = async () => {
    try {
      const response = await axiosInstance.get("/api/budgets");
      if (response.data.budgets) {
        setBudgets(response.data.budgets);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { budgets, fetchBudgets, loading };
}

export default useBudgets;