import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

import LogoGrey from '../../../../assets/logo_grey.svg';
import { MatchTeam } from '../../../../types/team';

interface ScheduleCardProps {
  date: string;
  location: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  className?: string;
  noHover?: boolean;
  status?: string;
  mobileWidth?: boolean;
  pastGame?: boolean;
}

/**
 * Scheuld card used on main home page.
 */
const UnstyledScheduledCard: FunctionComponent<ScheduleCardProps> = ({
  date,
  location,
  homeTeam,
  awayTeam,
  className,
  noHover,
  status,
}) => (
  <motion.div whileHover={{ scale: noHover ? 1 : 1.08 }}>
    <Box mr={6} borderRadius={8} className={className}>
      <Paper elevation={3}>
        <Box px={4} py={2} className="text-sub">
          <Box>{dayjs(date).format('hh:mm A M.DD.YYYY ddd')}</Box>

          <Box>{location}</Box>

          <Box
            mt={1.125}
            display="flex"
            justifyContent="start"
            alignItems="center"
          >
            {/* Home team emblem and name */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box width={80} minHeight={40}>
                <img
                  src={homeTeam.team.teamLogoURL || LogoGrey}
                  alt="home team logo"
                />
              </Box>
              <Box>{homeTeam.team.name.toUpperCase()}</Box>
            </Box>

            <Box ml="auto">
              {status === 'COMPLETE' ? (
                <Box>
                  <Box display="inline" pr={2} fontSize={22}>
                    {homeTeam.goalScored}
                  </Box>

                  <span> vs </span>

                  <Box display="inline" pl={2} fontSize={22}>
                    {awayTeam.goalScored}
                  </Box>
                </Box>
              ) : (
                'vs'
              )}
            </Box>

            {/* Away team emblem and name */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              ml="auto"
            >
              <Box width={80} minHeight={40}>
                <img
                  src={awayTeam.team.teamLogoURL || LogoGrey}
                  alt="away team logo"
                />
              </Box>
              <Box>{awayTeam.team.name.toUpperCase()}</Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  </motion.div>
);

export const ScheduleCard = withTheme(styled(UnstyledScheduledCard)`
  min-width: 332px;
  cursor: pointer;

  .MuiPaper-root {
    background-color: ${({ pastGame }) => (pastGame ? '#eeeeee' : 'white')};
  }
  .text-sub {
    font-size: 0.875rem;
    font-weight: 700;
  }

  .home-team-score {
    font-size: 1.3rem;
    padding-right: 1rem;
  }

  .away-team-score {
    font-size: 1.3rem;
    padding-left: 1rem;
  }
`);
