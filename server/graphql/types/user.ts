import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import { TeamType } from './team';
// Definition of types of 'user' that will be returned from graphql operations.
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    team: { type: TeamType },
  }),
});
