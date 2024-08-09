import React from "react";
import { getInitials } from "../../utils/helper";

type Props = {
  onLogout: () => void;
  userName: string;
  setOpenProfile: () => void;
};

const ProfileInfo = ({ onLogout, userName, setOpenProfile }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer"
        onClick={setOpenProfile}
      >
        {userName && getInitials(userName.trim())}
      </div>

      <div>
        <p className="text-sm font-medium">{userName}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
