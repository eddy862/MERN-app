import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { User, UserResponse } from "../../types/apiTypes";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose, MdCreate } from "react-icons/md";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";

type Props = {
  userData?: User;
  onCloseModal: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type UpdateInfo = {
  name: string;
  email: string;
  currentPwd: string;
  updatedPwd: string;
};

const Profile = ({ userData, onCloseModal, setUserInfo }: Props) => {
  const [onEdit, setOnEdit] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({
    name: userData?.fullName || "",
    email: userData?.email || "",
    currentPwd: "",
    updatedPwd: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const sanitizedValue = ["currentPwd", "updatedPwd", "email"].includes(name)
      ? value.replace(/\s+/g, "")
      : value;

    setUpdateInfo((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, currentPwd, updatedPwd } = updateInfo;

    if (name.trim() === "") {
      setError("Please provide a name.");
      return;
    }
    if (email.trim() === "") {
      setError("Please provide an email address.");
      return;
    }
    if (!validateEmail(email?.trim())) {
      setError("Please provide a valid email address.");
      return;
    }
    if (currentPwd.trim() !== updatedPwd.trim()) {
      setError("Current and updated passwords must be the same.");
      return;
    }

    setError("");
    setLoading(true);

    const body: { fullName?: string; email?: string; password?: string } = {};

    if (name.trim() !== userData?.fullName) {
      body.fullName = name.trim();
    }
    if (email.trim() !== userData?.email) {
      body.email = email.trim();
    }
    if (updatedPwd.trim() !== userData?.password) {
      body.password = updatedPwd.trim();
    }

    try {
      const { data }: { data: UserResponse } = await axiosInstance.patch(
        "/user",
        body
      );

      if (data && data.user) {
        setUserInfo(data.user);
        onCloseModal();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        }
      } else {
        setError("An unexpected error occured. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <h3 className="text-2xl font-semibold">User Profile</h3>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onCloseModal}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="mt-2">
        <label className="input-label">NAME</label>
        <div className="flex items-center gap-2">
          {onEdit.name ? (
            <input
              type="text"
              name="name"
              value={updateInfo.name}
              className="text-sm outline-none bg-slate-100 p-2 rounded"
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.fullName}</p>
          )}
          <MdCreate
            className="icon-btn cursor-pointer"
            onClick={() => setOnEdit((prev) => ({ ...prev, name: !prev.name }))}
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="input-label">EMAIL</label>
        <div className="flex items-center gap-2">
          {onEdit.email ? (
            <input
              type="text"
              name="email"
              value={updateInfo.email}
              className="text-sm outline-none bg-slate-100 p-2 rounded"
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.email}</p>
          )}
          <MdCreate
            className="icon-btn cursor-pointer"
            onClick={() =>
              setOnEdit((prev) => ({ ...prev, email: !prev.email }))
            }
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="input-label">PASSWORD</label>
        <span className="ml-2 text-xs text-slate-400">
          (Leave the input fields below blank if no password update)
        </span>
        <div className="w-52">
          <PasswordInput
            onChange={handleInputChange}
            value={updateInfo.currentPwd || ""}
            placeholder="Current password"
            inputName="currentPwd"
          />
        </div>
        <div className="w-52">
          <PasswordInput
            onChange={handleInputChange}
            value={updateInfo.updatedPwd || ""}
            placeholder="Updated password"
            inputName="updatedPwd"
          />
        </div>
      </div>

      <p className="text-xs pb-1 text-red-500">{error}</p>

      <button disabled={loading} className="btn-primary" onClick={handleSubmit}>
        UPDATE
      </button>
    </div>
  );
};

export default Profile;
