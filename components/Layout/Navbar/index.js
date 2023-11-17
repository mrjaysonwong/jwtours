import { createContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useMediaQuery } from '@mui/material';
import ProfileMenu from './ProfileMenu';
import AppBarNav from './AppBar/AppBarNav';
import AppBarProfileSettings from './AppBar/AppBarProfileSettings';

import { useUserData } from '@utils/hooks/useUserData';

export const AppBarContext = createContext();

export default function Navbar(props) {
  const { user } = props;
  const userId = user?._id;

  const isMale = user?.gender === 'male';
  const isFemale = user?.gender === 'female';

  const router = useRouter();

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isLoading } = useUserData(userId);

  return (
    <>
      <AppBarContext.Provider
        value={{
          user,
          router,
          isLightTheme,
          mobile,
          isMale,
          isFemale,
          isLoading,
        }}
      >
        {router.pathname !== '/account/profile' && <AppBarNav />}

        {router.pathname === '/account/profile' && <AppBarProfileSettings />}

        <ProfileMenu />
      </AppBarContext.Provider>
    </>
  );
}
