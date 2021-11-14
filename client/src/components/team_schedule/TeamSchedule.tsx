import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';

import { Match } from '../../types/match';
import { ScheduleCard } from '../schedules/components/schedule_card/ScheduleCard';

interface TeamScheduleProps {
  teamMatches: Match[];
  className?: string;
  id: string;
}

/**
 * Render team schedules.
 */
const UnstyledTeamSchedule: FunctionComponent<TeamScheduleProps> = ({
  teamMatches,
  className,
}) => {
  return (
    <Box className={className}>
      <Box className="boldText" fontSize="1.5rem" position="relative" mb={6}>
        SCHEDULE
        <Box className="greyBar"></Box>
      </Box>

      {map(teamMatches, (match) => {
        return (
          <Box key={`team-${match.id}-schedule-${match.matchDay}`} my={3}>
            <Box className="boldText" fontSize="1.5rem" mb={2}>
              Match Round {match.matchDay}
            </Box>
            <Box width={'50%'}>
              <ScheduleCard
                date={match.date}
                location={match.location}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                status={match.status}
                noHover={true}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export const TeamSchedule = withTheme(styled(UnstyledTeamSchedule)`
  .greyBar {
    height: 4px;
    position: absolute;
    width: 4%;
    background: #c4c4c4;
  }
`);
