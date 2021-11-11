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
      <Box className="boldText" fontSize='1.5rem' position="relative" mb={6}>
        SCHEDULE
        <Box className="greyBar"></Box>
      </Box>

      {map(teamMatches, (match) => {
        return (
          <Box key={`team-${match.id}-schedule-${match.matchDay}`}>
            <Box className="boldText" fontSize='1.5rem' mb={2}>
              Match Round {match.matchDay}
            </Box>
            <Box width={'50%'}>
              <ScheduleCard
                date={match.date}
                location={match.location}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                noHover={true}
              />
            </Box>
          </Box>
        );
      })}

      {/*
      TBD if we are going to use regular card style or this.
      {map(teamMatches, (match) => {
        const opponent =
          match.homeTeam.id === parseInt(id, 10)
            ? match.awayTeam
            : match.homeTeam;

        return (
          <Box key={`team-${match.id}-schedule-${match.matchDay}`}>
            <Box className="boldText" fontSize={'1.5rem'} mb={2}>
              Match Round {match.matchDay}
            </Box>

            <Box fontSize={'1rem'} my={1}>
              Time: {dayjs(match.date).format('hh:mm A M.DD.YYYY ddd')}
            </Box>

            <Box fontSize={'1rem'} my={1}>
              Location: {match.location}
            </Box>

            <Box fontSize={'1rem'} my={1}>
              VS {opponent.team.name}
            </Box>

            <Box mt={4} mb={3}>
              <Divider />
            </Box>
          </Box>
        );
      })} */}
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
