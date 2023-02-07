import { useState, useEffect } from 'react';
import { useGetCurrentUserQuery } from 'src/generated/graphql';

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    if(data?.getCurrentUser) {
      setIsAuthenticated(true);
    }
  }, [data]);

  return {
    isAuthenticated,
  };
};

export default useAuthState;
