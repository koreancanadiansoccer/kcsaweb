import React, { FunctionComponent, useMemo, useState } from 'react';
import Dropzone, { DropzoneRootProps, FileRejection } from 'react-dropzone';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

// Setting border color based on Dropzone state.
const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

// Container wrapper for Dropzone.
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

interface ImgDropzoneProps {
  setFile: (newFiles: File[]) => void;
  fileLink: string;
  maxSize?: number;
  fileType?: 'logo' | 'announcment' | 'gamesheet';
  multiple?: boolean;
  resetFiles: () => void;
}

/**
 * Dropzone wrapper.
 */
export const ImgDropzone: FunctionComponent<ImgDropzoneProps> = ({
  setFile,
  fileLink,
  fileType = 'logo',
  multiple,
  maxSize = 1048675, // Byte value, default is 1048675 (1 MB).
  resetFiles,
}) => {
  const [error, setErrors] = useState('');

  const preferredFormat = useMemo(() => {
    if (fileType === 'announcment')
      return '*Preferred png format with max 5MB size.';
    if (fileType === 'gamesheet')
      return '*Preferred png format with max 5MB size.';

    return '*Preferred svg format with transparent background.';
  }, [fileType]);

  const size = useMemo(() => {
    if (fileType === 'announcment') return '5MB';
    if (fileType === 'gamesheet') return '5MB';

    return '1MB';
  }, [fileType]);

  return (
    <>
      <Typography variant="body2" color="error">
        {preferredFormat}
      </Typography>

      <Dropzone
        onDrop={(files: File[], fileRejections: FileRejection[]) => {
          resetFiles();
          setErrors('');
          let error = '';
          fileRejections.forEach((file) => {
            file.errors.forEach((err) => {
              if (err.code === 'file-too-large') {
                error = `Error: File exceeds ${size} limit`;
                return;
              }

              if (err.code === 'file-invalid-type') {
                error = 'Error: File type invalid ';
                return;
              }
            });
          });

          if (error) {
            setErrors(error);
            return;
          }
          setFile(files);
        }}
        accept="image/*"
        minSize={0}
        multiple={multiple}
        maxSize={maxSize}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => (
          <Container
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
            <input {...getInputProps()} />
            {!isDragActive && (
              <>
                <p>Click here or drop a file to upload!; Max: {size}.</p>
                <em>(Only *.jpeg, *.png and *svg images will be accepted)</em>
              </>
            )}
            {isDragActive && !isDragReject && 'File allowed'}
            {isDragReject && 'File type not accepted, sorry!'}

            {/* Better styling needed; Pictures might go beyond div wrapper */}
            {fileLink && (
              <img
                src={fileLink}
                style={{ maxWidth: '400x', maxHeight: '200px' }}
                alt="team logo preview"
              />
            )}
          </Container>
        )}
      </Dropzone>
    </>
  );
};
