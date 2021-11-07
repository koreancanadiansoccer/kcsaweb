import { GraphQLObjectType } from 'graphql';

import { UserType } from './user';
import { TeamType, LeagueTeamType } from './team';
import { LeagueType } from './league';

// Definition home viewer data types.
// Gets called on main home page load.
// TODO: Update to grab all needed data.
export const DashboardViewerType = new GraphQLObjectType({
  name: 'DashboardViewer',
  fields: () => ({
    user: { type: UserType },
    team: { type: TeamType },
    leagueTeam: { type: LeagueTeamType },
    league: { type: LeagueType },
  }),
});
