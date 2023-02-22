import React, { useContext } from 'react';
import { CaretDown, House } from 'phosphor-react';
import Image from 'next/image';
import { Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';

import { DirectoryContext } from 'src/contexts';
import { GetCurrentUserQuery } from 'src/generated/graphql';
import Communities from './Communities';

interface IDirectoryProps {
  user: GetCurrentUserQuery['getCurrentUser'];
}

const Directory: React.FC<IDirectoryProps> = ({ user }) => {
  const { state: directoryState, dispatch: setDirectoryState } =
    useContext(DirectoryContext);

  const toggleOpen = () =>
    setDirectoryState({
      isOpen: true,
      loading: false,
      selectedCommunity: directoryState.selectedCommunity,
      communityData: directoryState.communityData
    });

  const toggleClose = () =>
    setDirectoryState({
      isOpen: false,
      loading: false,
      selectedCommunity: directoryState.selectedCommunity,
      communityData: directoryState.communityData
    });

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            className="py-1 px-2 cursor-pointer rounded-md ml-0 md:mx-2 dark:hover:border-black-200 border border-transparent hover:border-gray-200"
            onClick={directoryState.isOpen ? toggleClose : toggleOpen}
          >
            <div className="flex justify-between items-center auto lg:w-52">
              <div className="flex items-center">
                <>
                  {directoryState.selectedCommunity.imageURL ? (
                    <Image
                      height={'20px'}
                      width={'20px'}
                      className="mr-2"
                      objectFit="contain"
                      src={directoryState.selectedCommunity.imageURL}
                    />
                  ) : (
                    <House size={24} className="mr-1 md:mr-2" />
                  )}
                  <div className="hidden lg:flex flex-col text-sm font-semibold ml-2">
                      {directoryState.selectedCommunity.displayText}
                  </div>
                </>
              </div>
              <CaretDown className="text-gray-500" />
            </div>
          </MenuButton>
          <MenuList className="bg-black-500 text-white overflow-x-hidden overflow-scroll max-h-80">
            <Communities menuOpen={isOpen} user={user} />
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default Directory;
