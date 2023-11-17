import { styled } from '@mui/system';
import { Box, Typography, Skeleton as MUISkeleton } from '@mui/material';
import { drawerWidth } from '@utils/helper/navigation';

const variantOne = ['1'];
const variantTwo = ['1', '1'];
const variantThree = ['1', '1', '1'];

const StyledSkeleton = styled(MUISkeleton)({
  marginTop: '3px',
  height: '40px',
});

export default function Skeleton() {
  return (
    <Box>
      {variantOne.map((variant, idx) => (
        <Typography component="div" key={idx} variant={variant}>
          <StyledSkeleton animation="wave" width="60%" />
        </Typography>
      ))}
      <br />
      {variantTwo.map((variant, idx) => (
        <Typography component="div" key={idx} variant={variant}>
          <StyledSkeleton animation="wave" width="100%" />
        </Typography>
      ))}
      {variantOne.map((variant, idx) => (
        <Typography component="div" key={idx} variant={variant}>
          <StyledSkeleton animation="wave" width="80%" />
        </Typography>
      ))}
    </Box>
  );
}
