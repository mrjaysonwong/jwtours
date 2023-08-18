import { useSession } from 'next-auth/react';
import { Drawer, Box } from '@mui/material';
import SettingsIcon from '../SettingsIcon';
import CardOne from './Cards/CardOne';
import CardTwo from './Cards/CardTwo';
import { Tooltip } from '@mui/material';
import {
  StyledIconButton,
  StyledCard,
} from '@components/Settings/SettingsDrawer/styled';
import { StyledDrawerList } from '@components/Layout/Styles/globals';
import { useDrawerStore } from 'stores/drawerStore';

export default function SettingsDrawer() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const { state, toggleDrawer } = useDrawerStore();

  const list = () => (
    <StyledDrawerList sx={{ p: 2 }}>
      <StyledCard>
        <CardOne />
      </StyledCard>
      <StyledCard>
        <CardTwo />
      </StyledCard>
    </StyledDrawerList>
  );

  return (
    <>
      {!isLoading && (
        <Tooltip title="Live Customize" placement="bottom" arrow>
          <StyledIconButton onClick={() => toggleDrawer('right', true)}>
            <SettingsIcon />
          </StyledIconButton>
        </Tooltip>
      )}

      <Drawer
        variant="temporary"
        anchor="right"
        open={state['right']}
        onClose={() => toggleDrawer('right', false)}
      >
        {list()}
      </Drawer>
    </>
  );
}
