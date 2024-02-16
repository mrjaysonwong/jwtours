import { useContext } from 'react';
import {
  Divider,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Typography,
  Fade,
  Box,
} from '@mui/material';
import { UserInfoWrapper } from '../styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBarContext } from '@components/Layout/Navbar/Navbar';
import { useMenuStore } from 'stores/menuStore';
import { handleClick } from '@utils/helper/functions/navigation';
import { profileMenuRoutes } from '@src/routes/profileMenuRoutes';
import { authButtons } from '@src/routes/navRoutes';
import { useUserData } from '@utils/hooks/useUserData';

export default function CustomMenu() {
  const { user, uploadedImage, initialFname, router, isLightTheme } =
    useContext(AppBarContext);

  const userId = user?._id;

  const { data } = useUserData(userId);
  const userData = data?.result;
  const foundPrimary = userData?.email.find((e) => e.isPrimary === true);

  const { anchorEl, handleClose } = useMenuStore();

  const menuList = profileMenuRoutes.map((e, idx) => (
    <MenuItem
      key={idx}
      onClick={() => handleClick(e.pathName, router, e.path, handleClose)}
    >
      <ListItemIcon>{e.icon}</ListItemIcon>
      <ListItemText primary={e.pathName} />
    </MenuItem>
  ));

  const authButtonsList = authButtons.map((e, idx) => (
    <MenuItem
      key={idx}
      onClick={() => handleClick(e.pathName, router, undefined, handleClose)}
    >
      <ListItemIcon>{e.icon}</ListItemIcon>
      <ListItemText primary={e.pathName} />
    </MenuItem>
  ));

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocusItem
        TransitionComponent={Fade}
        sx={{
          '& .MuiMenu-paper': {
            background: isLightTheme ? 'var(--light)' : 'var(--dark)',
          },
        }}
      >
        {user ? (
          <div>
            <UserInfoWrapper>
              {uploadedImage ? (
                <Avatar
                  alt="avatar"
                  src={uploadedImage}
                  referrerPolicy="no-referrer"
                  sx={{ width: 42, height: 42 }}
                />
              ) : (
                <Avatar alt="avatar" sx={{ width: 42, height: 42 }}>
                  {initialFname}
                </Avatar>
              )}
              <Box sx={{ m: 1 }}>
                <Typography variant="body1">{user.name}</Typography>
                <Typography variant="body2">{foundPrimary?.email}</Typography>
              </Box>
            </UserInfoWrapper>

            <Divider sx={{ my: 1 }} />

            {menuList}

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={() =>
                handleClick('Sign Out', router, undefined, handleClose)
              }
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </MenuItem>
          </div>
        ) : (
          <div>{authButtonsList}</div>
        )}
      </Menu>
    </>
  );
}
