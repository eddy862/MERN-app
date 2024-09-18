import React, { useContext, useEffect, useState } from "react";
import Main from "../layouts/Main";
import useBudgets from "../hooks/useBudgets";
import BudgetList from "../components/Budgets/BudgetList";
import { IBudget } from "./../types/budgets";
import Modal from "react-modal";
import AddItemButton from "../components/Buttons/AddItemButton";
import AddEditBudget from "../components/Modals/AddEditBudget";
import { CategoryContext } from "../contexts/CategoryContext";
import SelectFixedItemCategory from "../components/Modals/SelectFixedItemCategory";
import { ICategory } from "../types/categories";

Modal.setAppElement("#root");

type Props = {};

export interface IAddEditBudgetModal {
  isOpen: boolean;
  type: "add" | "edit";
  selectedBudget?: IBudget;
}

const Budgets: React.FC<Props> = (props) => {
  const { budgets, fetchBudgets, loading } = useBudgets();

  const { categories, defaultSelectedCategory, setDefaultSelectedCategory } =
    useContext(CategoryContext);
  const expenseCategories = categories.filter(
    (category) => category.type === "expense"
  );
  const incomeCategories = categories.filter(
    (category) => category.type === "income"
  );

  const [isAddEditModalOpen, setIsAddEditModalOpen] =
    useState<IAddEditBudgetModal>({ isOpen: false, type: "add" });
  const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] =
    useState(false);

  // Set default selected category when add/edit modal is opened
  useEffect(() => {
    setDefaultSelectedCategory(categories[0]);
  }, [isAddEditModalOpen.isOpen]);

  if (loading) {
    return (
      <Main>
        <p className="text-center text-gray-500">Loading...</p>
      </Main>
    );
  }

  return (
    <Main>
      <BudgetList
        budgets={budgets}
        handleEditModalOpen={(budget: IBudget) =>
          setIsAddEditModalOpen({
            isOpen: true,
            type: "edit",
            selectedBudget: budget,
          })
        }
      />

      <AddItemButton
        toggleModal={() => setIsAddEditModalOpen({ isOpen: true, type: "add" })}
        tooltipTitle="Add budget"
      />

      <Modal
        isOpen={isAddEditModalOpen.isOpen}
        onRequestClose={() =>
          setIsAddEditModalOpen((prev) => ({ ...prev, isOpen: false }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white mx-auto mt-24 rounded-md outline-none px-3 py-4"
      >
        <AddEditBudget
          isAddEditModalOpen={isAddEditModalOpen}
          setIsAddEditModalOpen={setIsAddEditModalOpen}
          selectedCategory={defaultSelectedCategory}
          setSelectedCategory={setDefaultSelectedCategory}
          fetchBudgets={fetchBudgets}
          onCategoryModalOpen={() => setIsSelectCategoryModalOpen(true)}
        />
      </Modal>

      <Modal
        isOpen={isSelectCategoryModalOpen}
        onRequestClose={() => setIsSelectCategoryModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-h-3/4 mt-20 bg-white mx-auto rounded-md outline-none px-3 py-4"
      >
        <SelectFixedItemCategory
          onClose={() => setIsSelectCategoryModalOpen(false)}
          selectedCategory={defaultSelectedCategory}
          setSelectedCategory={(id: string) =>
            setDefaultSelectedCategory(
              categories.find((c) => c._id === id) as ICategory
            )
          }
          expenseCategories={expenseCategories}
          incomeCategories={incomeCategories}
        />
      </Modal>
    </Main>
  );
};

export default Budgets;
