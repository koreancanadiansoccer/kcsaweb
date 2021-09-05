import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import { getUsers } from "./queries//getUsers";

// Mutations
import { createUser } from "./mutations/createUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
