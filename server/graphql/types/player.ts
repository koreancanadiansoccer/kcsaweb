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
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const LeaguePlayerType = new GraphQLObjectType({
  name: 'LeaguePlayer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    leagueTeamId: { type: GraphQLInt },
    yellowCard: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

export const LeaguePlayerInputType = new GraphQLInputObjectType({
  name: 'LeaguePlayerInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});