import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import AuthModal from 'src/components/ui/modal/AuthModal';
import AuthButtons from './AuthButtons';

interface INavbarRightProps {
  loading: boolean;
  isAuthenticated: boolean;
}

const NavbarRight: FC<INavbarRightProps> = ({ loading, isAuthenticated }) => {
  return (
    <>
      <AuthModal />
      <div className="flex">
        {!loading &&
          (isAuthenticated ? (
            // Show logout
            <button
              className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button"
              onClick={() => {}}
            >
              Logout
            </button>
          ) : (
            <>
            <AuthButtons />
            </>
          ))}
      </div>
    </>
  );
};

export default NavbarRight;
