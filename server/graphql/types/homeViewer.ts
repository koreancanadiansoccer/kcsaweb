import { GraphQLObjectType } from "graphql";

import { UserType } from "./user";

// Definition home viewer data types.
// Gets called on main home page load.
// TODO: Update to grab all needed data.
export const HomeViewerType = new GraphQLObjectType({
  name: "HomeViewer",
  fields: () => ({
    user: { type: UserType },
  }),
});
