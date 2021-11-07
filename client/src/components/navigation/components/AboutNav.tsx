import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouteLink } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Button } from '../../button/Button';

interface AboutMobileNavProps {
  onClose: () => void;
}

export const AboutMobileNav: React.FC<AboutMobileNavProps> = ({ onClose }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const handleClick = () => {
    setAboutOpen(!aboutOpen);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="ABOUT KCSA" />
        {aboutOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={aboutOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            component={RouteLink}
            to="/overview"
            onClick={onClose}
            button
            style={{ paddingLeft: '3rem', paddingTop: '0' }}
          >
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem
            component={RouteLink}
            to="/president"
            button
            onClick={onClose}
            style={{ paddingLeft: '3rem', paddingTop: '0' }}
          >
            <ListItemText primary="President" />
          </ListItem>

          <ListItem
            component={RouteLink}
            to="/contact"
            button
            onClick={onClose}
            style={{ paddingLeft: '3rem', paddingTop: '0' }}
          >
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export const AboutNav: React.FC = () => {
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
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="white">About KCSA</Box>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={RouteLink} to="/overview">
          Overview
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouteLink} to="/president">
          President
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouteLink} to="/contact">
          Contact us
        </MenuItem>
      </Menu>
    </>
  );
};
