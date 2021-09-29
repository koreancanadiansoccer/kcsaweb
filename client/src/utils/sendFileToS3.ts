import ReactS3Client from 'react-aws-s3-typescript';
import dotenv from 'dotenv';
dotenv.config();

const NAME: string = 'kcsa-images-bucket';
const REGION: string = 'us-east-1';
const ACCKEY: string = 'AKIAQKZEFGFJJLQS2OH3';
const SECRETKEY: string = '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';

export const sendFileToS3 = async (file: File) => {
  console.log("test")
  const s3 = new ReactS3Client({
    bucketName: NAME,
    region: REGION,
    accessKeyId: ACCKEY,
    secretAccessKey: SECRETKEY,
  });

  try {
    console.log("check")
    const res = await s3.uploadFile(file);
    console.log(res);
  } catch (exception) {
    console.log(exception);
  }
};
