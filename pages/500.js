import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { MainContainer } from '@components/Layout/Styles/globals';

export default function Custom500() {
  return (
    <MainContainer>
      <Typography variant="h4">500 - Server-side error occurred</Typography>
      <Link href="/">
        <Button variant="outlined">Back to Home page</Button>
      </Link>
    </MainContainer>
  );
}
