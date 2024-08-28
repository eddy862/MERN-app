import React, { useState } from "react";
import {
  extractInitials,
  isGoogleUser,
  isLocalUser,
} from "./../../utils/helper";
import useUser from "../../hooks/useUser";
import { IGoogleUser, ILocalUser } from "../../types/user";
import UserDetails from "./UserDetails";

type Props = {};

const Navbar = (props: Props) => {
  const user = useUser();
  const [isNameHovered, setIsNameHovered] = useState(false);
  let googleUser: IGoogleUser | null = null;
  let localUser: ILocalUser | null = null;

  if (isLocalUser(user)) {
    localUser = user;
  }

  if (isGoogleUser(user)) {
    googleUser = user;
  }

  return (
    <div className="flex justify-between items-center py-3 px-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Expense
        <span className="text-purple-500">Tracker</span>
      </h1>

      <div>
        <div
          className="bg-slate-200 w-10 h-10 rounded-full flex justify-center items-center relative"
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          <span>
            {localUser
              ? extractInitials(localUser.username)
              : googleUser
              ? extractInitials(googleUser.displayName)
              : ""}
          </span>
          <UserDetails {...{ localUser, googleUser, isNameHovered }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
