import { gql } from "@apollo/client";

import { Team } from "../../types/team";
import { LeagueType } from "../../types/league";

export interface LeagueQueryData {
  data: {
    getLeagues: {
      name: string;
      isActive: boolean;
      leagueType: LeagueType;
      teams?: Team[];
    };
  };
}

export const GET_LEAGUES = gql`
  query {
    getLeagues {
      id
      name
      isActive
      leagueAgeType
      leagueType
      maxYellowCard
      createdAt
      teams {
        id
        name
        played
        goalScored
      }
    }
  }
`;
