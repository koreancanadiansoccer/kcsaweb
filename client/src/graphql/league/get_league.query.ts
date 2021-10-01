import { gql } from "@apollo/client";
import { LEAGUE_FRAGMENT } from "./league.fragment";

export const GET_LEAGUE = gql`
  query GetLeague($id: String!) {
    getLeague(id: $id) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
