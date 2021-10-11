import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import dayjs from 'dayjs';

// Custom Scalar type 'DateTime' to return date values to client.
// Note: this is needed since GraphQL doens't have any default type related to date.
export const DateTime: GraphQLScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return dayjs(value); // value from the client
  },
  serialize(value) {
    return dayjs(value).format('YYYY-MM-DD hh:mmA'); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value); // ast value is always in string format
    }
    return null;
  },
});
