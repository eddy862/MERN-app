import React from "react";
import { IGoogleUser, ILocalUser } from "../../types/user";

type Props = {
  localUser: null | ILocalUser;
  googleUser: null | IGoogleUser;
  isNameHovered: boolean;
};

const UserDetails = ({ localUser, googleUser, isNameHovered }: Props) => {
  return (
    <div
      className={`absolute -bottom-14 right-0 round bg-white w-44 p-2 rounded ${
        isNameHovered ? "visible" : "invisible"
      }`}
    >
      <div className="text-xs text-slate-800">
        {localUser ? (
          <>
            <p>
              Username:{" "}
              <span className="font-semibold">{localUser.username}</span>
            </p>
            <p className="mt-0.5">
              Email: <span className="font-semibold">{localUser.email}</span>
            </p>
          </>
        ) : googleUser ? (
          <div>
            <p>
              Display name:{" "}
              <span className="font-semibold">{googleUser.displayName}</span>
            </p>
            <p className="mt-0.5">
              Email: <span className="font-semibold">{googleUser.email}</span>
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
