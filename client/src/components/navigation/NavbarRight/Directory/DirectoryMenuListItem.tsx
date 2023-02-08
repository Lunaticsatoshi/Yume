import React from 'react';
import { MenuItem, Image } from '@chakra-ui/react';
import { Plus } from 'phosphor-react';

type DirectoryItemProps = {
  displayText: string;
  //   link: string;
  //   icon: IconType;
  //   iconColor: string;
  imageURL?: string;
};

const DirectoryMenuListItem: React.FC<DirectoryItemProps> = ({
  displayText,
  //   link,
  //   icon,
  //   iconColor,
  imageURL,
}) => {
  //   const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: 'gray.100' }}
      onClick={() => {}}
    >
      <div className="flex items-center">
        {imageURL ? (
          <Image borderRadius="full" boxSize="18px" src={imageURL} mr={2} />
        ) : (
          <Plus />
          //   <Icon fontSize={20} mr={2} as={icon} color={iconColor} />
        )}
        {displayText}
      </div>
    </MenuItem>
  );
};
export default DirectoryMenuListItem;
