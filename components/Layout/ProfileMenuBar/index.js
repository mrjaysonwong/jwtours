import { useContext } from 'react';
import { Drawer } from '@mui/material';
import CustomDrawerList from './CustomDrawerList';
import CustomMenu from './CustomMenu';
import { useDrawerStore } from 'stores/drawerStore';
import { ProfileContext } from '@components/Layout/Navbar';

export default function ProfileMenuBar() {
  const { state, toggleDrawer } = useDrawerStore();
  const { mobile } = useContext(ProfileContext);

  return (
    <>
      {mobile ? (
        <Drawer
          variant="temporary"
          anchor="right"
          open={state['right2']}
          onClose={() => toggleDrawer('right2', false)}
        >
          <CustomDrawerList />
        </Drawer>
      ) : (
        <CustomMenu />
      )}
    </>
  );
}
