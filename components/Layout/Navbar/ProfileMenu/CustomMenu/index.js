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
} from '@mui/material';
import { UserInfoWrapper } from '../styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBarContext } from '@components/Layout/Navbar';
import { useMenuStore } from 'stores/menuStore';
import { handleClick } from '@utils/helper/navigation';
import { profileMenuRoutes } from '@src/routes/profileMenuRoutes';
import { authButtons } from '@src/routes/navRoutes';

export default function CustomMenu() {
  const { user, router, isLightTheme } = useContext(AppBarContext);
  const isMale = user?.gender === 'male';
  const isFemale = user?.gender === 'female';
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
                sx={{ width: 42, height: 42, mb: 1 }}
              />
              <Typography variant="body1">{user.name}</Typography>
              <Typography variant="body2">{user.email}</Typography>
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
