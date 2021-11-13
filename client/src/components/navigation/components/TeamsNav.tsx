import React, { useState, useContext } from 'react';
import { isEmpty } from 'lodash';
import Divider from '@material-ui/core/Divider';
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
import map from 'lodash/map';

import { Button } from '../../button/Button';
import { ViewerContext } from '../../../context/homeViewer';

interface TeamMobileNavProps {
  onClose: () => void;
}

export const TeamMobileNav: React.FC<TeamMobileNavProps> = ({ onClose }) => {
  const { viewer } = useContext(ViewerContext);
  const [teameOpen, setTeamOpen] = useState(false);
  const handleClick = () => {
    setTeamOpen(!teameOpen);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="CLUBS" />
        {teameOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={teameOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isEmpty(viewer.leagueTeamGroupAge) && (
            <>
              <Divider style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }} />
              <Box fontSize="1rem" textAlign="center" px={2}>
                Coming soon
              </Box>
              <Divider style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }} />
            </>
          )}

          {map(viewer?.leagueTeamGroupAge, (leagueTeams, key) => {
            return (
              <Box key={`team-age-${key}`}>
                <Divider
                  style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }}
                />
                <Box style={{ fontSize: '1rem' }}>{key}</Box>
                <Divider
                  style={{ backgroundColor: 'rgb(255 255 255 / 36%)' }}
                />

                {map(leagueTeams, (leagueTeam) => (
                  <Box
                    key={`team-nav-link-${leagueTeam.team.name}-${leagueTeam.id}`}
                  >
                    <ListItem
                      component={RouteLink}
                      to={`/teams/${leagueTeam.id}`}
                      onClick={onClose}
                      button
                      style={{ paddingLeft: '3rem', paddingTop: '0' }}
                    >
                      <ListItemText primary={leagueTeam.team.name} />
                    </ListItem>
                  </Box>
                ))}
              </Box>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

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
        {isEmpty(viewer.leagueTeamGroupAge) && (
          <>
            <Divider />
            <Box textAlign="center" className="boldText" px={2}>
              Coming soon
            </Box>
            <Divider />
          </>
        )}

        {map(viewer?.leagueTeamGroupAge, (leagueTeams, key) => {
          return (
            <Box key={`team-age-${key}`}>
              <Divider />

              <Box textAlign="center" className="boldText">
                {key}
              </Box>

              <Divider />

              {leagueTeams.length === 0 ? (
                <Box textAlign="center" className="boldText" px={2}>
                  Coming soon
                </Box>
              ) : (
                map(leagueTeams, (leagueTeam) => (
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
                ))
              )}
            </Box>
          );
        })}
      </Menu>
    </>
  );
};
