import React, { useEffect, useContext } from 'react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { withAuthUser } from 'next-firebase-auth';

import { AuthModalContext } from 'src/contexts';
import ModalWrapper from '../ModalWrapper';
import { LoginForm, RegisterForm } from 'src/container';

// type AuthModalProps = {};

const getAuthModalBody = (view: string, toggleView: (view: string) => unknown, handleClose: () => void) => {
  switch (view) {
    case 'login':
      return <LoginForm onSubmit={handleClose} />;
    case 'signup':
      return (
        <>
          <RegisterForm onSubmit={handleClose} />{' '}
          <small className="w-full flex justify-center">
            Have an account?
            <div onClick={() => toggleView("login")} className="ml-1 text-blue-500 uppercase">Log In</div>
          </small>
        </>
      );
    default:
      return null;
  }
};

const AuthModal = () => {
  const { state: modalState, dispatch: setModalState } =
    useContext(AuthModalContext);
  const handleClose = () => setModalState({ ...modalState, open: false });

  // Can implement at the end
  // useEffect(() => {
  //   if (currentUser) handleClose();
  // }, [currentUser]);
  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  //   useEffect(() => {
  //     if (user) handleClose();
  //   }, [user]);

  return (
    <ModalWrapper isOpen={modalState.open} onClose={handleClose}>
      <ModalHeader display="flex" flexDirection="column" alignItems="center">
        {modalState.view === 'login' && 'Login'}
        {modalState.view === 'signup' && 'Sign Up'}
        {modalState.view === 'resetPassword' && 'Reset Password'}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pb={6}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="70%"
        >
          {getAuthModalBody(modalState.view, toggleView, handleClose)}
          {/* // Will implement at end of tutorial */}
          {/* {user && !currentUser && (
                <>
                  <Spinner size="lg" mt={2} mb={2} />
                  <Text fontSize="8pt" textAlign="center" color="blue.500">
                    You are logged in. You will be redirected soon
                  </Text>
                </>
              )} */}
          {/* {false ? (
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                </Flex>
              ) : (
              )} */}
        </Flex>
      </ModalBody>
    </ModalWrapper>
  );
};

export default withAuthUser({
  LoaderComponent: () => <>Loading...</>,
})(AuthModal);
