import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_CLOUDINARY_SIGNATURE } from '../graphql/create_cloudinary_signed.mutation';
import { parseError } from '../graphql/client';

const url = 'https://api.cloudinary.com/v1_1/dghrqguqx/upload';
const api_key = '312182287419138';

/**
 * Custom hook to handle cloudinary upload.
 * TODO: Handle multiple file uploads.
 * Should we extend this hook to handle model mutations?
 */
export const useCloudinaryUpload = (): {
  error: string;
  loading: boolean;
  generateSignature: (
    file: File,
    fileName: string
  ) => Promise<string | undefined>;
} => {
  const [error] = useState('');
  const [loading, setLoading] = useState(false);

  const [createCloudinarySignature] = useMutation<{
    createCloudinarySignature: { signature: string; timestamp: string };
  }>(CREATE_CLOUDINARY_SIGNATURE);

  const generateSignature = async (file: File, fileName: string) => {
    setLoading(true);
    try {
      // Get 'signature' for upload.
      const res = await createCloudinarySignature({
        variables: {
          fileName: fileName,
        },
      });

      // Once we get signature, upload the image.
      if (res.data?.createCloudinarySignature.signature) {
        const { signature, timestamp } = res.data?.createCloudinarySignature;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', api_key);
        formData.append('public_id', `${fileName}`);
        formData.append('folder', 'team-logo');
        formData.append('upload_preset', 'team-logo');

        const response = await fetch(url, {
          method: 'post',
          body: formData,
        });

        const { public_id, version } = await response.json();
        return `${public_id}|${version}`;
      }

      throw new Error('Upload unsuccessful. Please try again.');
    } catch (err) {
      console.info(parseError(err));
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, generateSignature };
};
