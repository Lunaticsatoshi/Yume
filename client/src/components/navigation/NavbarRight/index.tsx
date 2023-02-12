import React, { FC } from 'react';

import AuthModal from 'src/components/ui/modal/AuthModal';
import { GetCurrentUserQuery } from 'src/generated/graphql';
import AuthButtons from './AuthButtons';
import ActionIcons from './ActionIcons';
import ProfileMenu from './ProfileMenu';

interface INavbarRightProps {
  loading: boolean;
  isAuthenticated: boolean;
  user: GetCurrentUserQuery['getCurrentUser'];
}

const NavbarRight: FC<INavbarRightProps> = ({
  loading,
  isAuthenticated,
  user,
}) => {
  return (
    <>
      <AuthModal />
      <div className="flex justify-between items-center">
        {!loading &&
          (isAuthenticated && user ? (
            // Show logout
            <>
              <ActionIcons />
              <ProfileMenu isAuthenticated={isAuthenticated} user={user} />
            </>
          ) : (
            <AuthButtons />
          ))}
      </div>
    </>
  );
};

export default NavbarRight;
