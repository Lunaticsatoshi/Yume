import React, { useContext } from 'react';
import { RedditLogo, Sparkle, CaretDown, User } from 'phosphor-react';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';

import { AuthModalContext } from 'src/contexts';

import NoUserMenu from './NoUserMenu';
import UserMenu from './UserMenu';

type ProfileMenuProps = {
  isAuthenticated: boolean;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isAuthenticated }) => {
  const { state: modalState, dispatch: setModalState } =
    useContext(AuthModalContext);
  const user = {};
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="2px 6px"
        borderRadius="4px"
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <div className={`flex items-center justify-between ${isAuthenticated ? 'w-52' : 'w-12'}`}>
          <div className="flex items-center w-full">
            {isAuthenticated ? (
              <div className="w-full flex items-center">
                <RedditLogo size={24} className="text-gray-300 mr-1" />
                <div className="hidden md:flex flex-col items-start mr-8 text-sm">
                  <div className="font-700 ml-1">
                    username
                    {/* {user?.displayName || user?.email?.split("@")[0]} */}
                  </div>
                  <div className="flex items-center">
                    <Sparkle className="text-red-700 mr-2" size={12} />
                    <div className="text-gray-300">1 karma</div>
                  </div>
                </div>
              </div>
            ) : (
              <User size={24} className="text-gray-400 mr-1" />
            )}
          </div>
          <CaretDown className="text-gray-500" />
        </div>
      </MenuButton>
      <MenuList>
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <NoUserMenu setModalState={setModalState} />
        )}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
