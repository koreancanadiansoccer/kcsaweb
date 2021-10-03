import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { AWSS3Uploader } from "../../../utils/s3Uploader";

export const createS3SignedUrl = {
  type: new GraphQLObjectType({
    name: "S3SignedUrl",
    fields: () => ({
      s3SignedUrl: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  }),
  args: {
    fileName: { type: new GraphQLNonNull(GraphQLString) },
    fileType: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: any) {
    // grab both s3 signed url and object url
    const s3Urls = AWSS3Uploader(args.fileName, args.fileType);

    return s3Urls;
  },
};
