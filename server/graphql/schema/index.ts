import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Queries
import { getUser } from './queries/getUser';
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
import { getAnnouncement } from './queries/getAnnouncement';
import { getAnnouncements } from './queries/getAnnouncements';
import { getMatches } from './queries/getMatches';
import { getDashboardViewer } from './queries/getDashboardViewer';
// Mutations
import { createLeague } from './mutations/createLeague';
import { updateLeague } from './mutations/updateLeague';
import { createTeam } from './mutations/createTeam';
import { updateTeam } from './mutations/updateTeam';
import { loginUser } from './mutations/loginUser';
import { createS3SignedUrl } from './mutations/createS3SignedUrl';
import { createPlayer } from './mutations/createPlayer';
import { createLeaguePlayers } from './mutations/createLeaguePlayers';
import { createGallery } from './mutations/createGallery';
import { createAnnouncement } from './mutations/createAnnouncement';
import { createMatch } from './mutations/createMatch';
import { updateMatch } from './mutations/updateMatch';
import { deleteMatch } from './mutations/deleteMatch';
import { updateGallery } from './mutations/updateGallery';
import { updateAnnouncement } from './mutations/updateAnnouncement';
import { sendInvite } from './mutations/sendInvite';
import { registerTeam } from './mutations/registerTeam';
import { registerUser } from './mutations/registerUser';
import { updateCaptain } from './mutations/updateCaptain';
import { sendEmailNotif as sendEmail } from './mutations/sendEmail';
import { logout } from './mutations/logout';
import { updateDashboard } from './mutations/updateDashboard';
import { registerLeagueTeam } from './mutations/registerLeagueTeam';
import { inviteLeagueTeam } from './mutations/inviteLeagueTeam';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUser,
    getUsers,
    getLeagues,
    getLeague,
    getTeams,
    getTeam,
    getHomeViewer,
    getGallery,
    getGalleries,
    getMainGalleries,
    getAnnouncement,
    getAnnouncements,
    getPlayers,
    getMatches,
    getDashboardViewer,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createLeague,
    createAnnouncement,
    updateLeague,
    createTeam,
    updateTeam,
    loginUser,
    createGallery,
    createS3SignedUrl,
    createPlayer,
    createLeaguePlayers,
    createMatch,
    updateMatch,
    deleteMatch,
    updateGallery,
    updateAnnouncement,
    sendInvite,
    registerTeam,
    registerUser,
    updateCaptain,
    sendEmail,
    logout,
    updateDashboard,
    registerLeagueTeam,
    inviteLeagueTeam,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
