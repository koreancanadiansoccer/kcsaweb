import { gql } from '@apollo/client';

/**
 * Mutation for creating 'signed url' to upload to S3.
 * Also returns 'url' where the file will live.
 */
export const CREATE_CLOUDINARY_SIGNATURE = gql`
  mutation createCloudinarySignature($fileName: String!) {
    createCloudinarySignature(fileName: $fileName) {
      signature
      timestamp
    }
  }
`;
