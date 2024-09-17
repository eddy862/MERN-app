import { IUpdateFixedItemBody } from "../types/fixedItems";
import axiosInstance from "../utils/axiosInstance";

const updateFixedItem = async (itemId: string, body: IUpdateFixedItemBody) => {
  try {
    await axiosInstance.patch(`/api/fixedItems/${itemId}`, body);
  } catch (error) {
    throw error;
  }
};

export default updateFixedItem;
