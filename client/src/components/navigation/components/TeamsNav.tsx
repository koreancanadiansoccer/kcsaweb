import React, { useState, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link as RouteLink } from 'react-router-dom';
import map from 'lodash/map';

import { Button } from '../../button/Button';
import { ViewerContext } from '../../../context/homeViewer';

export const TeamsNav: React.FC = () => {
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
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="white">Clubs</Box>
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
        {map(viewer?.leagueTeamGroupAge, (leagueTeams, key) => {
          return (
            <Box key={`team-age-${key}`}>
              <Divider />

              <Box textAlign="center" className="boldText">
                {key}
              </Box>

              <Divider />

              {map(leagueTeams, (leagueTeam) => (
                <Box
                  key={`team-nav-link-${leagueTeam.team.name}-${leagueTeam.id}`}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={RouteLink}
                    to={`/teams/${leagueTeam.id}`}
                  >
                    <Box textAlign="center"> {leagueTeam.team.name}</Box>
                  </MenuItem>
                </Box>
              ))}
            </Box>
          );
        })}
      </Menu>
    </>
  );
};
