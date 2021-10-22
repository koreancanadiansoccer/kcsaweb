import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';

import { DateTime } from './utils/dateType';
import {
  PlayerType,
  PlayerInputType,
  LeaguePlayerType,
  LeaguePlayerInputType,
  MatchPlayerType,
  MatchPlayerInputType,
} from './player';

// Definition of types of 'Team' that will be returned from graphql operations.
export const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    foundedDate: { type: GraphQLString },
    teamLogoURL: { type: GraphQLString },
    played: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    createdAt: { type: DateTime },
    players: { type: new GraphQLList(PlayerType) },
  }),
});

//Definition of types of 'Team' that will be used as input to graphql operation
export const TeamInputType = new GraphQLInputObjectType({
  name: 'TeamInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    foundedDate: { type: GraphQLString },
    teamLogoURL: { type: GraphQLString },
    played: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    createdAt: { type: DateTime },
    players: { type: new GraphQLList(PlayerInputType) },
  }),
});

// Definition of types of 'LeagueTeam' that will be returned from graphql operations.
export const LeagueTeamType = new GraphQLObjectType({
  name: 'LeagueTeam',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    captainId: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    leaguePlayers: { type: new GraphQLList(LeaguePlayerType) },
    createdAt: { type: DateTime },
  }),
});

//Definition of types of 'LeagueTeam' that will be used as input to graphql operation
export const LeagueTeamInputType = new GraphQLInputObjectType({
  name: 'LeagueTeamInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    captainId: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    leaguePlayers: { type: new GraphQLList(LeaguePlayerInputType) },
    createdAt: { type: DateTime },
  }),
});

export const MatchTeamType = new GraphQLObjectType({
  name: 'MatchTeam',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    captainId: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    matchPlayers: { type: new GraphQLList(MatchPlayerType) },
    createdAt: { type: DateTime },
  }),
});

export const MatchTeamInputType = new GraphQLInputObjectType({
  name: 'MatchTeamInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    captainId: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    matchPlayers: { type: new GraphQLList(MatchPlayerInputType) },
    createdAt: { type: DateTime },
  }),
});
