import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Queries
import { getUsers } from './queries//getUsers';

// Mutations
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
import { loginUser } from './mutations/loginUser';


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUsers,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    createLeague,
    loginUser,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
