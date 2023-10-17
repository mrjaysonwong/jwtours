import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export const profileMenuRoutes = [
  {
    pathName: 'Profile',
    path: '/account/profile',
    icon: <PersonOutlineOutlinedIcon />,
    type: 'drawer',
  },
  {
    pathName: 'Bookings',
    path: '/account/bookings',
    icon: <AirplaneTicketOutlinedIcon />,
    type: 'drawer',
  },
  {
    pathName: 'Wishlist',
    path: '/account/wishlist',
    icon: <FavoriteBorderIcon />,
    type: 'drawer',
  },
  {
    pathName: 'Help',
    path: '/account/help',
    icon: <HelpOutlineOutlinedIcon />,
    type: 'drawer',
  },
];
