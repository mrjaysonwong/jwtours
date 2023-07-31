import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { styled, keyframes } from '@mui/system';

const spin = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const RotatedIcon = styled(SettingsOutlinedIcon)({
  animation: `${spin} 3s infinite ease`,
  color: '#fff',
  margin: '0.2rem',
});

export default function SettingsIcon() {
  return (
    <>
      <RotatedIcon />
    </>
  );
}
