import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import { getUsers } from "./queries//getUsers";
import { getLeagues } from "./queries//getLeagues";
import { getLeague } from "./queries//getLeague";
import { getTeams } from "./queries//getTeams";
import { getHomeViewer } from "./queries//getHomeViewer";
import { getAnnouncement } from "./queries/getAnnouncement";
import { getAnnouncements } from "./queries/getAnnouncements";
import { getTeam } from "./queries/getTeam";
import { getHeroAnnouncements } from "./queries/getHeroAnnouncements";

// Mutations
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
import { createAnnouncement } from "./mutations/createAnnouncement";
import { updateLeague } from "./mutations/updateLeague";
import { createTeam } from "./mutations/createTeam";
import { updateTeam } from "./mutations/updateTeam";
import { loginUser } from "./mutations/loginUser";
import { createS3SignedUrl } from "./mutations/createS3SignedUrl";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers,
    getLeagues,
    getLeague,
    getTeams,
    getTeam,
    getHomeViewer,
    getAnnouncement,
    getAnnouncements,
    getHeroAnnouncements,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    createLeague,
    createAnnouncement,
    updateLeague,
    createTeam,
    updateTeam,
    loginUser,
    createS3SignedUrl,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
