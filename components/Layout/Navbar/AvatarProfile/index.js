import { useContext } from 'react';
import { Avatar, Box, Skeleton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMenuStore } from 'stores/menuStore';
import { useProfileDrawerStore } from '@stores/drawerStore';
import { AppBarContext } from '..';

export default function AvatarProfile() {
  const { user, mobile, isMale, isFemale, isLightTheme, isLoading } =
    useContext(AppBarContext);

  const { toggleProfileDrawer } = useProfileDrawerStore();
  const { handleMenu } = useMenuStore();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {user ? (
        <>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt="avatar"
              src={`${
                !user.image || user.accountType === 'credentials'
                  ? `/assets/avatar/${
                      isMale ? 'male' : isFemale ? 'female' : 'other'
                    }.png`
                  : user.image
              }`}
              referrerPolicy="no-referrer"
              onClick={
                !mobile ? handleMenu : () => toggleProfileDrawer('right', true)
              }
            />
          )}
        </>
      ) : (
        <AccountCircleIcon
          onClick={
            !mobile ? handleMenu : () => toggleProfileDrawer('right', true)
          }
          sx={{
            width: 40,
            height: 40,
            color: isLightTheme ? 'var(--dark)' : '',
          }}
        />
      )}
    </Box>
  );
}
