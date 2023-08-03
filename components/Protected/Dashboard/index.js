import Link from 'next/link';
import { Button } from '@mui/material';

export default function Dashboard() {
  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <Link href="/">
        <Button variant="outlined">Back to Home page</Button>
      </Link>
    </>
  );
}
