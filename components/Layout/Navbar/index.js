import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { NavContent, LinksWrapper, ButtonWrapper } from './styled';

export default function Navbar() {
  const { data: session } = useSession();

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: isLightTheme ? 'var(--pastel-purple)' : '',
    
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
          <Box sx={{ display: { md: 'flex' } }}>
            <Image
              src={'/assets/logo.png'}
              width={55}
              height={30}
              priority
              alt="logo"
            />
          </Box>
          <NavContent sx={{ display: { xs: 'none', md: 'flex' } }}>
            <LinksWrapper>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Services</Link>
                </li>
                <li>
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
            </LinksWrapper>
            <ButtonWrapper>
              {session ? (
                <Button
                  variant="contained"
                  className="btn-signout"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btn-signin"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              )}

              <Link href="/auth/signup">
                <Button variant="contained" className="btn-signup">
                  Sign Up
                </Button>
              </Link>
            </ButtonWrapper>
          </NavContent>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
