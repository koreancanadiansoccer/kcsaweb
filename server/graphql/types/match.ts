import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import { MatchTeamType, MatchTeamInputType } from './team';
import { DateTime } from './utils/dateType';

const StatusEnumType = new GraphQLEnumType({
  name: 'StatusEnumType',
  values: {
    PENDING: {
      value: 'PENDING',
    },
    MISMATCH: {
      value: 'MISMATCH',
    },
    COMPLETE: {
      value: 'COMPLETE',
    },
  },
});

// Definition of types of 'league' that will be returned from graphql operations.
export const MatchType = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    matchDay: { type: GraphQLInt },
    location: { type: GraphQLString },
    leagueId: { type: GraphQLInt },
    homeTeam: { type: MatchTeamType },
    homeTeamScore: { type: GraphQLInt },
    homeTeamPhysical: { type: GraphQLBoolean },
    homeTeamNoGameSheet: { type: GraphQLBoolean },
    homeTeamNoShow: { type: GraphQLBoolean },
    awayTeam: { type: MatchTeamType },
    awayTeamScore: { type: GraphQLInt },
    awayTeamPhysical: { type: GraphQLBoolean },
    awayTeamNoGameSheet: { type: GraphQLBoolean },
    awayTeamNoShow: { type: GraphQLBoolean },
    status: { type: StatusEnumType },
    createdAt: { type: DateTime },
  }),
});

export const MatchTypeInputType = new GraphQLInputObjectType({
  name: 'MatchInput',
  fields: () => ({
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    matchDay: { type: GraphQLInt },
    location: { type: GraphQLString },
    leagueId: { type: GraphQLInt },
    homeTeam: { type: MatchTeamInputType },
    homeTeamScore: { type: GraphQLInt },
    homeTeamPhysical: { type: GraphQLBoolean },
    homeTeamNoGameSheet: { type: GraphQLBoolean },
    homeTeamNoShow: { type: GraphQLBoolean },
    awayTeam: { type: MatchTeamInputType },
    awayTeamScore: { type: GraphQLInt },
    awayTeamPhysical: { type: GraphQLBoolean },
    awayTeamNoGameSheet: { type: GraphQLBoolean },
    awayTeamNoShow: { type: GraphQLBoolean },
    status: { type: StatusEnumType },
    createdAt: { type: DateTime },
  }),
});
