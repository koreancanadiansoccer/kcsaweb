import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLList,
} from 'graphql';

import { MatchTeamType, MatchTeamInputType } from './team';
import {
  MatchHomeSubmissionPlayerType,
  MatchHomeSubmissionPlayerInputType,
  MatchAwaySubmissionPlayerType,
  MatchAwaySubmissionPlayerInputType,
} from './player';
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

const HomeSubmission = new GraphQLObjectType({
  name: 'HomeSubmissionType',
  fields: () => ({
    id: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    homeTeamId: { type: GraphQLInt },
    homeTeamScore: { type: GraphQLInt },
    homeTeamGameSheetLink: { type: GraphQLString },
    awayTeamScore: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    status: { type: GraphQLString },
    matchHomeSubmissionPlayers: {
      type: new GraphQLList(MatchHomeSubmissionPlayerType),
    },
  }),
});

const HomeSubmissionInputType = new GraphQLInputObjectType({
  name: 'HomeSubmissionInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    homeTeamId: { type: GraphQLInt },
    homeTeamScore: { type: GraphQLInt },
    homeTeamGameSheetLink: { type: GraphQLString },
    awayTeamScore: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    status: { type: GraphQLString },
    matchHomeSubmissionPlayers: {
      type: new GraphQLList(MatchHomeSubmissionPlayerInputType),
    },
  }),
});

const AwaySubmission = new GraphQLObjectType({
  name: 'AwaySubmissionType',
  fields: () => ({
    id: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    awayTeamId: { type: GraphQLInt },
    awayTeamGameSheetLink: { type: GraphQLString },
    awayTeamScore: { type: GraphQLInt },
    homeTeamScore: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    status: { type: GraphQLString },
    matchAwaySubmissionPlayers: {
      type: new GraphQLList(MatchAwaySubmissionPlayerType),
    },
  }),
});

const AwaySubmissionInputType = new GraphQLInputObjectType({
  name: 'AwaySubmissionInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    awayTeamId: { type: GraphQLInt },
    awayTeamGameSheetLink: { type: GraphQLString },
    awayTeamScore: { type: GraphQLInt },
    homeTeamScore: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    status: { type: GraphQLString },
    matchAwaySubmissionPlayers: {
      type: new GraphQLList(MatchAwaySubmissionPlayerInputType),
    },
  }),
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
    matchHomeSubmission: { type: HomeSubmission },
    matchAwaySubmission: { type: AwaySubmission },
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
    matchHomeSubmission: { type: HomeSubmissionInputType },
    matchAwaySubmission: { type: AwaySubmissionInputType },
  }),
});
