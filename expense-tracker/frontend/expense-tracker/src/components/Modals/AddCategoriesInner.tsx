import React, { useContext, useMemo, useState } from "react";
import { ICategoryModal } from "../../pages/Transactions";
import useParentCategories from "../../hooks/useParentCategories";
import ParentCategories from "../ParentCategories/ParentCategories";
import { CategoryContext } from "../../contexts/CategoryContext";
import SelectCategories from "./SelectCategories";
import axiosInstance from "../../utils/axiosInstance";
import { isAxiosError } from "axios";

type Props = {
  isCategoryModalOpen: ICategoryModal;
  setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<ICategoryModal>>;
};

const AddCategoriesInner = ({
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}: Props) => {
  const { parentCategories } = useParentCategories(isCategoryModalOpen.type);

  const [selectedParentCategoryIndex, setSelectedParentCategoryIndex] =
    useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const { categories, fetchCategories } = useContext(CategoryContext);

  const targetCategories = useMemo(() => {
    return isCategoryModalOpen.type === "expense"
      ? categories.filter((category) => category.type === "expense")
      : categories.filter((category) => category.type === "income");
  }, [isCategoryModalOpen.type, categories]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      setError("Category name is required");
      return;
    }

    if (targetCategories[selectedCategoryIndex].name === categoryName) {
      setError("Category name is already exists");
      return;
    }

    try {
      await axiosInstance.post("/api/categories", {
        name: categoryName,
        type: isCategoryModalOpen.type,
        parentCategory: parentCategories[selectedParentCategoryIndex]._id,
        icon: targetCategories[selectedCategoryIndex].icon,
      });

      fetchCategories();
      setIsCategoryModalOpen({ isOpen: false });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.msg) {
          if (Array.isArray(error.response.data.msg)) {
            setError(error.response.data.msg[0].msg);
          } else {
            setError(error.response.data.msg);
          }
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 rounded-md border-2 border-slate-700 outline-none"
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div className="mt-3">
          <ParentCategories
            parentCategories={parentCategories}
            selectedParentCategoryIndex={selectedParentCategoryIndex}
            setSelectedParentCategoryIndex={setSelectedParentCategoryIndex}
          />
        </div>

        <SelectCategories
          categories={targetCategories}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
        />

        {error && (
          <p className="text-red-500 text-xs font-medium mt-3">{error}</p>
        )}

        <div className="flex gap-2 font-medium text-sm mt-3">
          <button
            type="submit"
            className="px-3 py-2 flex-1 bg-blue-500 text-white rounded-md"
          >
            Add Category
          </button>
          <button
            className="px-3 py-2 bg-slate-300 text-white rounded-md"
            onClick={() => setIsCategoryModalOpen({ isOpen: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoriesInner;
