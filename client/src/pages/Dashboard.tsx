import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';

import { ViewerContext } from '../context/homeViewer';
import { Club } from '../components/dashboard/Club';
import { CaptainGeneral } from '../components/dashboard/CaptainGeneral';
import { ClubLeague } from '../components/dashboard/ClubLeague';
import { LeagueSelect } from '../components/league_select/LeagueSelect';
import { ACCOUNTSTATUS } from '../types/user';
import { DashboardViewer } from '../types/dashboard';
import {
  GET_DASHBOARD_VIEWER,
  DashBoardQuery,
} from '../graphql/dashboard.query';
import { DashboardViewerContext } from '../context/dashboardViewer';

enum TabType {
  CAPTAIN = 'CAPTAIN',
  TEAM = 'TEAM',
  LEAGUE = 'LEAGUE',
}

/**
 * Page for captains to edit their team and update scores.
 * TODO: update to grab data from team.
 */
const UnstyledDashboard: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);
  const history = useHistory();
  const [teamTabType, setTeamTabType] = useState<TabType>(TabType.CAPTAIN);

  const [dashboardViewer, setDashboardViewer] = useState<DashboardViewer>();

  const dashboardDataQuery = useQuery<DashBoardQuery>(GET_DASHBOARD_VIEWER);

  useEffect(() => {
    if (dashboardDataQuery.data) {
      setDashboardViewer(dashboardDataQuery.data.getDashboardViewer);
    }
  }, [dashboardDataQuery]);

  /**
   * Redirect to home if: user is not logged in, & if user;s team ID do not match against id.
   */
  useEffect(() => {
    if (!viewer.user || !viewer.user.id) {
      history.replace({
        pathname: '/login',
        state: { redirectPath: '/dashboard' },
      });
    }

    if (viewer.user?.status === ACCOUNTSTATUS.REGISTERINGTEAM) {
      history.replace({
        pathname: '/registerteam',
        state: { msg: 'Pleae finish your registration process' },
      });
    }

    if (viewer.user?.status === ACCOUNTSTATUS.INVITED) {
      history.replace({
        pathname: '/create',
        state: { msg: 'Pleae finish your registration process' },
      });
    }
  }, [viewer]);

  if (!dashboardViewer) {
    return <Box>Error</Box>;
  }

  return (
    <DashboardViewerContext.Provider
      value={{ dashboardViewer, setDashboardViewer }}
    >
      <Box mt={5} mb={10}>
        <Container>
          <Box mb={4}>
            <Typography variant="h4" className="boldText">
              Club Dashboard
            </Typography>
          </Box>

          <Box display="flex" justifyContent="start">
            <Box mr={5}>
              <LeagueSelect
                title="CAPTAIN"
                selected={teamTabType === TabType.CAPTAIN}
                onClick={() => setTeamTabType(TabType.CAPTAIN)}
              />
            </Box>

            <Box mr={5}>
              <LeagueSelect
                title="CLUB"
                selected={teamTabType === TabType.TEAM}
                onClick={() => setTeamTabType(TabType.TEAM)}
              />
            </Box>

            <LeagueSelect
              title="LEAGUE"
              selected={teamTabType === TabType.LEAGUE}
              onClick={() => setTeamTabType(TabType.LEAGUE)}
            />
          </Box>

          {teamTabType === TabType.CAPTAIN && (
            <Box mt={5}>
              <CaptainGeneral />
            </Box>
          )}

          {teamTabType === TabType.TEAM && (
            <Box mt={1.5}>
              <Club />
            </Box>
          )}

          {teamTabType === TabType.LEAGUE && (
            <Box mt={1.5}>
              <ClubLeague />
            </Box>
          )}
        </Container>
      </Box>
    </DashboardViewerContext.Provider>
  );
};

export const Dashboard = withTheme(styled(UnstyledDashboard)`
  .MuiTabs-root {
    background-color: white;
  }
`);
