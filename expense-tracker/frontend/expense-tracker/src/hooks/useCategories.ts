import { useState, useEffect } from "react";
import { ICategory } from "../types/categories";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [defaultSelectedCategory, setDefaultSelectedCategory] = useState<ICategory | null>(null);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/categories");

      if (response.data && response.data.categories) {
        setCategories(response.data.categories as ICategory[]);
        setDefaultSelectedCategory(response.data.categories[0] as ICategory)
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
    fetchCategories();
  }, []);

  return { categories, fetchCategories, defaultSelectedCategory, setDefaultSelectedCategory };
};

export default useCategories;
