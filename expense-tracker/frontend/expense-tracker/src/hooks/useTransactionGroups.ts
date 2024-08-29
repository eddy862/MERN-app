import { useEffect, useState } from "react";
import { ITransactionFilter, ITransactionGroup } from "../types/transactions";
import fetchTransactionGroups from "../services/fetchTransactionGroups";
import { useNavigate } from "react-router-dom";

const UseTransactionGroups = (filter: ITransactionFilter) => {
  const [transactionGroups, setTransactionGroups] = useState<
    ITransactionGroup[]
  >([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransGroups = async () => {
      setLoading(true);
      try {
        const response = await fetchTransactionGroups(filter, navigate);

        if (response) {
          setTransactionGroups(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransGroups();
  }, []);

  return { transactionGroups, loading };
};

export default UseTransactionGroups;
