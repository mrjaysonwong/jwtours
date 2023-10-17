import LoginIcon from '@mui/icons-material/Login';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

export const navRoutes = [
  {
    pathName: 'Home',
    path: '/',
  },
  {
    pathName: 'Destinations',
    path: '/destinations',
  },
  {
    pathName: 'Activites',
    path: '/activities',
  },
  {
    pathName: 'Trip Types',
    path: '/trip-types',
  },
  {
    pathName: 'Travel Guides',
    path: '/travel-guides',
  },
  {
    pathName: 'About',
    path: '/about',
  },
  {
    pathName: 'Protected',
    path: '/protected',
  },
  {
    pathName: 'Contact',
    path: '/contact',
  },
  // {
  //   pathName: 'Contact 2',
  //   path: '/contact2',
  // },
  // {
  //   pathName: 'Contact 3',
  //   path: '/contact3',
  // },
  // {
  //   pathName: 'Contact 4',
  //   path: '/contact4',
  // },
  // {
  //   pathName: 'Contact 5',
  //   path: '/contact5',
  // },
  // {
  //   pathName: 'Contact 6',
  //   path: '/contact6',
  // },
];

export const authButtons = [
  {
    pathName: 'Sign In',
    path: '',
    icon: <LoginIcon />,
    type: 'drawer',
  },
  {
    pathName: 'Sign Up',
    path: '/auth/signup',
    icon: <HowToRegOutlinedIcon />,
    type: 'drawer',
  },
];
