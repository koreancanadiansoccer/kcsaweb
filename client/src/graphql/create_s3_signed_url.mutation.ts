import { gql } from '@apollo/client';

/**
 * Mutation for creating 'signed url' to upload to S3.
 * Also returns 'url' where the file will live.
 */
export const CREATE_S3_SIGNED_URL = gql`
  mutation createS3SignedUrl(
    $fileName: String!
    $fileType: String!
    $resourceName: String!
  ) {
    createS3SignedUrl(
      fileName: $fileName
      fileType: $fileType
      resourceName: $resourceName
    ) {
      s3SignedUrl
      url
    }
  }
`;
