import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 2,
        mt: 10,
        color: 'gray',

        '& p:not(:last-child):after': {
          content: "'|'",
          mx: 1,
        },

        a: {
          color: 'var(--link-color)',
        },
      }}
    >
      <Typography variant="body2">
        <Link href="/legal/user-agreement" replace>
          <a>Terms of use</a>
        </Link>
      </Typography>

      <Typography variant="body2">
        <Link href="/legal/privacy-policy" replace>
          <a>Privacy policy</a>
        </Link>
      </Typography>
    </Box>
  );
}
