import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { extractInitials } from "../../utils/helper";
import { IGoogleUser, ILocalUser } from "../../types/user";

type Props = {
  localUser: null | ILocalUser;
  googleUser: null | IGoogleUser;
};

const Avatar: React.FC<Props> = ({ localUser, googleUser }: Props) => {
  const [showUserDetails, setShowUserDetails] = useState(false);

  const name: null | string = localUser
    ? localUser.username
    : googleUser
    ? googleUser.displayName
    : null;

  return (
    <div
      className="bg-slate-200 w-10 h-10 rounded-full flex justify-center items-center relative"
      onMouseEnter={() => setShowUserDetails(true)}
      onMouseLeave={() => setShowUserDetails(false)}
    >
      <span>{name ? extractInitials(name) : ""}</span>
      <UserDetails
        localUser={localUser}
        googleUser={googleUser}
        isVisible={showUserDetails}
        avatarName={name}
      />
    </div>
  );
};

export default Avatar;
