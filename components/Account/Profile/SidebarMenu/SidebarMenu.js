import { StyledDrawerTemporary, StyledDrawerPermanent } from './styled';

export default function SidebarMenu(props) {
  const { drawer, state, toggleProfileDrawer } = props;
  return (
    <>
      <StyledDrawerTemporary
        variant="temporary"
        anchor="left"
        open={state['left']}
        onClose={() => toggleProfileDrawer('left', false)}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {drawer}
      </StyledDrawerTemporary>

      <StyledDrawerPermanent
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {drawer}
      </StyledDrawerPermanent>
    </>
  );
}
