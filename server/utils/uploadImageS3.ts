import aws from "aws-sdk";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";

import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3();
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
});
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error());
  }
};
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "kcsa-images",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
export default upload;
