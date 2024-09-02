import { useEffect, useState } from "react";
import { IParentCategory } from "../types/parentCategories";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useParentCategories = (type?: "expense" | "income") => {
  const [parentCategories, setParentCategories] = useState<IParentCategory[]>(
    []
  );

  const navigate = useNavigate();

  const fetchParentCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/parentCategories", {
        params: { type },
      });
      
      if (response.data && response.data.parentCategories) {
        setParentCategories(response.data.parentCategories);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    fetchParentCategories();
  }, []);

  return { parentCategories, fetchParentCategories };
};

export default useParentCategories;
