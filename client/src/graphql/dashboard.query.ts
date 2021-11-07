import { gql } from '@apollo/client';

import { DashboardViewer } from '../types/dashboard';

import { USER_FRAGMENT } from './users/user.fragment';
import { LEAGUE_TEAM_FRAGMENT, TEAM_FRAGMENT } from './teams/team.fragment';

export interface DashBoardQuery {
  getDashboardViewer: DashboardViewer;
}

export const GET_DASHBOARD_VIEWER = gql`
  query {
    getDashboardViewer{
      user {
        ${USER_FRAGMENT}
      }
      team{
        ${TEAM_FRAGMENT}
      }
      leagueTeam {
        ${LEAGUE_TEAM_FRAGMENT}
      }
    }
  }
`;
