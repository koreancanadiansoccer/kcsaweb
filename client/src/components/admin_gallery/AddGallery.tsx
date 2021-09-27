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
import { DropzoneArea } from 'material-ui-dropzone';
import AWS from 'aws-sdk';

import { Modal } from '../modal/Modal';
import { Input } from '../input/Input';
import { Button } from '../button/Button';

import { GalleryInput } from '../../types/gallery';

//! AWS TETING
// import dotenv from 'dotenv';
// dotenv.config();

// export const AWS_SDK_LOAD_CONFIG = 1;

// AWS.config.update({
//   region: 'us-east-1',
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:17b8090d-d5b9-4dc9-b05d-8b3a3839731c',
//   }),
//   signatureVersion: 'v4',
//   accessKeyId: 'AKIAQKZEFGFJJLQS2OH3',
//   secretAccessKey: '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',
// });

// const handleFileInput = (e: any) => {
//   console.log("test:" + e)
//   console.log("test:" + e.target.files[0])


//   const file = e.target.files[0];
//   console.log(typeof file.name)


//   const upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: 'kcsa-images',
//       Key: file.name!,
//       Body: file,
//     },
//   });

//   const promise = upload.promise();

//   promise.then(
//     function (data) {
//       console.log('success');
//     },
//     function (err) {
//       console.log(err.message);
//     }
//   );
// };
//!

//@

//@


interface AddGalleryModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (league: GalleryInput) => Promise<void>;
}

/**
 * Modal to handle gallery addition.
 */
export const AddGalleryModal: FunctionComponent<AddGalleryModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newGallery, setNewGallery] = useState<GalleryInput>({
    title: '',
    content: '',
    showOnHomepage: false,
    images: [],
  });

  const isValid = useMemo(
    () =>
      !!newGallery?.title &&
      !!newGallery?.content,
    [newGallery]
  );

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewGallery({
        title: '',
        content: '',
        showOnHomepage: false,
        images: [],
      }),
    [open]
  );

  //!
    const [inputImages, setInputImages] = useState<File[]>([]);
    // const [inputImages, setInputImages] = useState<File>();


  //!

  return (
    <Modal open={open} onClose={onClose} title="Create New League">
      <Box display="flex" justifyContent="space-evenly" alignItems="start" flexDirection="column" width="80%">
        <Input
          label="Title"
          placeholder="Gallery Title"
          required
          value={newGallery?.title}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewGallery({ ...newGallery, title: evt.target.value });
          }}
        />

        <Input
          label="Content"
          placeholder="Gallery Content"
          required
          value={newGallery?.content}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewGallery({ ...newGallery, content: evt.target.value });
          }}
        />

        <DropzoneArea
          dropzoneText={'Drag and drop an image here or click'}
          filesLimit={100}
          maxFileSize={20971520} // 20MB
          acceptedFiles={['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg']}
          onChange={(files) => {
            console.log('what is your name:', files);
            setInputImages([...files])
            // setInputImages(existing => existing.concat(Array.from(files)))
            // console.log(inputImages);
          }}
        />

        {/* <input type="file" id="upload" className="image-upload" onChange={handleFileInput} /> */}

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => {
              void onAdd(newGallery);

              console.log('TEST::');
              console.log(inputImages);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
