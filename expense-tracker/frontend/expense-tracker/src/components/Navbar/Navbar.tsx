import React from "react";
import { isGoogleUser, isLocalUser } from "./../../utils/helper";
import useUser from "../../hooks/useUser";
import { IGoogleUser, ILocalUser } from "../../types/user";
import Avatar from "./Avatar";

type Props = {};

const Navbar: React.FC<Props> = (props) => {
  const user = useUser();
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
        <Avatar localUser={localUser} googleUser={googleUser} />
      </div>
    </div>
  );
};

export default Navbar;
