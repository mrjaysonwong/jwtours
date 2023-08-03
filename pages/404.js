import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Custom404() {
  return (
    <MainContainer>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Link href="/">
        <Button variant="outlined">Back to Home page</Button>
      </Link>
    </MainContainer>
  );
}
