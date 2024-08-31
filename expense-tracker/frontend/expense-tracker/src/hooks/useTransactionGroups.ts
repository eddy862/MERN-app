import { useEffect, useState } from "react";
import { ITransactionFilter, ITransactionGroup } from "../types/transactions";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

const UseTransactionGroups = (filter: ITransactionFilter) => {
  const [transactionGroups, setTransactionGroups] = useState<
    ITransactionGroup[]
  >([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchTransGroups = async () => {
    setLoading(true);
    filter.groupByDate = true;

    try {
      const response = await axiosInstance.get("/api/transactions", {
        params: filter,
      });
  
      if (response.data && response.data.transactions) {
        setTransactionGroups(response.data.transactions as ITransactionGroup[]);
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

  useEffect(() => {
    fetchTransGroups();
  }, []);

  return { transactionGroups, loading, fetchTransGroups };
};

export default UseTransactionGroups;
