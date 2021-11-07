import { gql } from '@apollo/client';

import { DashboardViewer } from '../types/dashboard';
import { Team, LeagueTeam } from '../types/team';
import { UserInput } from '../types/user';
import { PlayerInput } from '../types/player';

import { USER_FRAGMENT } from './users/user.fragment';
import { LEAGUE_TEAM_FRAGMENT, TEAM_FRAGMENT } from './teams/team.fragment';

export enum STEPS {
  CAPTAIN = 'CAPTAIN',
  UPDATETEAM = 'UPDATETEAM',
  UPDATEPLAYER = 'UPDATEPLAYER',
  CREATEPLAYER = 'CREATEPLAYER',
}

export interface UpdateDashboardInput {
  id: number;
  user?: UserInput;
  team?: Team;
  step?: STEPS;
  leagueTeam?: LeagueTeam;
  player?: PlayerInput;
}

export interface UpdateDashboardResult {
  updateDashboard: DashboardViewer;
}

export const UPDATE_DASHBOARD = gql`
  mutation UpdateDashboard($id: Int!, $user: UserInput, $team: TeamInput, $player: PlayerInput, $step: String!){
    updateDashboard(id: $id, user: $user, team: $team, player:$player step: $step){
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
