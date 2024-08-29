import React from "react";
import { createContext } from "react";
import { ICategory } from "../types/categories";
import useCategories from "../hooks/useCategories";

type Props = {
  children: React.ReactNode;
};

export const CategoryContext = createContext<ICategory[]>([]);

export const CategoryProvider = ({ children }: Props) => {
  const { categories } = useCategories();

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};
