import React from "react";
import { createContext } from "react";
import { ICategory } from "../types/categories";
import useCategories from "../hooks/useCategories";

type Props = {
  children: React.ReactNode;
};

type CategoryContextType = {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
  defaultSelectedCategory: ICategory | null;
  setDefaultSelectedCategory: (category: ICategory) => void;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  fetchCategories: async () => {},
  defaultSelectedCategory: null,
  setDefaultSelectedCategory: () => {},
});

export const CategoryProvider = ({ children }: Props) => {
  const { categories, fetchCategories, defaultSelectedCategory, setDefaultSelectedCategory } = useCategories();

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories, defaultSelectedCategory, setDefaultSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
