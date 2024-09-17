import React from "react";
import { IGoogleUser, ILocalUser } from "../../types/user";
import { extractInitials } from './../../utils/helper';

type Props = {
  localUser: null | ILocalUser;
  googleUser: null | IGoogleUser;
  isVisible: boolean;
  avatarName: null | string;
};

const UserDetails: React.FC<Props> = ({ localUser, googleUser, isVisible, avatarName }) => {
  if (!localUser && !googleUser) {
    return null;
  }

  return (
    <div
      className={`absolute -bottom-16 right-0 flex gap-2 justify-center items-center round bg-white p-2 rounded z-30 ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <div className="bg-slate-200 w-12 h-12 flex justify-center items-center rounded-full">
        {avatarName ? extractInitials(avatarName) : ""}
      </div>

      <div className="text-xs text-slate-500">
        {localUser ? (
          <>
            <p>
              <span>{localUser.username}</span>
            </p>
            <p className="mt-0.5">
              <span>{localUser.email}</span>
            </p>
          </>
        ) : googleUser ? (
          <div>
            <p>
              <span>{googleUser.displayName}</span>
            </p>
            <p className="mt-0.5">
              <span>{googleUser.email}</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserDetails;
