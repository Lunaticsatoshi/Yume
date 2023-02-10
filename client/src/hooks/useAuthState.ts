import { useState, useEffect } from 'react';
import { useGetCurrentUserQuery, User } from 'src/generated/graphql';

const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Partial<User>>({});
  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    if(data?.getCurrentUser) {
      setIsAuthenticated(true);
      setUser(data.getCurrentUser);
    }
  }, [data]);

  return {
    isAuthenticated,
    user
  };
};

export default useAuthState;
