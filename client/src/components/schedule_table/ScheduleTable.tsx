import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

interface LeagueScheduleProps {
  className?: string;
}
const UnstyledLeagueSchedule: FunctionComponent<LeagueScheduleProps> = ({
  className,
}) => {

  return (
    <Box className={className}>
      <Paper elevation={3}>
        <Box>

          {/* Render table header */}
          <Box
            display="flex"
            justifyContent="center"
            className="table-header"
          >

          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export const LeagueScheduled = withTheme(styled(UnstyledLeagueSchedule)`
`);