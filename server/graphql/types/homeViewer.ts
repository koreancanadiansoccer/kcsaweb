import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import { AnnouncementType } from './announcement';
import { UserType } from './user';
import { GalleryType } from './gallery';
import { LeagueType } from './league';
import { LeagueTeamType } from './team';
import { LeaguePlayerType } from './player';

// Definition home viewer data types.
// Gets called on main home page load.
// TODO: Update to grab all needed data.
export const HomeViewerType = new GraphQLObjectType({
  name: 'HomeViewer',
  fields: () => ({
    user: { type: UserType },
    announcements: { type: new GraphQLList(AnnouncementType) },
    galleries: { type: new GraphQLList(GalleryType) },
    leagues: { type: new GraphQLList(LeagueType) },
    leagueTeams: { type: new GraphQLList(LeagueTeamType) },
    leaguePlayers: { type: new GraphQLList(LeaguePlayerType) },
  }),
});
