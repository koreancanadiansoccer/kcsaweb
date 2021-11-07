import { GraphQLBoolean } from 'graphql';

interface Args {
  [key: string]: string;
}

export const logout = {
  type: GraphQLBoolean,
  //   args: {
  //     email: { type: GraphQLString },
  //     password: { type: new GraphQLNonNull(GraphQLString) },
  //   },
  async resolve(
    parent: object,
    args: Args,
    { req }: any
  ): Promise<boolean | undefined> {
    req.session.destroy();

    return true;
  },
};
