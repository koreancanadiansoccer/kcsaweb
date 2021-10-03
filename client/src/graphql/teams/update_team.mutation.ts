import { gql } from "@apollo/client";
import { Team } from "../../types/team";
import { TEAM_FRAGMENT } from "./team.fragment";
export interface UpdateTeamInput {
  updateTeam: Team;
}

export interface UpdateTeamResult {
  updateTeam: Team;
}

export const UPDATE_TEAM = gql`
  mutation UpdateTeam($updateTeam: TeamInput!) {
    updateTeam(updateTeam: $updateTeam) {
     ${TEAM_FRAGMENT}
    }
  }
`;
