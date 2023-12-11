import { styled } from '@mui/system';
import { Box, CardContent } from '@mui/material';

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: ' center',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--light-two)' : 'var(--dark)',

  p: {
    color: 'gray',
    fontSize: '10px',
    margin: '1rem 0',
    maxWidth: '200px',
    textAlign: 'center',
  },
}));

export const PictureWrapper = styled(Box)({
  display: 'flex',
  position: 'relative',
  border: '1px dashed gray',
  borderRadius: '50%',
  padding: '2px',

  '&:hover .upload-overlay': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
});

export const UploadOverlay = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'rgba(105, 102, 102, 0.5)',
  borderRadius: '50%',
  top: 0,
  left: 0,
  zIndex: 1,
  display: 'none',

  '.text': {
    color: '#fff',
    fontSize: '0.8rem',
    margin: 0,
    padding: 0,
  },

  svg: {
    height: '40px',
    width: '40px',
    color: '#fff',
  },
});

export const StyledInputUpdatePhoto = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const CropContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '80px',
});

export const Controls = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  width: '50%',
  transform: 'translateX(-50%)',
  height: 80,
  display: 'flex',
  alignItems: 'center',
});
