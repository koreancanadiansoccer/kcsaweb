import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
} from 'graphql';

import { DateTime } from './utils/dateType';

// Definition of types of 'Team' that will be returned from graphql operations.
export const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const LeaguePlayerType = new GraphQLObjectType({
  name: 'LeaguePlayer',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
    playerId: { type: GraphQLInt },
  }),
});

export const LeaguePlayerInputType = new GraphQLInputObjectType({
  name: 'LeaguePlayerInput',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    name: { type: GraphQLString },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
    leagueTeamId: { type: GraphQLInt },
  }),
});

export const MatchPlayerType = new GraphQLObjectType({
  name: 'MatchPlayer',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const MatchPlayerInputType = new GraphQLInputObjectType({
  name: 'MatchPlayerInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    matchId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    leaguePlayerId: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});
