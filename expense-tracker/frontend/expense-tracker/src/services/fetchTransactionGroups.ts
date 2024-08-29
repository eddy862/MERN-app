import { isAxiosError } from "axios";
import { ITransactionFilter, ITransactionGroup } from "../types/transactions";
import axiosInstance from "../utils/axiosInstance";
import { NavigateFunction } from "react-router-dom";

const fetchTransactionGroups = async (filter: ITransactionFilter, navigate: NavigateFunction) => {
  filter.groupByDate = true;

  try {
    const response = await axiosInstance.get("/api/transactions", {
      params: filter,
    });

    if (response.data && response.data.transactions) {
      return response.data.transactions as ITransactionGroup[];
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }
};

export default fetchTransactionGroups;
