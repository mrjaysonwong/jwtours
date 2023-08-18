import { useContext } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Drawer } from '@mui/material';
import { CustomList, CustomMenu } from './styled';
import { useDrawerStore } from 'stores/drawerStore';
import { ProfileContext } from '../Navbar';

export default function ProfileMenuBar() {
  const { state, toggleDrawer } = useDrawerStore();
  const { user, anchorEl, handleClose, mobile } = useContext(ProfileContext);

  return (
    <>
      {user ? (
        mobile ? (
          <Drawer
            variant="temporary"
            anchor="right"
            open={state['right2']}
            onClose={() => toggleDrawer('right2', false)}
          >
            <CustomList
              user={user}
              toggleDrawer={toggleDrawer}
              signOut={signOut}
            />
          </Drawer>
        ) : (
          <CustomMenu
            user={user}
            anchorEl={anchorEl}
            handleClose={handleClose}
            signOut={signOut}
          />
        )
      ) : mobile ? (
        <Drawer
          variant="temporary"
          anchor="right"
          open={state['right2']}
          onClose={() => toggleDrawer('right2', false)}
        >
          <CustomList toggleDrawer={toggleDrawer} signIn={signIn} />
        </Drawer>
      ) : (
        <CustomMenu
          user={user}
          anchorEl={anchorEl}
          handleClose={handleClose}
          signIn={signIn}
        />
      )}
    </>
  );
}
