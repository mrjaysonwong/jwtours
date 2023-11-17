import { useQuery } from '@tanstack/react-query';
import { getUser } from '@utils/api/client/user/authorize/user/getUser';

export const useUserData = (userId) => {
  const { isLoading, data, isError, error, refetch} = useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? fetchUser(userId) : null),
  });

  const fetchUser = async (userId) => {
    const data = await getUser(userId);

    return data;
  };

  return {
    isLoading,
    data,
    isError,
    error,
    refetch,
  };
};
