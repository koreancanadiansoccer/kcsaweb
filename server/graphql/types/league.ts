import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';

import { LeagueTeamType, LeagueTeamInputType } from './team';
import { MatchType, MatchTypeInputType } from './match';
import { DateTime } from './utils/dateType';

export const LegaueTypeEnum = new GraphQLEnumType({
  name: 'LegaueTypeEnum',
  values: {
    OPEN: {
      value: 'OPEN',
    },
    SENIOR: {
      value: 'SENIOR',
    },
  },
});

// Definition of types of 'league' that will be returned from graphql operations.
export const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    leagueAgeType: { type: GraphQLString },
    leagueType: { type: GraphQLString },
    year: { type: GraphQLString },
    maxYellowCard: { type: GraphQLInt },
    createdAt: { type: DateTime },
    leagueTeams: { type: new GraphQLList(LeagueTeamType) },
    matches: { type: new GraphQLList(MatchType) },
  }),
});

export const LeagueInputType = new GraphQLInputObjectType({
  name: 'LeagueInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    leagueAgeType: { type: GraphQLString },
    leagueType: { type: GraphQLString },
    year: { type: GraphQLString },
    maxYellowCard: { type: GraphQLInt },
    createdAt: { type: DateTime },
    leagueTeams: { type: new GraphQLList(LeagueTeamInputType) },
    matches: { type: new GraphQLList(MatchTypeInputType) },
  }),
});
