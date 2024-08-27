import React from "react";

type Props = {
  children: React.ReactNode;
};

const UserAuth = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col-reverse md:flex-row">
      <div className="flex h-full justify-center items-center flex-1">
        <div className="w-80">{children}</div>
      </div>
      <div className="bg-slate-300 h-1/6 md:h-auto md:w-1/3 lg:w-2/5 xl:w-1/2"></div>
    </div>
  );
};

export default UserAuth;
