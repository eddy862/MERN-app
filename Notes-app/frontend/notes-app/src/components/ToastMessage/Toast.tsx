import React, { useEffect, useRef } from "react";
import { ToastType } from "../../pages/Home/Home";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  toastDetails: ToastType;
  onClose: () => void;
};

const Toast = ({ toastDetails, onClose }: Props) => {
  const { visible, msg, type } = toastDetails;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
  }, [toastDetails]);

  return (
    <div
      className={`absolute top-20  transition-all duration-500 ${
        visible ? "right-6" : "-right-72"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
