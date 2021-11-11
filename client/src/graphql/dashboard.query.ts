import { gql } from '@apollo/client';

import { DashboardViewer } from '../types/dashboard';

import { USER_FRAGMENT } from './users/user.fragment';
import { LEAGUE_TEAM_FRAGMENT, TEAM_FRAGMENT } from './teams/team.fragment';
import { MATCH_FRAGMENT } from './match/match.fragment';
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
      league{
        id
        name
        year
        leagueType
      }
      matches{
        ${MATCH_FRAGMENT}
      }
    }
  }
`;
