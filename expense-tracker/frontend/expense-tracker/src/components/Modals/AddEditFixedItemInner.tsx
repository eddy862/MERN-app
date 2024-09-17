import React, { useContext, useEffect, useState } from "react";
import { ICategory } from "../../types/categories";
import CategoryIconBackground from "../Icons/CategoryIconBackground";
import { CloseSmall, Right } from "@icon-park/react";
import { getDayName, getOrdinalSuffix } from "../../utils/helper";
import { ISchedule } from "../../pages/FixedItems";
import { isAxiosError } from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { IFixedItem } from "../../types/fixedItems";
import { CategoryContext } from "../../contexts/CategoryContext";

type Props = {
  onClose: () => void;
  handleOpenCategoryModal: () => void;
  handleOpenScheduleModal: () => void;
  selectedCategory: ICategory | null;
  selectedSchedule: ISchedule;
  fetchFixedItems: () => Promise<void>;
  modalType: "add" | "edit";
  selectedEditFixedItem?: IFixedItem;
  setSelectedCategory: (category: ICategory) => void;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<ISchedule>>;
};

const AddEditFixedItemInner = ({
  onClose,
  handleOpenCategoryModal,
  handleOpenScheduleModal,
  selectedCategory,
  selectedSchedule,
  fetchFixedItems,
  modalType,
  selectedEditFixedItem,
  setSelectedCategory,
  setSelectedSchedule,
}: Props) => {
  const { categories } = useContext(CategoryContext);

  const { period, daysOfWeek, daysOfMonth } = selectedSchedule;

  const [description, setDescription] = useState(
    selectedEditFixedItem?.description || ""
  );
  const [amount, setAmount] = useState(
    selectedEditFixedItem?.amount.toString() || "0"
  );
  const [frequency, setFrequency] = useState<"unlimited" | number>(
    selectedEditFixedItem?.frequency || "unlimited"
  );
  const [startDate, setStartDate] = useState(
    selectedEditFixedItem?.startDate.split("T")[0] ||
      new Date().toISOString().split("T")[0]
  );

  const [error, setError] = useState("");

  const formatDaysOfWeek = (days?: number[]) =>
    days?.map((day) => getDayName(day)).join(", ");
  const formatDaysOfMonth = (days?: number[]) =>
    days?.map((day) => `${day}${getOrdinalSuffix(day)}`).join(", ");

  const displayDaysOfWeek = formatDaysOfWeek(daysOfWeek);

  const displayDaysOfMonth = formatDaysOfMonth(daysOfMonth);

  // Set selected schedule when editing
  useEffect(() => {
    if (selectedEditFixedItem?.period) {
      setSelectedSchedule((prev) => ({
        ...prev,
        period: selectedEditFixedItem.period,
      }));
    }

    if (
      selectedEditFixedItem?.daysOfWeek &&
      selectedEditFixedItem.daysOfWeek.length > 0
    ) {
      setSelectedSchedule((prev) => ({
        ...prev,
        daysOfWeek: selectedEditFixedItem.daysOfWeek as number[],
      }));
    }

    if (
      selectedEditFixedItem?.daysOfMonth &&
      selectedEditFixedItem.daysOfMonth.length > 0
    ) {
      setSelectedSchedule((prev) => ({
        ...prev,
        daysOfMonth: selectedEditFixedItem.daysOfMonth as number[],
      }));
    }
  }, [
    selectedEditFixedItem?.period,
    selectedEditFixedItem?.daysOfWeek,
    selectedEditFixedItem?.daysOfMonth,
  ]);

  // Set selected category when editing
  useEffect(() => {
    if (selectedEditFixedItem?.category) {
      const targetCategory = categories.find(
        (category) => category._id === selectedEditFixedItem.category
      );
      setSelectedCategory(targetCategory as ICategory);
    }
  }, [selectedEditFixedItem?.category]);

  // Set selected category when adding
  useEffect(() => {
    if (modalType === "add") setSelectedCategory(categories[0]);
  }, [modalType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description.length > 100) {
      setError("Description cannot exceed 100 characters");
      return;
    }

    if (amount.length > 10) {
      setError("Amount cannot exceed 10 digits");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount cannot be zero or negative");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    try {
      if (modalType === "add") {
        await axiosInstance.post("/api/fixedItems", {
          description,
          amount,
          category: selectedCategory._id,
          type: selectedCategory.type,
          frequency,
          startDate,
          period,
          daysOfWeek,
          daysOfMonth,
        });
      }

      if (modalType === "edit" && selectedEditFixedItem) {
        await axiosInstance.patch(
          `/api/fixedItems/${selectedEditFixedItem._id}`,
          {
            description,
            amount,
            category: selectedCategory._id,
            frequency,
            startDate,
            period,
            daysOfWeek,
            daysOfMonth,
          }
        );
      }

      await fetchFixedItems();
      onClose();
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

  if (!selectedCategory) return null;

  return (
    <div className="relative pt-3">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={onClose}
      />

      <form className="text-sm" onSubmit={handleSubmit}>
        <div className="mb-2.5">
          <label
            className="font-medium text-gray-700 mb-0.5"
            htmlFor="description"
          >
            Description
          </label>
          <input
            maxLength={100}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none text-gray-600"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-2.5">
          <label className="font-medium text-gray-700 mb-0.5" htmlFor="amount">
            Amount
          </label>
          <input
            maxLength={10}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none text-gray-600"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-2.5">
          <p className="font-medium text-gray-700 mb-0.5">Category</p>
          <div
            className="flex items-center justify-between p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
            onClick={handleOpenCategoryModal}
          >
            <div className="flex items-center gap-2">
              {selectedCategory.name}
              <CategoryIconBackground categoryType={selectedCategory.type}>
                <img
                  className="w-5 relative"
                  src={`category-icons/${selectedCategory.icon}`}
                  alt={selectedCategory.name}
                />
              </CategoryIconBackground>
            </div>

            <Right theme="filled" size="18" fill="#333" />
          </div>
        </div>

        <div className="mb-2.5">
          <label
            className="font-medium text-gray-700 mb-0.5"
            htmlFor="frequency"
          >
            Frequency
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none text-gray-600"
            id="frequency"
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value as "unlimited" | number)
            }
          >
            <option value="unlimited">Unlimited</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <div className="mb-2.5">
          <p className="font-medium text-gray-700 mb-0.5">Schedule Time</p>
          <div
            className="flex items-center justify-between p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
            onClick={handleOpenScheduleModal}
          >
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {`${period} / ${
                period === "weekly" ? displayDaysOfWeek : displayDaysOfMonth
              }`}
            </div>

            <Right theme="filled" size="18" fill="#333" />
          </div>
        </div>

        <div className="mb-3">
          <label
            className="font-medium text-gray-700 mb-0.5"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none text-gray-600"
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          className="bg-purple-500 hover:bg-purple-600 font-medium text-white py-1.5 text-sm rounded-md w-full mt-2"
          type="submit"
        >
          {modalType === "add" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AddEditFixedItemInner;
