import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { NavContent, LinksWrapper, ButtonWrapper } from './styled';
import { NavRoutes } from '@src/routes/navRoutes';

export default function Navbar(props) {
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const navLinks = NavRoutes.map((route) => {
    return (
      <ul key={route.path}>
        <Link href={route.path}>
          <a>
            <li>
              <Typography variant="body2">{route.pathName}</Typography>
            </li>
          </a>
        </Link>
      </ul>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: isLightTheme ? 'var(--background-color)' : '',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <a>
              <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <Image
                  src={'/assets/logo.png'}
                  width={55}
                  height={30}
                  priority
                  alt="logo"
                />
              </Box>
            </a>
          </Link>
          <NavContent sx={{ display: { xs: 'none', md: 'flex' } }}>
            <LinksWrapper>{navLinks}</LinksWrapper>

            <ButtonWrapper>
              {props.user ? (
                <Avatar
                  alt="avatar"
                  src={props.user.image}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <Button
                    variant="contained"
                    className="btn-signin"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                  <Link href="/auth/signup">
                    <Button variant="contained" className="btn-signup">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </ButtonWrapper>
          </NavContent>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
