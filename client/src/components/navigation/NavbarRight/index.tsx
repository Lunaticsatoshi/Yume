import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import AuthModal from 'src/components/ui/modal/AuthModal';
import AuthButtons from './AuthButtons';
import ActionIcons from './ActionIcons';
import ProfileMenu from './ProfileMenu';

interface INavbarRightProps {
  loading: boolean;
  isAuthenticated: boolean;
}

const NavbarRight: FC<INavbarRightProps> = ({ loading, isAuthenticated }) => {
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
          <ProfileMenu isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
};

export default NavbarRight;
