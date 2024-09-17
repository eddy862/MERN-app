import React, { useContext, useState } from "react";
import Main from "../layouts/Main";
import useFixedItems from "../hooks/useFixedItems";
import FixedItemsList from "../components/FixedItems/FixedItemsList";
import AddItemButton from "../components/Buttons/AddItemButton";
import Modal from "react-modal";
import AddEditFixedItemInner from "../components/Modals/AddEditFixedItemInner";
import DeleteFixedItemInner from "../components/Modals/DeleteFixedItemInner";
import SelectFixedItemCategory from "../components/Modals/SelectFixedItemCategory";
import { ICategory } from "../types/categories";
import SelectFixedItemSchedule from "../components/Modals/SelectFixedItemSchedule";
import { CategoryContext } from "../contexts/CategoryContext";
import { IFixedItem } from "../types/fixedItems";

Modal.setAppElement("#root");

type Props = {};
export interface IAddEditFixedItemModal {
  isOpen: boolean;
  type: "edit" | "add";
  selectedFixedItem?: IFixedItem;
}

export interface IDeleteFixedItemModal {
  isOpen: boolean;
  itemId?: string;
}

export interface ISchedule {
  period: "weekly" | "monthly";
  daysOfWeek: number[];
  daysOfMonth: number[];
}

const FixedItems = ({}: Props) => {
  const { fixedItems, fetchFixedItems } = useFixedItems();

  const [isFixedItemModalOpen, setIsFixedItemModalOpen] =
    useState<IAddEditFixedItemModal>({ isOpen: false, type: "add" });
  const [isDeleteFixedItemModalOpen, setIsDeleteFixedItemModalOpen] =
    useState<IDeleteFixedItemModal>({ isOpen: false });
  const [
    isSelectFixedItemCategoryModalOpen,
    setIsSelectFixedItemCategoryModalOpen,
  ] = useState({
    isOpen: false,
  });
  const [
    isSelectFixedItemScheduleModalOpen,
    setIsSelectFixedItemScheduleModalOpen,
  ] = useState({
    isOpen: false,
  });

  const { categories, defaultSelectedCategory, setDefaultSelectedCategory } =
    useContext(CategoryContext);
  const expenses = categories.filter((category) => category.type === "expense");
  const incomes = categories.filter((category) => category.type === "income");

  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>({
    period: "weekly",
    daysOfWeek: [0],
    daysOfMonth: [1],
  });

  return (
    <Main>
      <FixedItemsList
        fixedItems={fixedItems}
        onEditFixedItemModalOpen={(fixedItem: IFixedItem) =>
          setIsFixedItemModalOpen({
            isOpen: true,
            type: "edit",
            selectedFixedItem: fixedItem,
          })
        }
        setIsDeleteFixedItemModalOpen={setIsDeleteFixedItemModalOpen}
      />

      <AddItemButton
        toggleModal={() =>
          setIsFixedItemModalOpen({ isOpen: true, type: "add" })
        }
        tooltipTitle="Add Fixed Item"
      />

      <Modal
        isOpen={isFixedItemModalOpen.isOpen}
        onRequestClose={() =>
          setIsFixedItemModalOpen({ isOpen: false, type: "add" })
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] max-h-3/4 bg-white mx-auto mt-16 rounded-md outline-none px-3 py-4"
      >
        <AddEditFixedItemInner
          onClose={() =>
            setIsFixedItemModalOpen((prev) => ({ ...prev, isOpen: false }))
          }
          handleOpenCategoryModal={() =>
            setIsSelectFixedItemCategoryModalOpen((prev) => ({
              ...prev,
              isOpen: true,
            }))
          }
          handleOpenScheduleModal={() =>
            setIsSelectFixedItemScheduleModalOpen((prev) => ({
              ...prev,
              isOpen: true,
            }))
          }
          selectedCategory={defaultSelectedCategory}
          selectedSchedule={selectedSchedule}
          fetchFixedItems={fetchFixedItems}
          modalType={isFixedItemModalOpen.type}
          selectedEditFixedItem={isFixedItemModalOpen.selectedFixedItem}
          setSelectedCategory = {setDefaultSelectedCategory}
          setSelectedSchedule={setSelectedSchedule}
        />
      </Modal>

      <Modal
        isOpen={isDeleteFixedItemModalOpen.isOpen}
        onRequestClose={() => setIsDeleteFixedItemModalOpen({ isOpen: false })}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-h-3/4 bg-white mx-auto mt-56 rounded-md outline-none px-3 py-4"
      >
        <DeleteFixedItemInner
          onClose={() => setIsDeleteFixedItemModalOpen({ isOpen: false })}
          fixedItemId={isDeleteFixedItemModalOpen.itemId}
          fetchFixedItems={fetchFixedItems}
        />
      </Modal>

      <Modal
        isOpen={isSelectFixedItemCategoryModalOpen.isOpen}
        onRequestClose={() =>
          setIsSelectFixedItemCategoryModalOpen((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-h-3/4 mt-20 bg-white mx-auto rounded-md outline-none px-3 py-4"
      >
        <SelectFixedItemCategory
          onClose={() =>
            setIsSelectFixedItemCategoryModalOpen((prev) => ({
              ...prev,
              isOpen: false,
            }))
          }
          selectedCategory={defaultSelectedCategory}
          setSelectedCategory={(id: string) =>
            setDefaultSelectedCategory(
              categories.find((c) => c._id === id) as ICategory
            )
          }
          expenseCategories={expenses}
          incomeCategories={incomes}
        />
      </Modal>

      <Modal
        isOpen={isSelectFixedItemScheduleModalOpen.isOpen}
        onRequestClose={() =>
          setIsSelectFixedItemScheduleModalOpen((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        className="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-h-3/4 mt-20 bg-white mx-auto rounded-md outline-none px-3 py-4"
      >
        <SelectFixedItemSchedule
          onModalClose={() =>
            setIsSelectFixedItemScheduleModalOpen((prev) => ({
              ...prev,
              isOpen: false,
            }))
          }
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      </Modal>
    </Main>
  );
};

export default FixedItems;
