import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { navRoutes } from '@src/routes/navRoutes';
import { StyledDrawer, StyledList } from './styled';
import { useNavDrawerStore } from 'stores/drawerStore';

export default function SidebarMenu() {
  const { state, toggleNavDrawer } = useNavDrawerStore();

  const router = useRouter();

  const drawer = (
    <Box>
      <StyledList>
        {navRoutes.map((e, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton>
              <Link href={e.path}>
                <ListItemText
                  className={router.pathname === e.path ? 'active' : null}
                  primary={e.pathName}
                  onClick={() => toggleNavDrawer('left', false)}
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: 500,
                    textAlign: 'center',
                    py: 1.5,
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </Box>
  );

  return (
    <>
      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={state['left']}
        onClose={() => toggleNavDrawer('left', false)}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
}
