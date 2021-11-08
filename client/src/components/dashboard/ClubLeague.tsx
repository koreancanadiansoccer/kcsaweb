import React, { FunctionComponent, useContext, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/client';

import { Tabs, PanelOptions } from '../tabs/Tabs';
import { Button } from '../button/Button';
import { DashboardViewerContext } from '../../context/dashboardViewer';
import { LEAGUE_TEAM_STATUS } from '../../types/team';
import {
  REGISTER_LEAGUETEAM,
  RegisterLeagueTeamResult,
  RegisterLeagueTeamInput,
} from '../../graphql/league/register_leagueteam.mutation';

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
  const { dashboardViewer, setDashboardViewer } = useContext(
    DashboardViewerContext
  );

  // Craete new players.
  const [registerLeagueTeamMut] = useMutation<
    RegisterLeagueTeamResult,
    RegisterLeagueTeamInput
  >(REGISTER_LEAGUETEAM);

  const registerLeagueTeam = useCallback(async () => {
    if (
      !dashboardViewer?.team?.id ||
      !dashboardViewer?.league?.id ||
      !dashboardViewer?.user?.id
    ) {
      return;
    }
    try {
      const res = await registerLeagueTeamMut({
        variables: {
          teamId: dashboardViewer.team.id,
          leagueId: dashboardViewer?.league?.id,
          userId: dashboardViewer?.user?.id,
        },
      });

      if (res?.data?.registerLeagueTeam) {
        setDashboardViewer({
          ...dashboardViewer,
          leagueTeam: res?.data?.registerLeagueTeam,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [dashboardViewer, setDashboardViewer]);

  // Handle conditoins.
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
          <Button size="large" color="secondary" onClick={registerLeagueTeam}>
            Register
          </Button>
        </Box>
      </Box>
    );
  }

  // Team was invited from Admin.
  if (dashboardViewer.leagueTeam.status === LEAGUE_TEAM_STATUS.INVITED) {
    return (
      <Box mt={5}>
        <Typography variant="h6" className="boldText">
          {dashboardViewer?.league?.year} {dashboardViewer?.league?.name}{' '}
          {dashboardViewer?.league?.leagueType} LEAGUE is open for
          registeration!
        </Typography>
        <Box mt={2}>
          <Button size="large" color="secondary" onClick={registerLeagueTeam}>
            Register
          </Button>
        </Box>
      </Box>
    );
  }

  // Team confirmed and pending final Admin confirmation.
  if (dashboardViewer.leagueTeam.status !== LEAGUE_TEAM_STATUS.REGISTERED) {
    return (
      <Box mt={5}>
        <Typography variant="h6" className="boldText">
          Pending register confirmation from Admin.
        </Typography>
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
