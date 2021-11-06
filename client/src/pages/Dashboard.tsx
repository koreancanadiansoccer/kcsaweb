import React, {
  FunctionComponent,
  useMemo,
  useContext,
  useState,
  useEffect,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import find from 'lodash/find';

import { ViewerContext } from '../context/homeViewer';
import { Tabs, PanelOptions } from '../components/tabs/Tabs';
import { TeamGeneral } from '../components/TeamEdit/TeamGeneral';
import { ACCOUNTSTATUS } from '../types/user';

/**
 * Page for captains to edit their team and update scores.
 * TODO: update to grab data from team.
 */
const UnstyledDashboard: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [tabSelected, setTabSelected] = useState(0);

  /**
   * Call TeamEditQuery -> Grab User's team, teamplayer, Active; leagueteam, league players, matches
   */

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

  // team to edit;
  const leagueTeam = useMemo(
    () =>
      find(
        viewer.leagueTeams,
        (leagueTeam) => leagueTeam.id === parseInt(id, 10)
      ),
    [id]
  );
  console.info(leagueTeam);
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

export const Dashboard = withTheme(styled(UnstyledDashboard)`
  .MuiTabs-root {
    background-color: white;
  }
`);
