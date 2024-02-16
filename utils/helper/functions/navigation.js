import { signIn, signOut } from 'next-auth/react';

export const companyName = 'JWtours';
export const drawerWidth = 280;
export const appBarHeight = 64;

export const handleClick = (
  pathName,
  router,
  path,
  handleClose,
  toggleProfileDrawer,
  drawer
) => {
  switch (pathName) {
    case 'Sign Up':
      router.push('/auth/signup');
      break;
    case 'Sign In':
      signIn();
      break;
    case 'Sign Out':
      signOut({ callbackUrl: '/' });
      break;
    case 'Profile':
      router.push(path);
      break;
    case 'Wishlist':
    case 'Help':
      router.push(path);
      break;
  }

  if (drawer) {
    toggleProfileDrawer('right', false);
  } else {
    handleClose();
  }
};
