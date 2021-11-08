import React, { FunctionComponent, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Tabs, PanelOptions } from '../tabs/Tabs';
import { Button } from '../button/Button';
import { DashboardViewerContext } from '../../context/dashboardViewer';

import { ClubGeneral } from './components/ClubGeneral';
import { ClubPlayers } from './components/ClubPlayers';

const panelOptions: PanelOptions[] = [
  {
    label: 'General',
    comp: <ClubGeneral />,
  },
  {
    label: 'Players',
    comp: <ClubPlayers />,
  },
];

/**
 * League info for dashboard.
 */
export const ClubLeague: FunctionComponent = () => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const { dashboardViewer } = useContext(DashboardViewerContext);

  if (!dashboardViewer.leagueTeam) {
    if (!dashboardViewer.league) {
      return (
        <Box mt={5}>
          <Typography variant="h6" className="boldText">
            There are no active league to register.
          </Typography>
          <Typography variant="h6" className="boldText">
            Please check later.
          </Typography>
        </Box>
      );
    }

    // League exists but not registered
    return (
      <Box mt={5}>
        <Typography variant="h6" className="boldText">
          {dashboardViewer.league.year} {dashboardViewer.league.name}{' '}
          {dashboardViewer.league.leagueType} LEAGUE is open for registeration!
        </Typography>
        <Box mt={2}>
          <Button size="large" color="secondary">
            Register
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={2}>
        <Tabs
          value={tabSelected}
          setValue={(value: number) => setTabSelected(value)}
          panelOptions={panelOptions}
        />
      </Box>
    </Box>
  );
};
