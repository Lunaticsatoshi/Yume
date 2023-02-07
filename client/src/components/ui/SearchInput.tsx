import React, { ChangeEventHandler, ReactNode } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

type SearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <div className="max-w-full md:w-160 sm:w-auto">
      <div className="relative px-4 py-1 rounded-3xl flex items-center outline-none focus:outline-none bg-gray-100 dark:bg-black-400 border border-transparent focus:border-transparent hover:border-blue-50">
        <MagnifyingGlass className="m-2 md:block hidden" />
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded focus:outline-none placeholder:text-ellipsis"
          placeholder="Search Reddit"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default SearchInput;
