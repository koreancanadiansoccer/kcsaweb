import ReactS3Client from 'react-aws-s3-typescript';
import dotenv from 'dotenv';
dotenv.config();

const NAME: string = 'AWS_BUCKET_NAME';
const REGION: string = 'AWS_BUCKET_REGION';
const ACCKEY: string = 'AWS_ACCESSKEY_ID';
const SECRETKEY: string = 'AWS_SECRETACCESSKEY';

export const sendFileToS3 = async (file: File) => {
  console.log("test")
  const s3 = new ReactS3Client({
    bucketName: NAME,
    region: REGION,
    accessKeyId: ACCKEY,
    secretAccessKey: SECRETKEY,
  });

  try {
    const res = await s3.uploadFile(file);
    console.log(res);
  } catch (exception) {
    console.log(exception);
  }
};
