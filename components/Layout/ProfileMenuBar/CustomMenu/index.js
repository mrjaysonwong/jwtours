import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Divider,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ProfileContext } from '@components/Layout/Navbar';
import { useMenuStore } from 'stores/menuStore';
import { handleClick } from 'utils/helper/common';

export default function CustomMenu() {
  const router = useRouter();
  const { user } = useContext(ProfileContext);
  const { anchorEl, handleClose } = useMenuStore();

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocusItem
      >
        {user ? (
          <div>
            <MenuItem sx={{ ':hover': { background: 'none' } }}>
              <Avatar
                alt="avatar"
                src={user.image}
                referrerPolicy="no-referrer"
                sx={{ width: 42, height: 42, mr: 1 }}
              />
              <Link href="/">
                <a>{user.name}</a>
              </Link>
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={() => handleClick('signout', router, handleClose)}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={() => handleClick('signin', router, handleClose)}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign In'} />
            </MenuItem>
            <MenuItem
              onClick={() => handleClick('signup', router, handleClose)}
            >
              <ListItemIcon>
                <HowToRegOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Up'} />
            </MenuItem>
          </div>
        )}

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => handleClick('wishlist', router, handleClose)}>
          <ListItemIcon>
            <Badge color="secondary" badgeContent={0} showZero>
              <FavoriteBorderIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={'Wishlist'} />
        </MenuItem>
        <MenuItem onClick={() => handleClick('help', router, handleClose)}>
          <ListItemIcon>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Help'} />
        </MenuItem>
      </Menu>
    </>
  );
}
