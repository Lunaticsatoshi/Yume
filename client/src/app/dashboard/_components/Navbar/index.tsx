'use client';

import InviteButton from './InviteButton';
import SearchInput from './SearchInput';
import UserButton from './UserButton';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center gap-x-4 p-5 w-full">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <InviteButton />
      <UserButton />
    </div>
  );
};

export default Navbar;
