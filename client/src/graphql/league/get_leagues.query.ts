import { gql } from "@apollo/client";

import { Team } from "../../types/team";
import { TEAM_FRAGMENT } from "../teams/team.fragment";
import { LeagueType } from "../../types/league";

export interface LeagueQueryData {
  data: {
    getLeagues: {
      name: string;
      isActive: boolean;
      leagueType: LeagueType;
      leagueTeams?: Team[];
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
      leagueTeams {
        ${TEAM_FRAGMENT}
      }
    }
  }
`;
