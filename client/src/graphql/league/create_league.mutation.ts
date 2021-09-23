import { gql } from "@apollo/client";
import { LeagueType } from "../../types/league";
import { Team } from "../../types/team";

export interface LeagueData {
  name: string;
  isActive: boolean;
  leagueType: LeagueType;
  teams?: Team[];
}

export interface CreateLeagueDataInput {
  name: string;
  isActive?: boolean;
  leagueType?: LeagueType | string;
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String!, $leagueType: LegaueTypeEnum!) {
    createLeague(name: $name, leagueType: $leagueType) {
      id
      isActive
      leagueType
    }
  }
`;
