import { useEffect, useState } from "react";
import { IFixedItem } from "../types/fixedItems";
import axiosInstance from "../utils/axiosInstance";

const useFixedItems = () => {
  const [fixedItems, setFixedItems] = useState<IFixedItem[]>([]);

  const fetchFixedItems = async () => {
    const response = await axiosInstance.get("/api/fixedItems");
    if (response.data.fixedItems) {
      setFixedItems(response.data.fixedItems);
    }
  };

  useEffect(() => {
    fetchFixedItems();
  }, []);

  return { fixedItems, fetchFixedItems };
};

export default useFixedItems;
