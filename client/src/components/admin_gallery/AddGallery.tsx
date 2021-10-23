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

interface AddGalleryModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  className?: string;
  onAdd: (league: GalleryInput) => Promise<void>;
  showOnHomePageCount: number;
}

/**
 * Modal to handle gallery addition.
 */
const UnstyledAddGalleryModal: FunctionComponent<AddGalleryModalProp> = ({
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
        <Box width="60%" className="create-gallery-title">
          <Typography variant="body1"> Title</Typography>
          <Box mt={1} mb={3}>
            <TextField
              label="Title"
              placeholder="Gallery Title"
              color="primary"
              variant="outlined"
              required
              value={newGallery.title}
              fullWidth
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setNewGallery({ ...newGallery, title: evt.target.value });
              }}
            />
          </Box>
        </Box>

        <Box className="create-gallery-description" width="100%">
          <Typography variant="body1"> Description</Typography>
          <Box mt={1} mb={3}>
            <TextField
              label="Description"
              placeholder="Gallery Description"
              color="primary"
              variant="outlined"
              value={newGallery.description}
              fullWidth
              multiline
              rows={6}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setNewGallery({ ...newGallery, description: evt.target.value });
              }}
            />
          </Box>
        </Box>

        <Box className="create-gallery-upload" width="100%">
          <Typography variant="body1"> Image Upload*</Typography>
          <Typography
            className="upload-warning-text"
            variant="body2"
            color="error"
          >
            *Preferred png format with max 10MB size.
          </Typography>

          {/* TODO: upload to S3 */}
          <Box width="100%" mt={1} mb={1}>
            <DropzoneArea
              dropzoneText={'Drag and drop an image here or click'}
              filesLimit={30}
              maxFileSize={10485760} // 10MB
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
        </Box>

        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={showOnHomePageCount >= 3 ? true : false}
                checked={newGallery.showOnHomepage}
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
            <Typography
              className="checkbox-warning-text"
              variant="body2"
              color="error"
            >
              Already Selected 3 Galleries
            </Typography>
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

export const AddGalleryModal = withTheme(styled(UnstyledAddGalleryModal)`
  .MuiDialogActions-root {
    padding: 0px;
  }

  .upload-warning-text {
    font-size: 0.7rem;
  }

  .checkbox-warning-text {
    margin-left: 2rem;
    margin-top: -7%;
    font-size: 0.7rem;
    width: 100%;
  }
`);
