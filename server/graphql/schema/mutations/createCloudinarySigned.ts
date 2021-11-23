import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

const CL_API_SECRET = process.env.CL_API_SECRET;

export const createCloudinarySignature = {
  type: new GraphQLObjectType({
    name: 'CloudinarySigned',
    fields: () => ({
      signature: { type: GraphQLString },
      timestamp: { type: GraphQLString },
    }),
  }),
  args: {
    fileName: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parent: object,
    args: any
  ): Promise<{ signature: string; timestamp: number }> {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate cloudinary signature
    if (CL_API_SECRET) {
      const signature = await cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
          public_id: `${args.fileName}`,
          folder: 'team-logo',
          upload_preset: 'team-logo',
        },
        CL_API_SECRET
      );

      return { signature, timestamp };
    }
    throw new Error('NO API KEY CLOUDINARY SPECIFIED');
  },
};
