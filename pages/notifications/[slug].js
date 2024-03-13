import { useRouter } from 'next/router';
import { AppBar, Toolbar } from '@mui/material';
import AuthenticationFailed from '@components/Notifications/AuthenticationFailed';
import PaymentFailed from '@components/Notifications/PaymentFailed';
import Error from '@components/Notifications/Error';
import NotificationsPage from '.';
import Logo from '@components/Layout/Navbar/Logo/Logo';
import { MainContainer } from '@components/Layout/Styles/globals';
import Footer from '@components/Layout/Footer/Footer';

export default function NotificationSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  const renderNotificationComponent = (slug) => {
    switch (slug) {
      case 'authentication-failed':
        return <AuthenticationFailed />;
      case 'payment-failed':
        return <PaymentFailed />;
      case 'error':
        return <Error />;
      default:
        return <NotificationsPage />;
    }
  };
  return (
    <>
      <MainContainer sx={{ m: 2, textAlign: 'center' }}>
        <AppBar elevation={0} color="inherit">
          <Toolbar>
            <Logo />
          </Toolbar>
        </AppBar>
        {renderNotificationComponent(slug)}
      </MainContainer>

      <Footer />
    </>
  );
}
