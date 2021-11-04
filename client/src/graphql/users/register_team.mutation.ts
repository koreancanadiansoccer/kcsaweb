import { gql } from '@apollo/client';

import { Team } from '../../types/team';
import { PlayerInput } from '../../types/player';
import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface RegisterTeamInput {
  team?: Team;
  step: string;
  players?: PlayerInput[];
}

export interface RegisterTeamResult {
  registerTeam: User;
}

export const REGISTER_TEAM = gql`
  mutation RegisterTeam($team: TeamInput, $step: String!, $players: [PlayerInput])  {
    registerTeam(team: $team, step: $step, players: $players ) {
     ${USER_FRAGMENT}
    }
  }
`;
