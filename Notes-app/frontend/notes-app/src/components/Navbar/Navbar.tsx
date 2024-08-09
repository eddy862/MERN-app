import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { type User } from "../../types/apiTypes";

type Props = {
  userInfo?: User;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: (query: string) => void;
  setOpenProfile?: () => void;
};

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  handleSearch,
  setOpenProfile,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <div className="text-xl font-medium text-black py-2">Notes</div>

      {location.pathname === "/dashboard" &&
        searchQuery !== undefined &&
        setSearchQuery !== undefined &&
        handleSearch !== undefined &&
        userInfo &&
        setOpenProfile && (
          <>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClearSearch={() => setSearchQuery("")}
              handleSearch={handleSearch}
            />

            <ProfileInfo
              userName={userInfo.fullName}
              onLogout={onLogout}
              setOpenProfile={setOpenProfile}
            />
          </>
        )}
    </div>
  );
};

export default Navbar;
