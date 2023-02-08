import React, { ChangeEventHandler, ReactNode } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

type SearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <div className="max-w-full sm:w-full w-15">
      <div className="relative px-4 py-1 rounded-3xl flex items-center outline-none focus:outline-none bg-gray-100 dark:bg-black-400 border border-transparent focus:border-transparent hover:border-blue-50">
        <MagnifyingGlass size={20} className="sm:m-2 sm:py-0 py-1 m-0" />
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded focus:outline-none placeholder:text-ellipsis sm:block hidden"
          placeholder="Search Reddit"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default SearchInput;
