import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { resolvers as scalarResolvers } from "graphql-scalars";

// Queries
import { getUsers } from "./queries//getUsers";
import { getLeagues } from "./queries//getLeagues";
import { getLeague } from "./queries//getLeague";
import { getTeams } from "./queries//getTeams";

// Mutations
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
import { loginUser } from "./mutations/loginUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers,
    getLeagues,
    getLeague,
    getTeams,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
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
