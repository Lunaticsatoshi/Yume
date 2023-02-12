import { useState, useEffect } from 'react';
import { useGetCurrentUserQuery, GetCurrentUserQuery } from 'src/generated/graphql';

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GetCurrentUserQuery['getCurrentUser']>({} as GetCurrentUserQuery['getCurrentUser']);
  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if(data?.getCurrentUser) {
      setIsAuthenticated(true);
      setUser(data.getCurrentUser);
    }
  }, [data]);

  return {
    isAuthenticated,
    user
  } as const;
};

export default useAuthState;
