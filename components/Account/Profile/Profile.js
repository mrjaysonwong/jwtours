import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SubContainer } from '@components/Layout/Styles/globals';
import { drawerWidth } from '@utils/helper/functions/navigation';
import { appBarHeight } from '@utils/helper/functions/navigation';
import MenuContent from './MenuContent/MenuContent';
import Footer from '@components/Layout/Footer/Footer';

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
          p: 3,
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
