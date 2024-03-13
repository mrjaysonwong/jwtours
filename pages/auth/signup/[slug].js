import { useRouter } from 'next/router';
import Confirmation from '@components/SignUp/Confirmation/Confirmation';
import SignUpPage from '.';
import { MainContainer } from '@components/Layout/Styles/globals';
import Footer from '@components/Layout/Footer/Footer';

export default function SignUpSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  const renderSignUpComponent = (slug) => {
    switch (slug) {
      case 'confirmation':
        return <Confirmation />;

      default:
        return <SignUpPage />;
    }
  };

  return (
    <>
      <MainContainer sx={{ m: 2, textAlign: 'center' }}>
        {renderSignUpComponent(slug)}
      </MainContainer>

      <Footer />
    </>
  );
}
