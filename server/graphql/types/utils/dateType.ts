import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import dayjs from "dayjs";

// Custom Scalar type
export const DateTime: GraphQLScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return dayjs(value); // value from the client
  },
  serialize(value) {
    return dayjs(value).format("YYYY-MM-DD-hhA"); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value); // ast value is always in string format
    }
    return null;
  },
});
