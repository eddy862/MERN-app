import { useEffect, useState } from "react";
import { IFixedItem } from "../types/fixedItems";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useFixedItems = () => {
  const [fixedItems, setFixedItems] = useState<IFixedItem[]>([]);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchFixedItems = async () => {
    try {
      const response = await axiosInstance.get("/api/fixedItems");
      if (response.data.fixedItems) {
        setFixedItems(response.data.fixedItems);
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
    fetchFixedItems();
  }, []);

  return { fixedItems, fetchFixedItems, loading };
};

export default useFixedItems;
