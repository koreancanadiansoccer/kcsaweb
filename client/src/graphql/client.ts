import { ApolloClient, InMemoryCache, ApolloError } from "@apollo/client";
import isArray from "lodash/isArray";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";

const GATEWAY_ERRORS = [502, 503, 504];

/**
 * Parses the different types of errors from `ApolloError` and returns
 * a message that can be displayed to the user.
 *
 * @param error
 */
const parseGraphqlError = (error: ApolloError | Error): string => {
  const { graphQLErrors, networkError, message } = error as ApolloError;
  if (!isEmpty(graphQLErrors)) {
    // Check if there is error data in extensions
    const respErrors = get(
      graphQLErrors[0],
      "extensions.exception.response.message"
    );
    if (respErrors) {
      if (isArray(respErrors)) return respErrors.join("; ");
      return respErrors;
    }

    // Otherwise send the message
    return graphQLErrors[0].message;
  }

  if (networkError) {
    if (includes(GATEWAY_ERRORS, get(networkError, "statusCode"))) {
      return "Service is currently unavailable. Please try again in a few seconds";
    }
    return networkError.message;
  }

  return message;
};

export const parseError = (
  error: ApolloError | any,
  data?: { errors?: { message: string }[] } | null
): string => {
  const dataError = (data?.errors || [])[0];
  if (dataError) {
    return dataError.message;
  }

  return parseGraphqlError(error);
};

// TODO: Look into disabling cache per individual queries.
export const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});
