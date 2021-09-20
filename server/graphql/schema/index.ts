import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Queries
import { getUsers } from './queries//getUsers';

// Mutations
<<<<<<< HEAD
import { createUser } from "./mutations/createUser";
import { createLeague } from "./mutations/createLeague";
=======
import { createUser } from './mutations/createUser';
import { loginUser } from './mutations/loginUser';

>>>>>>> 26f4df0 (resolve conflicts)

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUsers,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
<<<<<<< HEAD
    createLeague,
=======
    loginUser,
>>>>>>> 26f4df0 (resolve conflicts)
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
