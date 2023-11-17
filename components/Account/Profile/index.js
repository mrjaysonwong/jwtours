import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SubContainer } from '@components/Layout/Styles/globals';
import { drawerWidth } from '@utils/helper/navigation';
import { appBarHeight } from '@utils/helper/navigation';
import MenuContent from './MenuContent';
import Footer from '@components/Layout/Footer';

export default function AccountProfile() {
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

  return (
    <>
      <SubContainer
        sx={{
          pt: 3,
          px: 6,
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
