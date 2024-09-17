import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { isAxiosError } from "axios";

type Props = {
  onClose: () => void;
  fixedItemId?: string;
  fetchFixedItems: () => Promise<void>;
};

const DeleteFixedItemInner = ({
  onClose,
  fixedItemId,
  fetchFixedItems,
}: Props) => {
  const [error, setError] = useState("");

  const onDeleteItem = async () => {
    try {
      await axiosInstance.delete(`/api/fixedItems/${fixedItemId}`);
      onClose();
      fetchFixedItems();
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
    <>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this fixed item?
      </p>

      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <div className="flex gap-4 justify-center">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={onDeleteItem}
        >
          Delete
        </button>
        
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeleteFixedItemInner;
