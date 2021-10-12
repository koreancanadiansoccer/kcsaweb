import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useHistory } from 'react-router-dom';

import { ImgDropzone } from '../dropzone/DropZone';
import { Button } from '../button/Button';
import { AnnouncementInput } from '../../types/announcement';
import { useImgUpload } from '../../hooks/useImgUpload';
import { parseError } from '../../graphql/client';
import { ResourceType } from '../../types/resource.enum';

interface AddAnnouncementProps {
  className?: string;
  onAdd: (announcement: AnnouncementInput) => Promise<void>;
}

/**
 * Announcement.
 */
const UnstyledAddAnnouncement: FunctionComponent<AddAnnouncementProps> = ({
  className,
  onAdd,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const [error, setError] = useState('');

  const { generateUploadUrls } = useImgUpload();

  const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementInput>({
    title: '',
    subtitle: '',
    content: '',
    imageURL: '',
    showOnHomepage: false,
  });

  const history = useHistory();

  const isValid = useMemo(
    () =>
      !!newAnnouncement?.title &&
      !!newAnnouncement?.subtitle &&
      !!newAnnouncement?.content,
    [newAnnouncement]
  );

  useEffect(
    () =>
      setNewAnnouncement({
        title: '',
        subtitle: '',
        content: '',
        imageURL: '',
        showOnHomepage: false,
      }),
    []
  );

  const handleUploadChange = async (files: File[]) => {
    const tempFile = files[0];

    setFile(tempFile);
    setFileLink(URL.createObjectURL(tempFile));
  };

  const uploadImageToS3 = async () => {
    try {
      if (file?.name && file?.type) {
        let announcementImageURL = newAnnouncement.imageURL;
        const fileName = `${newAnnouncement.title.substring(
          0,
          10
        )}-${Date.now()}`.toLocaleLowerCase();

        announcementImageURL = (await generateUploadUrls(
          file,
          fileName,
          ResourceType.ANNOUNCEMENT
        )) as string;

        newAnnouncement.imageURL = announcementImageURL;
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  console.warn(Date.now());

  return (
    <Box className={className}>
      <Box display="flex">
        <Paper className="announcement-paper">
          <Box mb={4}>
            <Typography variant="h5">Announcement Form</Typography>
          </Box>

          <Box className="form-fields" display="flex">
            <Typography> Title* </Typography>
            <TextField
              className="title-textfield"
              fullWidth
              variant="outlined"
              color="secondary"
              value={newAnnouncement?.title}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: evt.target.value,
                });
              }}
            ></TextField>
          </Box>

          <Box className="form-fields" display="flex">
            <Typography> Subtitle* </Typography>
            <TextField
              className="subtitle-textfield"
              fullWidth
              variant="outlined"
              color="secondary"
              value={newAnnouncement?.subtitle}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setNewAnnouncement({
                  ...newAnnouncement,
                  subtitle: evt.target.value,
                });
              }}
            ></TextField>
          </Box>

          <Box className="form-fields">
            <Typography> Body Content* </Typography>

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newContent) => {
                setEditorState(newContent);
                setNewAnnouncement({
                  ...newAnnouncement,
                  content: draftToHtml(
                    convertToRaw(newContent.getCurrentContent())
                  ),
                });
              }}
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'fontSize',
                  'list',
                  'textAlign',
                  'history',
                  'embedded',
                  'emoji',
                  'image',
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography> Image Upload* </Typography>
            <ImgDropzone
              fileLink={fileLink}
              fileType="announcment"
              setFile={(files: File[]) => handleUploadChange(files)}
              maxSize={5242880}
            />
          </Box>

          <Box mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAnnouncement?.showOnHomepage}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setNewAnnouncement({
                      ...newAnnouncement,
                      showOnHomepage: evt.target.checked,
                    });
                  }}
                />
              }
              label="Main Page"
            />
          </Box>

          <Box mx={-1}>
            <Button
              className="submit_button"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid}
              onClick={async () => {
                await uploadImageToS3();
                void onAdd(newAnnouncement);
                history.goBack();
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const AddAnnouncement = withTheme(styled(UnstyledAddAnnouncement)`
  .announcement-paper {
    width: 100%;
    padding: 2rem 1.5rem;
    border: 2px solid rgba(142, 142, 147, 0.4);
  }

  .form-fields {
    margin-bottom: 1.5rem;
  }

  .form-fields:nth-child(-n + 3) {
    width: 60%;
  }

  .MuiOutlinedInput-input {
    padding: 0 0 0 1rem;
    height: 2.5rem;
  }

  .title-textfield {
    margin-left: 2.5rem;
    padding: 0;
  }
  .subtitle-textfield {
    margin-left: 1rem;
    padding: 0;
  }

  .toolbarClassName {
    border: 1px solid rgba(142, 142, 147, 0.4);
  }

  .editorClassName {
    border: 1px solid rgba(142, 142, 147, 0.4);
    height: 25rem;
  }

  .editorClassName figure {
    margin: 0;
  }
  .editorClassName .rdw-image-left {
    display: inline;
    float: left;
    margin-right: 1rem;
  }
  .editorClassName .rdw-image-right {
    display: inline;
    justify-content: unset;
    float: right;
    margin-left: 1rem;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }
`);
