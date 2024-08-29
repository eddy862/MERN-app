import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { ICategory } from "../types/categories";

const fetchCategories = async (navigate: NavigateFunction) => {
  try {
    const response = await axiosInstance.get("/api/categories");

    if (response.data && response.data.categories) {
      console.log(response.data.categories);
      return response.data.categories as ICategory[];
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }
};

export default fetchCategories;
