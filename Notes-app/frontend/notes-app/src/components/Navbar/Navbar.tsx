import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { type User } from "../../types/apiTypes";

type Props = {
  userInfo?: User;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: (query: string) => void
};

const Navbar = ({ userInfo, searchQuery, setSearchQuery, handleSearch }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/dashboard" className="text-xl font-medium text-black py-2">
        Notes
      </Link>

      {location.pathname === "/dashboard" && (
        <>
          {searchQuery !== undefined && setSearchQuery !== undefined && handleSearch !== undefined && (
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClearSearch={() => setSearchQuery("")}
              handleSearch={handleSearch}
            />
          )}

          <ProfileInfo userName={userInfo?.fullName} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default Navbar;
