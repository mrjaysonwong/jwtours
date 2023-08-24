import { signIn, signOut } from 'next-auth/react';

export const getUrl = (previousUrl, prevPath) => {
  const pathname =
    previousUrl === undefined ? prevPath : new URL(previousUrl).pathname;

  const redirectUrl = pathname === pathname ? previousUrl : '/';

  return redirectUrl;
};

export const handleClick = (
  action,
  router,
  handleClose,
  toggleDrawer,
  drawer
) => {
  switch (action) {
    case 'signup':
      router.push('auth/signup');
      break;
    case 'signin':
      signIn();
      break;
    case 'signout':
      signOut();
      break;
    case 'wishlist':
    case 'help':
      router.push('/protected');
      break;
  }

  if (drawer) {
    toggleDrawer('right2', false);
  } else {
    handleClose();
  }
};
