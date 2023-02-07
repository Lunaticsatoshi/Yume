import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useGetCurrentUserQuery } from 'src/generated/graphql';

import { app } from 'src/utils/firebaseClient';

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useGetCurrentUserQuery();
  console.log(data);
  // const auth = getAuth(app);

  // if (auth.currentUser) {
  //   setIsAuthenticated(true);
  // } else {
  //   setIsAuthenticated(false);
  // }

  return {
    isAuthenticated,
  };
};

export default useAuthState;
