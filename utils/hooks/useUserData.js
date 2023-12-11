import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (userId) => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? fetchUser(userId) : null),
    enabled: !!userId,
  });

  const fetchUser = async (userId) => {
    try {
      const url = `/api/users?userId=${userId}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Something went wrong.`);
    }
  };

  return {
    isLoading,
    data,
    isError,
    error,
    refetch,
  };
};
