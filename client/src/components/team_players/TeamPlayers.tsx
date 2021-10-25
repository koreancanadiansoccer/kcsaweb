import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import map from 'lodash/map';

import { LeaguePlayer } from '../../types/player';
import { YellowCard } from '../icons/YellowCard';
import { RedCard } from '../icons/RedCard';
import { displayName } from '../../utils/format';

interface TeamPlayersProp {
  players: LeaguePlayer[];
  className?: string;
}
const UnstyledTeamPlyers: FunctionComponent<TeamPlayersProp> = ({
  players,
  className,
}) => {
  return (
    <Box className={className}>
      <Divider />

      {/* Table Header */}
      <Box
        display="flex"
        py={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box minWidth={'20%'}></Box>

        <Box textAlign="center" flex={1}>
          GOAL
        </Box>

        <Box textAlign="center" flex={1}>
          <YellowCard />
        </Box>

        <Box textAlign="center" flex={1}>
          <RedCard />
        </Box>
      </Box>
      <Divider />

      {/* List of players */}
      {map(players, (player) => (
        <Box position="relative" key={`players-${player.name}`}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            py={3}
          >
            <Box width={'20%'} className="boldText" fontSize={'1.875rem'}>
              {displayName(player.name)}
            </Box>

            <Box textAlign="center" flex={1} fontSize={'1rem'}>
              {player.goalScored}
            </Box>

            <Box textAlign="center" flex={1} fontSize={'1rem'}>
              {player.yellowCard}
            </Box>
            <Box textAlign="center" flex={1} fontSize={'1rem'}>
              0
            </Box>
          </Box>

          {/* TODO: Only show on big screen */}
          <Box position="absolute" top={0} left="20%" height="100%">
            <Divider orientation="vertical" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const TeamPlayers = withTheme(styled(UnstyledTeamPlyers)`
  .table {
    display: table;
  }

  .table__row {
    display: table-row;
  }

  .table__cell {
    display: table-cell;
  }
  .test {
    flex: 1;
  }
`);
