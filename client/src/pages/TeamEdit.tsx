import React, { FunctionComponent, useMemo, useContext, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useParams } from 'react-router';
import find from 'lodash/find';

import { ViewerContext } from '../context/homeViewer';
import { Tabs, PanelOptions } from '../components/tabs/Tabs';
import { TeamGeneral } from '../components/TeamEdit/TeamGeneral';
/**
 * Page for captains to edit their team and update scores.
 */
const UnstyledTeamEdit: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);
  const { id } = useParams<{ id: string }>();

  const [tabSelected, setTabSelected] = useState(0);
  // team to edit;
  const leagueTeam = useMemo(
    () =>
      find(
        viewer.leagueTeams,
        (leagueTeam) => leagueTeam.id === parseInt(id, 10)
      ),
    [id]
  );

  // Tabs Panel
  const panelOptions: PanelOptions[] = useMemo(
    () => [
      {
        label: 'General',
        comp: <TeamGeneral />,
      },
    ],
    []
  );

  return (
    <Box>
      Team Edit page for captains
      <Box mt={5}>
        <Container>
          <Tabs
            value={tabSelected}
            setValue={(value: number) => setTabSelected(value)}
            panelOptions={panelOptions}
          />
        </Container>
      </Box>
    </Box>
  );
};

export const TeamEdit = withTheme(styled(UnstyledTeamEdit)`
  .MuiTabs-root {
    background-color: white;
  }
`);
