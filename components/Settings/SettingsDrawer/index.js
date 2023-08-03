import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box, Drawer } from '@mui/material';
import SettingsIcon from '../SettingsIcon';
import CardOne from './Cards/CardOne';
import CardTwo from './Cards/CardTwo';
import { Tooltip } from '@mui/material';
import {
  StyledIconButton,
  StyledDrawerList,
  StyledCard,
} from '@components/Settings/SettingsDrawer/styled';

export default function SettingsDrawer() {
  const { data: session, status } = useSession();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(anchor, true)}>
      <StyledDrawerList>
        <StyledCard>
          <CardOne />
        </StyledCard>
        <StyledCard>
          <CardTwo />
        </StyledCard>
      </StyledDrawerList>
    </Box>
  );

  return (
    <>
      {status !== 'loading' && (
        <Tooltip title="Live Customize" placement="bottom" arrow>
          <StyledIconButton onClick={toggleDrawer('right', true)}>
            <SettingsIcon />
          </StyledIconButton>
        </Tooltip>
      )}

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}
