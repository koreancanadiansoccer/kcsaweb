import React, { useState, useContext } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouteLink } from 'react-router-dom';
import map from 'lodash/map';
import Divider from '@material-ui/core/Divider';

import { Button } from '../../button/Button';
import { ViewerContext } from '../../../context/homeViewer';

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
