import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { SubContainer } from '@components/Layout/Styles/globals';
import { drawerWidth } from '@utils/helper/navigation';
import { appBarHeight } from '@utils/helper/navigation';
import MenuContent from './MenuContent';
import Footer from '@components/Layout/Footer';
import Skeleton from '@components/Layout/Loaders/Skeleton';

export default function AccountProfile() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    if (!query.tab) {
      router.replace({
        pathname: '/account/profile',
        query: { tab: 'personal' },
      });
    }
  }, [router]);

  if (!router.query.tab || isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <SubContainer
        sx={{
          pt: 3,
          px: 6,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: `calc(${appBarHeight}px + 0px)`,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <MenuContent />

        <Footer />
      </SubContainer>
    </>
  );
}
