import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';

import { TeamType } from './team';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    team: { type: TeamType },
  }),
});

// Definition of types of 'user' that will be returned from graphql operations.
export const UserTeamType = new GraphQLObjectType({
  name: 'UserTeam',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
  }),
});

// Definition of types of 'user' that will be returned from graphql operations.
export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
