import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MenuItem } from '@chakra-ui/react';

import { DefaultSmallCircularAvatar } from 'src/components';

type DirectoryItemProps = {
  displayText: string;
  link: string;
  imageURL?: string;
};

const DirectoryMenuListItem: React.FC<DirectoryItemProps> = ({
  displayText,
  link,
  imageURL,
}) => {
  const router = useRouter();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: 'gray.100' }}
      onClick={() => router.push(link)}
    >
      <div className="flex items-center">
        <div className="mr-2">
          {imageURL ? (
            <div className="w-[20px] h-[20px] border-1 mt-1">
              <Image
                className="rounded-full mr-2"
                width={20}
                height={20}
                objectFit="contain"
                src={imageURL}
              />
            </div>
          ) : (
            <DefaultSmallCircularAvatar
              className={'w-[20px] h-[20px] border-1'}
              onClick={() => {}}
            />
          )}
        </div>
        <div>{displayText}</div>
      </div>
    </MenuItem>
  );
};

export default DirectoryMenuListItem;
