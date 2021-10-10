import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

/**
 * Show and allow update to matches associated with league.
 */
const UnstyledLeagueMatch: FunctionComponent = () => {
  return <Box>League Match</Box>;
};

export const LeagueMatch = withTheme(styled(UnstyledLeagueMatch)``);
//style componenet - > react 