import React, { useState } from 'react';
import { CaretDown, House } from 'phosphor-react';
import Image from 'next/image';
import { Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import Communities from './Communities';

const Directory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const directoryState = {
    isOpen: false,
    selectedMenuItem: {
      imageURL: '',
      icon: '',
      iconColor: '',
      displayText: '',
    },
  };

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            className="py-1 px-2 cursor-pointer rounded-md ml-0 md:mx-2 dark:hover:border-black-200 border border-transparent hover:border-gray-200"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center auto lg:w-52">
              <div className="flex items-center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    <Image
                      height={'24px'}
                      width={'24px'}
                      className="mr-2"
                      objectFit="cover"
                      src={directoryState.selectedMenuItem.imageURL}
                    />
                  ) : (
                    <House size={24} className="mr-1 md:mr-2" />
                    // <Icon
                    //   fontSize={24}
                    //   mr={{ base: 1, md: 2 }}
                    //   color={directoryState.selectedMenuItem.iconColor}
                    //   as={directoryState.selectedMenuItem.icon}
                    // />
                  )}
                  <div className="hidden lg:flex flex-col text-sm">
                    <Text fontWeight={600}>
                      {directoryState.selectedMenuItem.displayText}
                    </Text>
                  </div>
                </>
              </div>
              <CaretDown className="text-gray-500" />
            </div>
          </MenuButton>
          <MenuList className="bg-black-500 text-white overflow-x-hidden overflow-scroll max-h-80">
            <Communities menuOpen={isOpen} />
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default Directory;
