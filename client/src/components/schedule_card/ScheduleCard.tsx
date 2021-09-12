import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { motion } from "framer-motion";

import { CircleGreyIcon } from "../icons/CircleGreyIcon";
interface ScheduleCardProps {
  time: string;
  location: string;
  homeTeam: string;
  awayTeam: string;
  className?: string;
}

/**
 * Scheuld card used on main home page.
 */
export const UnstyledScheduledCard: FunctionComponent<ScheduleCardProps> = ({
  time,
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
            <Box>{time}</Box>

            <Box>{location}</Box>

            <Box
              mt={1.125}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              {/* Home team emblem and name */}
              <Box display="flex" flexDirection="column" alignItems="center">
                <CircleGreyIcon large />
                <Box>{homeTeam}</Box>
              </Box>

              <Box ml="auto">vs</Box>

              {/* Away team emblem and name */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                ml="auto"
              >
                <CircleGreyIcon large />
                <Box>{awayTeam}</Box>
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
