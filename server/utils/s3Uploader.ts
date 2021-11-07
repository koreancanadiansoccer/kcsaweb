import S3 from 'aws-sdk/clients/s3';
import * as dotenv from 'dotenv';

dotenv.config();

const TEAM_LOGO_BUCKET = process.env.TEAM_LOGO_BUCKET;
const ANNOUNCEMENTS_BUCKET = process.env.ANNOUNCEMENTS_BUCKET;
const S3_REGION = process.env.S3_REGION;

interface S3UploadURLs {
  s3SignedUrl: string;
  url: string;
}

/**
 * Generate presigned url that will be used to upload files from client side.
 * @param s3
 * @param s3Params
 * @param resourceName
 */
export const getPresignUrlPromiseFunction = async (
  s3: any,
  s3Params: any,
  bucketName: string
): Promise<S3UploadURLs> => {
  // Generate signed url for client to use to upload image.
  const s3SignedUrl = await s3.getSignedUrl('putObject', s3Params);

  // Generate object url to save into db.
  const url = `https://${bucketName}.s3.${S3_REGION}.amazonaws.com/${s3Params.Key}`;

  return { s3SignedUrl, url };
};

/**
 * S3 uploader.
 * @param fileName
 * @param fileType
 * @param resourceName
 */
export const AWSS3Uploader = async (
  fileName: string,
  fileType: string,
  resourceName: 'LOGO' | 'ANNOUNCEMENT'
): Promise<S3UploadURLs> => {
  // Set up S3.

  const s3 = new S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  });

  const handleResource = {
    LOGO: TEAM_LOGO_BUCKET,
    ANNOUNCEMENT: ANNOUNCEMENTS_BUCKET,
  };

  const s3Params = {
    Bucket: handleResource[resourceName],
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
  };

  const { s3SignedUrl, url } = await getPresignUrlPromiseFunction(
    s3,
    s3Params,
    s3Params.Bucket as string
  );

  return { s3SignedUrl, url };
};
