import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Queries
import { getUsers } from './queries/getUsers';
import { getLeagues } from './queries/getLeagues';
import { getLeague } from './queries/getLeague';
import { getTeams } from './queries/getTeams';
import { getTeam } from './queries/getTeam';
import { getHomeViewer } from './queries/getHomeViewer';
import { getPlayers } from './queries/getPlayers';
import { getGallery } from './queries//getGallery';
import { getGalleries } from './queries/getGalleries';
import { getMainGalleries } from './queries/getMainGalleries';
// Mutations
import { createUser } from './mutations/createUser';
import { createLeague } from './mutations/createLeague';
import { updateLeague } from './mutations/updateLeague';
import { createTeam } from './mutations/createTeam';
import { updateTeam } from './mutations/updateTeam';
import { loginUser } from './mutations/loginUser';
import { createS3SignedUrl } from './mutations/createS3SignedUrl';
import { createPlayer } from './mutations/createPlayer';
import { createLeaguePlayers } from './mutations/createLeaguePlayers';
import { createGallery } from './mutations/createGallery';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUsers,
    getLeagues,
    getLeague,
    getTeams,
    getTeam,
    getHomeViewer,
    getGallery,
    getGalleries,
    getMainGalleries,
    getPlayers,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    createLeague,
    updateLeague,
    createTeam,
    updateTeam,
    loginUser,
    createGallery,
    createS3SignedUrl,
    createPlayer,
    createLeaguePlayers,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
