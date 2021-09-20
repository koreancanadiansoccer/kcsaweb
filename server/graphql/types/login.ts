import {
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

// Definition of types of 'login' that will be returned from graphql operations.
export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
