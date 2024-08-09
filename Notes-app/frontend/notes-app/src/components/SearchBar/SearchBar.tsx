import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import useDebounce from '../../hooks/useDebounce';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  handleSearch: (query: string) => void;
};

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }: Props) => {
  const decouncedSearch = useDebounce(handleSearch, 500)

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    decouncedSearch(e.target.value);
  };

  const handleClearQuery = () => {
    onClearSearch();
    handleSearch("");
  };

  return (
    <div className="md:w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onQueryChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 hover:text-black mr-3 cursor-pointer"
          onClick={handleClearQuery}
        />
      )}

      <FaMagnifyingGlass className="text-slate-400" />
    </div>
  );
};

export default SearchBar;
