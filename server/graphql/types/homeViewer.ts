import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import { AnnouncementType } from './announcement';
import { UserType } from './user';
import { LeagueType } from './league';
import { TeamType } from './team';
import { LeaguePlayerType } from './player';
import { DateTime } from './utils/dateType';

// Definition of types of 'LeagueTeam' that will be returned from graphql operations.
// This is special type for homeviewer query to include team data as well.
export const LeagueTeamType = new GraphQLObjectType({
  name: 'LeagueTeamHomeViewer',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    tie: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    teamColor: { type: GraphQLString },
    captainId: { type: GraphQLString },
    teamId: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    leaguePlayers: { type: new GraphQLList(LeaguePlayerType) },
    createdAt: { type: DateTime },
    team: { type: TeamType },
  }),
});

// Definition home viewer data types.
// Gets called on main home page load.
// TODO: Update to grab all needed data.
export const HomeViewerType = new GraphQLObjectType({
  name: 'HomeViewer',
  fields: () => ({
    user: { type: UserType },
    announcements: { type: new GraphQLList(AnnouncementType) },
    leagues: { type: new GraphQLList(LeagueType) },
    leagueTeams: { type: new GraphQLList(LeagueTeamType) },
    leaguePlayers: { type: new GraphQLList(LeaguePlayerType) },
  }),
});
