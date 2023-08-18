import Link from 'next/link';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  StyledButton,
  StyledDrawerList,
} from '@components/Layout/Styles/globals';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { styled } from '@mui/system';

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '1rem 0',
  button: {
    padding: '0.5rem',
  },

  'button:not(:last-child)': {
    marginBottom: '1rem',
  },
});

export const StyledMenu = styled(Menu)({
  li: {
    margin: '0 0.5rem',
    padding: 0,
    ':hover': {
      borderRadius: '10px',
      background: 'var(--bg-color3)',
      color: '#fff',
    },
  },
  a: {
    width: '100%',
    padding: '0.5rem 1rem',
  },
});

export const CustomList = ({ user, toggleDrawer, signIn, signOut }) => (
  <StyledDrawerList sx={{ p: 2 }}>
    <CloseIcon onClick={() => toggleDrawer('right2', false)} />

    <ButtonWrapper>
      {user ? (
        <StyledButton
          variant="contained"
          onClick={() => toggleDrawer('right2', false)}
        >
          <a onClick={() => signOut()}>Sign Out</a>
        </StyledButton>
      ) : (
        <ButtonWrapper>
          <StyledButton
            variant="contained"
            onClick={() => toggleDrawer('right2', false)}
          >
            <a onClick={() => signIn()}>Sign In</a>
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => toggleDrawer('right2', false)}
          >
            <Link href="auth/signup">
              <a>Sign Up</a>
            </Link>
          </StyledButton>
        </ButtonWrapper>
      )}
    </ButtonWrapper>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <Badge color="secondary" badgeContent={1}>
              <FavoriteBorderIcon />
            </Badge>
          </ListItemButton>
          <ListItemText primary={'Wishlist'} />
        </ListItem>
        <ListItem>
          <ListItemButton>
            <HelpOutlineOutlinedIcon />
          </ListItemButton>
          <ListItemText primary={'Help'} />
        </ListItem>
      </List>
    </Box>
  </StyledDrawerList>
);

export const CustomMenu = ({
  user,
  anchorEl,
  signIn,
  signOut,
  handleClose,
}) => (
  <StyledMenu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    disableAutoFocusItem
  >
    {user ? (
      <MenuItem onClick={handleClose}>
        <a onClick={() => signOut()}>Sign Out </a>
      </MenuItem>
    ) : (
      <div>
        <MenuItem onClick={handleClose}>
          <a onClick={() => signIn()}>Sign In</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="auth/signup">
            <a>Sign Up</a>
          </Link>
        </MenuItem>
      </div>
    )}

    <Divider sx={{ my: 1 }} />

    <MenuItem onClick={handleClose}>
      <Link href="/">
        <Badge color="secondary" badgeContent={1}>
          <a>Wishlist</a>
        </Badge>
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Link href="/">
        <a>Help</a>
      </Link>
    </MenuItem>
  </StyledMenu>
);
