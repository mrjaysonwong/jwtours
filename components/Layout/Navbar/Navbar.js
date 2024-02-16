import { createContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useMediaQuery } from '@mui/material';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import AppBarNav from './AppBar/AppBarNav';
import AppBarProfileSettings from './AppBar/AppBarProfileSettings';

import { useUserData } from '@utils/hooks/useUserData';

/* Initiate createContext */
export const AppBarContext = createContext();
/* ---------------------- */

export default function Navbar({ user }) {
  const userId = user?._id;

  const router = useRouter();

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isLoading, data } = useUserData(userId);
  const userData = data?.result;
  const uploadedImage = userData?.image.url;
  const initialFname = userData?.firstName.substring(0, 1);

  return (
    <>
      <AppBarContext.Provider
        value={{
          user,
          uploadedImage,
          initialFname,
          userId,
          router,
          isLightTheme,
          mobile,
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
