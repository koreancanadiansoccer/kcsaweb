import { gql } from '@apollo/client';

export interface DeleteMatchInput {
  id: number;
}

export interface DeleteMatchResult {
  deleteMatch: {
    deletedMatchId: number;
  };
}

// Swap out to common fragment
export const DELETE_MATCH = gql`
  mutation DeleteMatch($id: Int!) {
    deleteMatch(id: $id) {
      deletedMatchId
    }
  }
`;
