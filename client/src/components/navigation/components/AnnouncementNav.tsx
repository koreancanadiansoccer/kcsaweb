import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouteLink } from 'react-router-dom';

import { Button } from '../../button/Button';

interface AnnouncementMobileNavProps {
  onClose: () => void;
}

export const AnnouncementMobileNav: React.FC<AnnouncementMobileNavProps> = ({
  onClose,
}) => {
  const [announceOpen, setAnnounceOpen] = useState(false);
  const handleClick = () => {
    setAnnounceOpen(!announceOpen);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="ANNOUNCEMENT" />
        {announceOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={announceOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            component={RouteLink}
            to="/announcement"
            onClick={onClose}
            button
            style={{ paddingLeft: '3rem', paddingTop: '0' }}
          >
            <ListItemText primary="News and Notice" />
          </ListItem>

          <ListItem
            component={RouteLink}
            to="/gallery"
            button
            onClick={onClose}
            style={{ paddingLeft: '3rem', paddingTop: '0' }}
          >
            <ListItemText primary="Media" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

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
