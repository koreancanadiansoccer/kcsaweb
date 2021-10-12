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

import { Modal } from '../modal/Modal';
import { GalleryInput } from '../../types/gallery';

interface CreateGalleryModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  className?: string;
  onAdd: (league: GalleryInput) => Promise<void>;
  showOnHomePageCount: number;
}

/**
 * Modal to handle gallery addition.
 */
const UnstyledCreateGalleryModal: FunctionComponent<CreateGalleryModalProp> = ({
  className,
  open,
  onClose,
  onAdd,
  showOnHomePageCount,
}) => {
  const [newGallery, setNewGallery] = useState<GalleryInput>({
    title: '',
    description: '',
    showOnHomepage: false,
    galleryImages: [],
  });

  const isValid = useMemo(() => !!newGallery?.title, [newGallery]);

  // Reset 'newGallery' when closing/opening the modal.
  useEffect(
    () =>
      setNewGallery({
        title: '',
        description: '',
        showOnHomepage: false,
        galleryImages: [],
      }),
    [open]
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Gallery"
      className={className}
    >
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="start"
        flexDirection="column"
        width="100%"
      >
        <Typography variant="body1"> Title</Typography>
        <Box mt={1} mb={3} width="60%">
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
            multiline
            rows={6}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewGallery({ ...newGallery, description: evt.target.value });
            }}
          />
        </Box>

        {/* TODO: upload to S3 */}
        <Box width="100%" my={1}>
          <DropzoneArea
            dropzoneText={'Drag and drop an image here or click'}
            filesLimit={100}
            maxFileSize={20971520} // 20MB
            acceptedFiles={[
              'image/gif',
              'image/jpeg',
              'image/jpg',
              'image/png',
              'image/svg',
            ]}
            previewGridProps={{
              container: { spacing: 0 },
            }}
          />
        </Box>

        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={showOnHomePageCount >= 3 ? true : false}
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
          {showOnHomePageCount >= 3 && (
            <Box className="warning-box">Already Selected 3 Galleries</Box>
          )}
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            color="primary"
            variant="contained"
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

export const CreateGalleryModal = withTheme(styled(UnstyledCreateGalleryModal)`
  .MuiDialogActions-root {
    padding: 0px;
  }

  .warning-box {
    margin-left: 27%;
    margin-top: -10%;
    font-size: 10px;
    color: #ff1744;
    width: 100%;
  }
`);
