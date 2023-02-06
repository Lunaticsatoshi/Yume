import React, { ChangeEventHandler, ReactNode } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

type SearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <div className="max-w-full w-160">
      <div className="relative px-4 py-1 rounded-3xl flex items-center bg-gray-100 border hover:border-blue-500 hover:bg-white">
        <MagnifyingGlass className="m-2" />
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded focus:outline-none"
          placeholder="Search Reddit"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default SearchInput;
