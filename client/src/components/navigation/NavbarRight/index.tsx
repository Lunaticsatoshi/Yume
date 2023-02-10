import React, { FC } from 'react';

import AuthModal from 'src/components/ui/modal/AuthModal';
import { User } from 'src/generated/graphql';
import AuthButtons from './AuthButtons';
import ActionIcons from './ActionIcons';
import ProfileMenu from './ProfileMenu';

interface INavbarRightProps {
  loading: boolean;
  isAuthenticated: boolean;
  user: Partial<User>;
}

const NavbarRight: FC<INavbarRightProps> = ({ loading, isAuthenticated, user }) => {
  return (
    <>
      <AuthModal />
      <div className="flex justify-between items-center">
        {!loading &&
          (isAuthenticated ? (
            // Show logout
            <ActionIcons />
          ) : (
            <AuthButtons />
          ))}
          <ProfileMenu isAuthenticated={isAuthenticated} user={user} />
      </div>
    </>
  );
};

export default NavbarRight;
