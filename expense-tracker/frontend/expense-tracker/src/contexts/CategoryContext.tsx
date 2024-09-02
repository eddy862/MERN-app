import React from "react";
import { createContext } from "react";
import { ICategory } from "../types/categories";
import useCategories from "../hooks/useCategories";

type Props = {
  children: React.ReactNode;
};

type CategoryContextType = {
  categories: ICategory[];
  fetchCategories: () => void;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  fetchCategories: () => {},
});

export const CategoryProvider = ({ children }: Props) => {
  const { categories, fetchCategories } = useCategories();

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
