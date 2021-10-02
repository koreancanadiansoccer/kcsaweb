import { gql } from "@apollo/client";

import { LEAGUE_FRAGMENT } from "./league.fragment";
import { League } from "../../types/league";

export interface LeagueQueryData {
  getLeagues: League[];
}

export const GET_LEAGUES = gql`
  query {
    getLeagues {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
