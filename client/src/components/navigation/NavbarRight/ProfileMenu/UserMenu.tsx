import React from "react";
import { SignOut, User } from 'phosphor-react';
import { MenuDivider, MenuItem } from "@chakra-ui/react";

import { signOut } from "firebase/auth";

import { auth } from "src/utils/firebaseClient";
import { eventDispatcher } from "src/lib/events";

// eslint-disable-next-line @typescript-eslint/ban-types
type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const logout = async () => {
    await signOut(auth);
    eventDispatcher('APP_LOGOUT', {});
  };

  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <div className="flex items-center">
          <User size={20} className="mr-2" />
          Profile
        </div>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={logout}
      >
        <div className="flex items-center">
          <SignOut size={20} className="mr-2" />
          Log Out
        </div>
      </MenuItem>
    </>
  );
};
export default UserMenu;
