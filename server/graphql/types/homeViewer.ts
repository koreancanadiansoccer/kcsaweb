import { GraphQLList, GraphQLObjectType } from 'graphql';

import { AnnouncementType } from './announcement';
import { UserType } from './user';

// Definition home viewer data types.
// Gets called on main home page load.
// TODO: Update to grab all needed data.
export const HomeViewerType = new GraphQLObjectType({
  name: 'HomeViewer',
  fields: () => ({
    user: { type: UserType },
    announcements: { type: new GraphQLList(AnnouncementType) },
  }),
});
