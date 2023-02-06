import React, { Fragment, useContext } from 'react';
import { AuthModalContext } from 'src/contexts';

const AuthButtons = () => {
  const { state: modalState, dispatch: setModalState } =
    useContext(AuthModalContext);

  const onLoginClick = () => setModalState({ open: true, view: 'login' });
  const onRegisterClick = () => setModalState({ open: true, view: 'signup' });

  return (
    <Fragment>
      <div onClick={onLoginClick} className="hidden cursor-pointer w-20 py-2 px-2 font-serif font-semibold rounded-3xl mr-4 leading-5 text-center sm:block lg:w-32 hollow bg-blue-500 text-white">
        log In
      </div>
      <div onClick={onRegisterClick} className="hidden cursor-pointer w-20 py-2 px-2 font-serif font-semibold rounded-3xl mr-4 leading-5 text-center sm:block lg:w-32 hollow bg-blue-500 text-white">
        Sign Up
      </div>
    </Fragment>
  );
};

export default AuthButtons;
