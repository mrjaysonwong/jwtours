import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Avatar,
} from '@mui/material';
import {
  StyledButton,
  StyledDrawerList,
} from '@components/Layout/Styles/globals';
import { ButtonWrapper, UserInfoWrapper } from '../styled';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ProfileContext } from '@components/Layout/Navbar';
import { useDrawerStore } from 'stores/drawerStore';
import { handleClick } from 'utils/helper/common';

export default function CustomDrawerList() {
  const router = useRouter();
  const { user } = useContext(ProfileContext);
  const { toggleDrawer } = useDrawerStore();

  return (
    <StyledDrawerList sx={{ p: 2 }}>
      {user && (
        <UserInfoWrapper>
          <Avatar
            alt="avatar"
            src={user.image}
            referrerPolicy="no-referrer"
            sx={{ width: 42, height: 42, mr: 1 }}
          />
          <a>{user.name}</a>
        </UserInfoWrapper>
      )}

      <ButtonWrapper>
        {user ? (
          <StyledButton
            variant="contained"
            onClick={() =>
              handleClick(
                'signout',
                router,
                toggleDrawer,
                'drawer'
              )
            }
            startIcon={<LogoutIcon />}
          >
            Sign Out
          </StyledButton>
        ) : (
          <>
            <StyledButton
              variant="contained"
              onClick={() =>
                handleClick('signin', router, toggleDrawer, 'drawer')
              }
              startIcon={<LoginIcon />}
            >
              Sign In
            </StyledButton>

            <StyledButton
              variant="contained"
              onClick={() =>
                handleClick('signup', router, toggleDrawer, 'drawer')
              }
              startIcon={<HowToRegOutlinedIcon />}
            >
              Sign Up
            </StyledButton>
          </>
        )}
      </ButtonWrapper>

      <Divider />

      <List sx={{ my: 1 }}>
        <>
          <ListItemButton
            onClick={() =>
              handleClick('wishlist', router, toggleDrawer, 'drawer')
            }
          >
            <ListItemIcon>
              <Badge color="secondary" badgeContent={0} showZero>
                <FavoriteBorderIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'Wishlist'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleClick('help', router, toggleDrawer, 'drawer')}
          >
            <ListItemIcon>
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Help'} />
          </ListItemButton>
        </>
      </List>
    </StyledDrawerList>
  );
}
