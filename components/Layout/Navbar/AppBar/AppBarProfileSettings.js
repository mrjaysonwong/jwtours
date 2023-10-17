import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import Logo from '../Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledList } from '../styled';
import AvatarProfile from '../AvatarProfile';
import { useProfileDrawerStore } from '@stores/drawerStore';
import { profileSettingsRoutes } from '@src/routes/profileSettingsRoutes';
import SidebarProfileMenu from '@components/Account/Profile/SidebarMenu';
import { AppBarContext } from '..';
import { appBarHeight } from '@utils/helper/navigation';

export default function AppBarProfileSettings() {
  const router = useRouter();
  const { query } = router;

  const { isLightTheme } = useContext(AppBarContext);

  const { state, toggleProfileDrawer } = useProfileDrawerStore();
  
  const [activeTab, setActiveTab] = useState(query.tab || 'personal');

  useEffect(() => {
    setActiveTab(query.tab || 'personal');
  }, [query.tab]);

  const handleClick = (tab) => {
    setActiveTab(tab);
    toggleProfileDrawer('left', false);
    router.replace({ query: { tab } });
  };

  const drawer = (
    <div>
      <Divider role="presentation" sx={{ m: 2 }}>
        <Chip label="Profile Settings" />
      </Divider>

      <StyledList>
        {profileSettingsRoutes.map((e, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton
              sx={{ py: 2 }}
              className={activeTab === e.tab ? 'active' : null}
              onClick={() => handleClick(e.tab)}
            >
              <ListItemIcon>
                {activeTab === e.tab ? e.icon : e.iconOutline}
              </ListItemIcon>
              <ListItemText primary={e.tabName} />
            </ListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          background: isLightTheme ? 'var(--light)' : null,
          display: 'flex',
          justifyContent: 'center',
          minHeight: appBarHeight,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="open menu"
            onClick={() => toggleProfileDrawer('left', true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <AvatarProfile />
        </Toolbar>
      </AppBar>

      <nav aria-label="profile settings tabs">
        <SidebarProfileMenu
          drawer={drawer}
          state={state}
          toggleProfileDrawer={toggleProfileDrawer}
        />
      </nav>
    </>
  );
}
