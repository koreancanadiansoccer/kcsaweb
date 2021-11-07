import React, { useState, useContext } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouteLink } from 'react-router-dom';
import map from 'lodash/map';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Button } from '../../button/Button';
import { ViewerContext } from '../../../context/homeViewer';

interface LeagueMobileNavProps {
  onClose: () => void;
}

export const LeagueMobileNav: React.FC<LeagueMobileNavProps> = ({
  onClose,
}) => {
  const { viewer } = useContext(ViewerContext);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const handleClick = () => {
    setLeagueOpen(!leagueOpen);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="LEAGUE" />
        {leagueOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={leagueOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {map(viewer?.leagues, (league) => {
            return (
              <Box key={`league-age-${league.leagueAgeType}`}>
                <Divider
                  style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }}
                />
                <Box style={{ fontSize: '1rem' }}>{league.leagueAgeType}</Box>
                <Divider
                  style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }}
                />

                <Box key={`league-nav-link-${league.name}-${league.id}`}>
                  <ListItem
                    component={RouteLink}
                    to={`/league/${league.id}`}
                    onClick={onClose}
                    button
                    style={{ paddingLeft: '3rem', paddingTop: '0' }}
                  >
                    <ListItemText primary={league.name} />
                  </ListItem>
                </Box>
              </Box>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export const LeagueNav: React.FC = () => {
  const { viewer } = useContext(ViewerContext);
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
        aria-controls="league-tab"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="white">league</Box>
      </Button>

      <Menu
        id="league-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleClose}
      >
        {map(viewer?.leagues, (league) => {
          return (
            <Box key={`league-age-${league.leagueAgeType}`}>
              <Divider />

              <Box textAlign="center" className="boldText">
                {league.leagueAgeType}
              </Box>

              <Divider />

              <Box key={`league-nav-link-${league.name}-${league.id}`}>
                <MenuItem
                  onClick={handleClose}
                  component={RouteLink}
                  to={`/league/${league.id}`}
                >
                  <Box textAlign="center"> {league.name}</Box>
                </MenuItem>
              </Box>
            </Box>
          );
        })}
      </Menu>
    </>
  );
};
