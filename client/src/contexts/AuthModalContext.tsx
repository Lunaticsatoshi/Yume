import React, { FC, useState, Dispatch, ReactNode, createContext } from 'react';

export interface IAuthModalState {
  open: boolean;
  view: ModalView;
}

export type ModalView = 'login' | 'signup' | 'resetPassword';

const defaultModalState: IAuthModalState = {
  open: false,
  view: 'login',
};

type Props = {
  children: ReactNode;
};

export const AuthModalContext = createContext<{
  state: IAuthModalState;
  dispatch: Dispatch<IAuthModalState>;
}>({
  state: defaultModalState,
  dispatch: (arg: IAuthModalState) => null,
});

const AuthModalContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useState<IAuthModalState>(defaultModalState);

  return (
    <AuthModalContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContextProvider;
