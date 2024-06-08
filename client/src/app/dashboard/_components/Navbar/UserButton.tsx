import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomAvatar from '@/components/UserAvatar';

import UpdateUserProfile from '../UpdateUserProfile';

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {' '}
        <CustomAvatar
          variant="md"
          imageUri="https://github.com/mrzachnugent.png"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="my-2 mr-4 w-[180px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
