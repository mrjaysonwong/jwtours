import { useContext, createContext } from 'react';
import Skeleton from '@components/Layout/Loaders/Skeleton';
import { useUserData } from '@utils/hooks/useUserData';
import { UserContext } from '@pages/account/profile';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import EmailAddress from './Email/Email';

export const FormDetailsContext = createContext(null);

export default function FormDetails() {
  const { userId } = useContext(UserContext);
  const { isLoading, data, refetch } = useUserData(userId);

  const userData = data?.result;

  const value = {
    userId,
    userData,
    refetch,
  };

  return (
    <>
      {isLoading && (
        <>
          <Skeleton />
          <Skeleton />
        </>
      )}

      {data && (
        <>
          <FormDetailsContext.Provider value={value}>
            <PersonalDetails />
            <EmailAddress />
          </FormDetailsContext.Provider>
        </>
      )}
    </>
  );
}
