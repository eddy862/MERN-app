import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputName?: string
};

function PasswordInput({ value, onChange, placeholder, inputName }: Props) {
  const [isShowPwd, setIsShowPwd] = useState(false);

  const toggleShowPwd = () => {
    setIsShowPwd((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={isShowPwd ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        name={inputName || "pwd"}
        className="input-box mb-0 border-0 px-0 mr-3"
      />

      {!isShowPwd ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-primary"
          onClick={() => toggleShowPwd()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="cursor-pointer text-slate-400"
          onClick={() => toggleShowPwd()}
        />
      )}
    </div>
  );
}

export default PasswordInput;
