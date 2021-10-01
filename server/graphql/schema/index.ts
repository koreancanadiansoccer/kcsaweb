import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import { getUsers } from "./queries//getUsers";
import { getLeagues } from "./queries//getLeagues";
import { getLeague } from "./queries//getLeague";
import { getTeams } from "./queries//getTeams";
import { getHomeViewer } from "./queries//getHomeViewer";
import { getAnnouncement } from "./queries/getAnnouncement";
import { getAnnouncements } from "./queries/getAnnouncements";

// Mutations
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
import { createAnnouncement } from "./mutations/createAnnouncement";
import { loginUser } from "./mutations/loginUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers,
    getLeagues,
    getLeague,
    getTeams,
    getHomeViewer,
    getAnnouncement,
    getAnnouncements,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    createLeague,
    createAnnouncement,
    loginUser,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
