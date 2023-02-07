import React, { Dispatch } from "react";
import { MenuItem, Flex, Icon } from "@chakra-ui/react";
import { IAuthModalState } from "src/contexts";
import { SignIn } from "phosphor-react";

type NoUserMenuProps = {
  setModalState: Dispatch<IAuthModalState>;
};

const NoUserMenu: React.FC<NoUserMenuProps> = ({ setModalState }) => {
  return (
    <>
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        <div className="flex items-center">
          <SignIn size={20} className="mr-2" />
          Log In / Sign Up
        </div>
      </MenuItem>
    </>
  );
};
export default NoUserMenu;
