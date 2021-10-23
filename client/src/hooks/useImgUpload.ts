import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_S3_SIGNED_URL } from '../graphql/create_s3_signed_url.mutation';
import { parseError } from '../graphql/client';
import { ResourceType } from '../types/resource.enum';

/**
 * Custom hook to handle S3 Upload and generate 'signedURL' and 'objectURL'.
 * TODO: Handle multiple file uploads.
 * Should we extend this hook to handle model mutations?
 */

export const useImgUpload = (): {
  error: string;
  loading: boolean;
  generateUploadUrls: (
    file: File,
    fileName: string,
    resourceName: ResourceType
  ) => Promise<string | undefined>;
} => {
  const [error] = useState('');
  const [loading, setLoading] = useState(false);

  const [createS3SignedUrl] = useMutation<{
    createS3SignedUrl: { s3SignedUrl: string; url: string };
  }>(CREATE_S3_SIGNED_URL);

  const generateUploadUrls = async (
    file: File,
    fileName: string,
    resourceName: string
  ) => {
    setLoading(true);
    try {
      // Get 'signedUrl' for upload.
      const res = await createS3SignedUrl({
        variables: {
          fileName: fileName,
          fileType: file.type,
          resourceName: resourceName,
        },
      });

      // Once we retrieve signedUrl, init uploading to S3 from client side.
      if (res.data?.createS3SignedUrl.s3SignedUrl) {
        const myHeaders = new Headers({ 'Content-Type': file.type });
        const response = await fetch(res.data?.createS3SignedUrl.s3SignedUrl, {
          method: 'PUT',
          headers: myHeaders,
          body: file,
        });

        // If upload was successful, return object url where the file actually lives.
        if (response.status === 200) {
          return res.data?.createS3SignedUrl.url;
        }
      }

      throw new Error('Upload unsuccessful. Please try again.');
    } catch (err) {
      console.info(parseError(err));
      // setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, generateUploadUrls };
};
