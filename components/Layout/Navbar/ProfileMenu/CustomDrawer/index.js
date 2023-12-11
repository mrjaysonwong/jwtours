import { useContext } from 'react';
import { Button, Typography, Divider, Avatar } from '@mui/material';
import {
  StyledButton,
  StyledDrawerList,
} from '@components/Layout/Styles/globals';
import { ButtonWrapper, UserInfoWrapper } from '../styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBarContext } from '@components/Layout/Navbar';
import { useProfileDrawerStore } from 'stores/drawerStore';
import { profileMenuRoutes } from '@src/routes/profileMenuRoutes';
import { authButtons } from '@src/routes/navRoutes';
import { handleClick } from '@utils/helper/navigation';

export default function CustomDrawerList() {
  const { user, uploadedImage, initialFname, router } =
    useContext(AppBarContext);

  const { toggleProfileDrawer } = useProfileDrawerStore();

  const menuList = profileMenuRoutes.map((e, idx) => (
    <StyledButton
      key={idx}
      variant="contained"
      onClick={() =>
        handleClick(e.pathName, router, e.path, toggleProfileDrawer, e.type)
      }
      startIcon={e.icon}
    >
      {e.pathName}
    </StyledButton>
  ));

  const authButtonsList = authButtons.map((e, idx) => (
    <StyledButton
      key={idx}
      variant="contained"
      onClick={() =>
        handleClick(
          e.pathName,
          router,
          undefined,
          undefined,
          toggleProfileDrawer,
          e.type
        )
      }
    >
      {e.pathName}
    </StyledButton>
  ));

  return (
    <StyledDrawerList>
      {user && (
        <>
          <UserInfoWrapper>
            {uploadedImage ? (
              <Avatar
                alt="avatar"
                src={uploadedImage}
                referrerPolicy="no-referrer"
                sx={{ width: 42, height: 42, mb: 1 }}
              />
            ) : (
              <Avatar alt="avatar" sx={{ width: 42, height: 42, mb: 1 }}>
                {initialFname}
              </Avatar>
            )}
            <Typography variant="body1">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </UserInfoWrapper>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      <ButtonWrapper>
        {user ? (
          <>
            {menuList}

            <Divider sx={{ mb: 2 }} />

            <Button
              variant="outlined"
              onClick={() =>
                handleClick(
                  'Sign Out',
                  undefined,
                  undefined,
                  undefined,
                  toggleProfileDrawer,
                  'drawer'
                )
              }
              startIcon={<LogoutIcon />}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>{authButtonsList}</>
        )}
      </ButtonWrapper>
    </StyledDrawerList>
  );
}
