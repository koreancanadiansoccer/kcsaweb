import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

interface ScheduleCardProps {
  className?: string;
}

/**
 * Scheuld card used on main home page.
 */
const UnstyledScheduleDefaultCard: FunctionComponent<ScheduleCardProps> = ({
  className,
}) => (
  <Box mr={6} borderRadius={8} className={className}>
    <Box
      fontSize={16}
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={'100%'}
    >
      No Match Schedule
    </Box>
  </Box>
);

export const ScheduleDefaultCard = withTheme(styled(
  UnstyledScheduleDefaultCard
)`
  min-width: 332px;
  height: 200px;
  background: #c4c4c4;
`);
