import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import { getUsers } from "./queries//getUsers";

// Mutations
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
import { addAnnouncement } from "./mutations/addAnnouncement";

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
    createLeague,
    addAnnouncement,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
