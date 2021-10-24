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
}) => {
  return (
    <motion.div whileHover={{ scale: 1.08 }}>
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
                <Box minWidth={80} minHeight={40}>
                  <img
                    src={homeTeam.team.teamLogoURL || LogoGrey}
                    alt="home team logo"
                  />
                </Box>
                <Box>{homeTeam.team.name}</Box>
              </Box>

              <Box ml="auto">vs</Box>

              {/* Away team emblem and name */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                ml="auto"
              >
                <Box minWidth={80} minHeight={40}>
                  <img
                    src={awayTeam.team.teamLogoURL || LogoGrey}
                    alt="away team logo"
                  />
                </Box>
                <Box>{awayTeam.team.name}</Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export const ScheduleCard = withTheme(styled(UnstyledScheduledCard)`
  min-width: 332px;
  cursor: pointer;
  .text-sub {
    font-size: 0.875rem;
    font-weight: 700;
  }
`);
