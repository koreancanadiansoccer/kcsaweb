import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import dayjs from 'dayjs';
import Divider from '@material-ui/core/Divider';

import { LeagueTeam } from '../../types/team';
import { OragneDot } from '../icons/OrangeDot';

interface TeamHistoryProps {
  leagueTeam: LeagueTeam;
  className?: string;
}

/**
 * Render team History section
 */
const UnstyledTeamHistory: FunctionComponent<TeamHistoryProps> = ({
  className,
  leagueTeam,
}) => {
  return (
    <Box className={className}>
      <Box className="boldText" fontSize='1.5rem' position="relative" mb={6}>
        HISTORY
        <Box className="greyBar"></Box>
      </Box>

      {/* General Info */}
      <Box display="flex" alignItems="baseline" justifyContent="start">
        <OragneDot />
        <Box
          display="flex"
          flexDirection="column"
          ml={2}
          justifyContent="space-between"
        >
          <Box className="boldText" my={1}>
            Club Officials: Stanley Moon
          </Box>

          <Box className="boldText" my={1}>
            Founded Date:
            {leagueTeam.team.foundedDate
              ? dayjs(leagueTeam.team.foundedDate, 'YYYY-MM').format(
                  'MMMM, YYYY'
                )
              : ' - '}
          </Box>
        </Box>
      </Box>

      <Box my={2}>
        <Divider />
      </Box>

      {/* Current Season stat */}
      <Box className="boldText" fontSize='1rem' position="relative" mb={1}>
        Current Season Stat (2021 KCAS Indoor)
      </Box>

      <Box display="flex" alignItems="baseline" justifyContent="start">
        <OragneDot />
        <Box
          display="flex"
          flexDirection="column"
          ml={2}
          justifyContent="space-between"
        >
          <Box className="boldText" my={1}>
            Total Wins: 5
          </Box>

          <Box className="boldText" my={1}>
            Total Loss: 2
          </Box>

          <Box className="boldText" my={1}>
            Total Ties: 3
          </Box>
        </Box>
      </Box>

      <Box my={2}>
        <Divider />
      </Box>

      {/* Historic Season stat */}
      <Box className="boldText" fontSize='1rem' position="relative" mb={1}>
        Historical Stat (Over all historic seasons played)
      </Box>

      <Box display="flex" alignItems="baseline" justifyContent="start">
        <OragneDot />
        <Box
          display="flex"
          flexDirection="column"
          ml={2}
          justifyContent="space-between"
        >
          <Box className="boldText" my={1}>
            Total Wins: 105
          </Box>

          <Box className="boldText" my={1}>
            Total Loss: 20
          </Box>

          <Box className="boldText" my={1}>
            Total Ties: 10
          </Box>
        </Box>
      </Box>

      <Box my={2}>
        <Divider />
      </Box>

      {/* Player stat */}
      <Box display="flex" alignItems="baseline" justifyContent="start">
        <OragneDot />
        <Box
          display="flex"
          flexDirection="column"
          ml={2}
          justifyContent="space-between"
        >
          <Box className="boldText" my={1}>
            Most goals scored: Yoon Cho
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const TeamHistory = withTheme(styled(UnstyledTeamHistory)`
  .greyBar {
    height: 4px;
    position: absolute;
    width: 3%;
    background: #c4c4c4;
  }
`);
