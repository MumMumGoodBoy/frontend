import { type ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { User } from '@/api/types';
import { getMe } from '@/api/usm';
import { useQuery } from '@tanstack/react-query';

interface IUserContext {
  user: User | undefined;
  isLoading: boolean;
  isAdmin: boolean;
}
const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const useUser = () => useContext(UserContext);

export function UserProvider(props: UserProviderProps) {
  const { children } = props;

  const { data, isLoading } = useQuery({
    queryKey: ['me', localStorage.getItem('token')],
    queryFn: getMe,
    enabled: Boolean(localStorage.getItem('token')),
  });

  // const navigate = useNavigate();

  const [isAdmin] = useState(false);

  // useEffect(() => {
  //   if (!isLoading && !isError && data) {
  //     setIsAdmin(true);
  //   }
  // }, [data, isError, isLoading]);

  // useEffect(() => {
  //   if (!isLoading && !data) {
  //     return navigate('/login');
  //   }
  // }, [data, isLoading, navigate]);

  const value = useMemo(
    () => ({
      user: data,
      isAdmin,
      isLoading,
    }),
    [data, isAdmin, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
