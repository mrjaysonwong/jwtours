import { useContext } from 'react';
import { Drawer } from '@mui/material';
import CustomDrawer from './CustomDrawer/CustomDrawer';
import CustomMenu from './CustomMenu/CustomMenu';
import { useProfileDrawerStore } from 'stores/drawerStore';
import { AppBarContext } from '@components/Layout/Navbar/Navbar';

export default function ProfileMenu() {
  const { state, toggleProfileDrawer } = useProfileDrawerStore();
  const { mobile } = useContext(AppBarContext);

  return (
    <>
      {mobile ? (
        <Drawer
          variant="temporary"
          anchor="right"
          open={state['right']}
          onClose={() => toggleProfileDrawer('right', false)}
        >
          <CustomDrawer />
        </Drawer>
      ) : (
        <CustomMenu />
      )}
    </>
  );
}
