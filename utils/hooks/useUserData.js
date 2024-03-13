import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (userId) => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  const fetchUser = async (userId) => {
    try {
      const url = `/api/users?userId=${userId}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error(
        'An error occured. Please try again or Refresh the page.'
      );
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
