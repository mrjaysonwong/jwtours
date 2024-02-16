import { useRouter } from 'next/router';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import LoginInformation from './LoginInformation';
import { Box } from '@mui/material';


export default function MenuContent() {
  const router = useRouter();
  const { query } = router;


  return (
    <Box sx={{ minHeight: '100vh' }}>
      {query.tab === 'personal' && <PersonalInformation />}
      {query.tab === 'login' && <LoginInformation />}
    </Box>
  );
}
