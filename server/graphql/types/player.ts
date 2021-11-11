import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import { DateTime } from './utils/dateType';

// Definition of types of 'Team' that will be returned from graphql operations.
export const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const LeaguePlayerType = new GraphQLObjectType({
  name: 'LeaguePlayer',
  fields: () => ({
    id: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
    playerId: { type: GraphQLInt },
    player: { type: PlayerType },
    signedWaiver: { type: GraphQLBoolean },
  }),
});

export const LeaguePlayerInputType = new GraphQLInputObjectType({
  name: 'LeaguePlayerInput',
  fields: () => ({
    id: { type: GraphQLInt },
    // First Name and last Name can be inserted here to create mast player record upon creating new league player.
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    //
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
    leagueTeamId: { type: GraphQLInt },
    playerId: { type: GraphQLInt },
    player: { type: PlayerInputType },
    signedWaiver: { type: GraphQLBoolean },
  }),
});

export const MatchPlayerType = new GraphQLObjectType({
  name: 'MatchPlayer',
  fields: () => ({
    id: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerType },
  }),
});

export const MatchPlayerInputType = new GraphQLInputObjectType({
  name: 'MatchPlayerInput',
  fields: () => ({
    id: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerInputType },
  }),
});

export const MatchHomeSubmissionPlayerType = new GraphQLObjectType({
  name: 'MatchHomeSubmissionPlayerType',
  fields: () => ({
    id: { type: GraphQLInt },
    homeTeamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    matchHomeSubmissionId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerType },
  }),
});

export const MatchHomeSubmissionPlayerInputType = new GraphQLInputObjectType({
  name: 'MatchHomeSubmissionPlayerInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    homeTeamId: { type: GraphQLInt },
    awayTeamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    matchHomeSubmissionId: { type: GraphQLInt },
    matchAwaySubmissionId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerInputType },
  }),
});

export const MatchAwaySubmissionPlayerType = new GraphQLObjectType({
  name: 'MatchAwaySubmissionPlayerType',
  fields: () => ({
    id: { type: GraphQLInt },
    awayTeamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    matchAwaySubmissionId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerType },
  }),
});

export const MatchAwaySubmissionPlayerInputType = new GraphQLInputObjectType({
  name: 'MatchAwaySubmissionPlayerInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    awayTeamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    matchAwaySubmissionId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    redCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
    player: { type: PlayerInputType },
  }),
});
