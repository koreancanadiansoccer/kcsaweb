import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import { DateTime } from "./utils/dateType";

// Definition of types of 'Team' that will be returned from graphql operations.
export const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});

// Definition of types of 'LeagueTeam' that will be returned from graphql operations.
export const LeagueTeamType = new GraphQLObjectType({
  name: "LeagueTeam",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    captainId: { type: GraphQLString },
    teamId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    createdAt: { type: DateTime },
  }),
});

export const LeagueTeamInputType = new GraphQLInputObjectType({
  name: "LeagueTeamInput",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    captainId: { type: GraphQLString },
    teamId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    createdAt: { type: DateTime },
  }),
});
