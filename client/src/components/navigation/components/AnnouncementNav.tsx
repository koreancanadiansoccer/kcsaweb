import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouteLink } from 'react-router-dom';

import { Button } from '../../button/Button';

export const AnnouncementNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="primary"
        aria-controls="announcement-tab"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="white">announcement</Box>
      </Button>

      <Menu
        id="announcement-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={RouteLink}
          to="/announcement"
        >
          News and Notice
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouteLink} to="/gallery">
          Media
        </MenuItem>
      </Menu>
    </>
  );
};
