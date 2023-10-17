import { createContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useMediaQuery } from '@mui/material';
import ProfileMenu from './ProfileMenu';
import AppBarNav from './AppBar/AppBarNav';
import AppBarProfileSettings from './AppBar/AppBarProfileSettings';

export const AppBarContext = createContext();

export default function Navbar(props) {
  const { user } = props;

  const isMale = user?.gender === 'male';
  const isFemale = user?.gender === 'female';

  const router = useRouter();

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBarContext.Provider
        value={{ user, router, isLightTheme, mobile, isMale, isFemale }}
      >
        {router.pathname !== '/account/profile' && <AppBarNav />}

        {router.pathname === '/account/profile' && (
          <>
            <AppBarProfileSettings />
          </>
        )}

        <ProfileMenu />
      </AppBarContext.Provider>
    </>
  );
}
