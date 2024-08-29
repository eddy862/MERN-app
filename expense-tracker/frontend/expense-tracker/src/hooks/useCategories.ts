import { useState, useEffect } from "react";
import { ICategory } from "../types/categories";
import { useNavigate } from "react-router-dom";
import fetchCategories from "../services/fetchCategories";

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCtgs = async () => {
      try {
        const response = await fetchCategories(navigate);

        if (response) {
          setCategories(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCtgs();
  }, []);

  return { categories };
};

export default useCategories;
