import { GraphQLString, GraphQLNonNull } from "graphql";

import { UserType } from "../../types/user";
import {
  User,
  AccountType,
  AccountStatus,
} from "../../../db/models/user.model";

interface Args {
  name: string;
  password: string;
  email?: string;
  type?: AccountType;
  status?: AccountStatus;
}

/**
 * TODO: Passwords should be encrypted.
 * Set session once user is registered.
 */
export const createUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent: object, args: object) {
    const user = await User.create({ ...args, isAdmin: false });

    return user;
  },
};
