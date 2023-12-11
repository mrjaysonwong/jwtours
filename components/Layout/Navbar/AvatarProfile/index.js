import { useContext } from 'react';
import { Avatar, Box, Skeleton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMenuStore } from 'stores/menuStore';
import { useProfileDrawerStore } from '@stores/drawerStore';
import { AppBarContext } from '..';

export default function AvatarProfile() {
  const { user, uploadedImage, initialFname, mobile, isLightTheme, isLoading } =
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
          ) : uploadedImage ? (
            <Avatar
              alt="avatar"
              src={uploadedImage}
              referrerPolicy="no-referrer"
              onClick={
                !mobile ? handleMenu : () => toggleProfileDrawer('right', true)
              }
            />
          ) : (
            <Avatar
              alt="avatar"
              onClick={
                !mobile ? handleMenu : () => toggleProfileDrawer('right', true)
              }
            >
              {initialFname}
            </Avatar>
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
