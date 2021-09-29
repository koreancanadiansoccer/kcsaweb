import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from "react";
import { DialogProps } from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import styled from "styled-components";
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { sendFileToS3 } from '../../utils/sendFileToS3';
import AWS from 'aws-sdk';

import { Modal } from '../modal/Modal';

import { GalleryInput } from '../../types/gallery';


//! AWS TETING
//!
interface AddGalleryModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (league: GalleryInput) => Promise<void>;
}

/**
 * Modal to handle gallery addition.
 */
const UnstyledAddGalleryModal: FunctionComponent<AddGalleryModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newGallery, setNewGallery] = useState<GalleryInput>({
    title: '',
    description: '',
    showOnHomepage: false,
    images: [],
  });

  const isValid = useMemo(
    () =>
      !!newGallery?.title,
    [newGallery]
  );

  // Reset 'newGallery' when closing/opening the modal.
  useEffect(
    () =>
      setNewGallery({
        title: '',
        description: '',
        showOnHomepage: false,
        images: [],
      }),
    [open]
  );

  //!
    const [inputImages, setInputImages] = useState<File[]>([]);

    const test = async (files: any) => {
      // for (var i = 0; i < files.length; i++) {
        sendFileToS3(files)
      // }
    }


    // const testtttt = async (files: File[]) => {
    //   const s3 = new AWS.S3({
    //     accessKeyId: process.env.AWS_ACCESSKEY_ID,
    //     secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    //     region: process.env.AWS_BUCKET_REGION,
    //   });

    //   const param = {
    //     'Bucket': process.env.AWS_BUCKET_NAME,
    //     'Key': "Testing",
    //     'ACL': 'public-read',
    //     'Body': file
    //   };
    // }
  //!

  return (
    <Modal open={open} onClose={onClose} title="Create New Gallery">
      <Box display="flex" justifyContent="space-evenly" alignItems="start" flexDirection="column" width="100%">
        <Typography variant="body1"> Title</Typography>
        <Box mt={1} mb={3}>
          <TextField
            label="Title"
            placeholder="Gallery Title"
            color="primary"
            variant="outlined"
            required
            value={newGallery?.title}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewGallery({ ...newGallery, title: evt.target.value });
            }}
          />
        </Box>

        <Typography variant="body1"> Description</Typography>
        <Box mt={1} mb={3} width="100%">
          <TextField
            label="Description"
            placeholder="Gallery Description"
            color="primary"
            variant="outlined"
            value={newGallery?.description}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewGallery({ ...newGallery, description: evt.target.value });
            }}
          />
        </Box>

        <Box width="100%" my={1}>
          <DropzoneArea
            dropzoneText={'Drag and drop an image here or click'}
            filesLimit={100}
            maxFileSize={20971520} // 20MB
            acceptedFiles={['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg']}
            previewGridProps={{
              container: { spacing: 0 },
            }}
            onChange={(files) => {
              setInputImages([...files]);
            }}
          />
        </Box>

        {/* <input type="file" id="upload" className="image-upload" onChange={(e) => test(e)} /> */}

        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={newGallery?.showOnHomepage}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  setNewGallery({
                    ...newGallery,
                    showOnHomepage: evt.target.checked,
                  });
                }}
              />
            }
            label="Main Page"
          />
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size = "large"
            color = "primary"
            variant = "contained"
            onClick={() => {
              void onAdd(newGallery);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export const AddGalleryModal = withTheme(styled(UnstyledAddGalleryModal)`
  .MuiDialogActions-root {
    padding: 0px;
  },

  .MuiDialogActions-root > div {
    margin-left: 0px;
  }
`);
