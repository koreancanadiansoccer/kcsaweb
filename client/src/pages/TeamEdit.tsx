import React, { FunctionComponent, useMemo, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useParams } from 'react-router';
import find from 'lodash/find';

import { ViewerContext } from '../context/homeViewer';

/**
 * Page for captains to edit their team and update scores.
 */
const UnstyledTeamEdit: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);

  const { id } = useParams<{ id: string }>();

  const leagueTeam = useMemo(
    () =>
      find(
        viewer.leagueTeams,
        (leagueTeam) => leagueTeam.id === parseInt(id, 10)
      ),
    [id]
  );

  return <Box>Team Edit page for captains</Box>;
};

export const TeamEdit = withTheme(styled(UnstyledTeamEdit)`
  .MuiTabs-root {
    background-color: white;
  }
`);
