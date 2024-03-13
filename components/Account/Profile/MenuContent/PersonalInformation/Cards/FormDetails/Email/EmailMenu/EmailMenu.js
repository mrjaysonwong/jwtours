import React, { useState, useContext } from 'react';
import { Menu, MenuItem, IconButton, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SetPrimary from './SetPrimary';
import { EmailContext } from '../Email';

const options = [
  { label: 'Set as Primary', action: 'setPrimary' },
  { label: 'Delete', action: 'delete' },
];

export default function EmailMenu() {
  const { isPrimary } = useContext(EmailContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openPrimary, setOpenPrimary] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetPrimary = () => {
    setOpenPrimary(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
  };

  const filteredOptions = options.filter(
    (option) => !isPrimary || option.action !== 'setPrimary'
  );

  return (
    <>
      <Box sx={{ position: 'absolute', right: 5 }}>
        <IconButton
          aria-label="more"
          id="overflow-button"
          aria-controls={open ? 'overflow-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="overflow-menu"
          MenuListProps={{
            'aria-labelledby': 'overflow-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {filteredOptions.map((option) => (
            <MenuItem
              key={option.action}
              onClick={
                option.action === 'setPrimary' ? handleSetPrimary : handleDelete
              }
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <SetPrimary open={openPrimary} setOpen={setOpenPrimary} />
    </>
  );
}
