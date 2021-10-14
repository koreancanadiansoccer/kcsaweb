import React, {
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { useMutation } from '@apollo/client';

import { ImgDropzone } from '../dropzone/DropZone';
import { DraftEditor } from '../draft_editor/DraftEditor';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Announcement, AnnouncementInput } from '../../types/announcement';
import { useImgUpload } from '../../hooks/useImgUpload';
import { parseError } from '../../graphql/client';
import { ResourceType } from '../../types/resource.enum';
import { CREATE_ANNOUNCEMENT } from '../../graphql/announcement/create_announcement.mutation';

interface CreateAnnouncementProps {
  className?: string;
}

/**
 * Display form to create a new announcement
 */
const UnstyledCreateAnnouncement: FunctionComponent<CreateAnnouncementProps> =
  ({ className }) => {
    const [editorState, setEditorState] = useState<EditorState>(
      EditorState.createEmpty()
    );
    const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementInput>({
      title: '',
      subtitle: '',
      content: '',
      imageURL: '',
      showOnHomepage: false,
    });
    const [file, setFile] = useState<File>();
    const [fileLink, setFileLink] = useState('');
    const [error, setError] = useState('');
    const { generateUploadUrls } = useImgUpload();
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

    const [createAnnouncementMut] = useMutation<
      { createAnnouncement: Announcement[] },
      AnnouncementInput
    >(CREATE_ANNOUNCEMENT);

    const createAnnouncement = async (newAnnouncement: AnnouncementInput) => {
      try {
        await createAnnouncementMut({
          variables: {
            title: newAnnouncement.title,
            subtitle: newAnnouncement.subtitle,
            content: newAnnouncement.content,
            imageURL: newAnnouncement.imageURL,
            showOnHomepage: newAnnouncement.showOnHomepage,
          },
        });
      } catch (e) {
        setError(parseError(e));
      }
    };

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
        console.error(error);
      }
    };

    const onAdd = async (newAnnouncement: AnnouncementInput) => {
      createAnnouncement(newAnnouncement);
    };

    return (
      <Box className={className}>
        <Box display="flex">
          <Paper className="announcement-paper">
            <Box mx={1} mb={2}>
              <Typography variant="h5">Announcement Form</Typography>
            </Box>

            <Box mx={1}>
              <Box className="form-fields" display="flex">
                <Box mt={3}>
                  <Typography> Title* </Typography>
                </Box>
                <Input
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
                ></Input>
              </Box>

              <Box className="form-fields" display="flex">
                <Box mt={3}>
                  <Typography> Subtitle* </Typography>
                </Box>
                <Input
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
                ></Input>
              </Box>

              <Box mt={3} className="form-fields">
                <Typography> Body Content* </Typography>
                <Box>
                  <DraftEditor
                    editorState={editorState}
                    onEditorStateChange={(newContent: EditorState) => {
                      setEditorState(newContent);
                      setNewAnnouncement({
                        ...newAnnouncement,
                        content: draftToHtml(
                          convertToRaw(newContent.getCurrentContent())
                        ),
                      });
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box mx={1} my={3}>
              <Typography> Image Upload* </Typography>
              <ImgDropzone
                fileLink={fileLink}
                fileType="announcment"
                setFile={(files: File[]) => handleUploadChange(files)}
                maxSize={5242880}
              />
            </Box>

            <Box mx={1} mb={3}>
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

            <Box>
              <Button
                className="submit_button"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isValid}
                onClick={async () => {
                  await uploadImageToS3();
                  onAdd(newAnnouncement);
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

export const CreateAnnouncement = withTheme(styled(UnstyledCreateAnnouncement)`
  .announcement-paper {
    width: 100%;
    padding: 2rem 1.5rem;
    border: 2px solid rgba(142, 142, 147, 0.4);
  }

  .title-textfield {
    margin-left: 2.5rem;
    width: 50rem;
  }
  .subtitle-textfield {
    margin-left: 1rem;
    padding: 0;
    width: 50rem;
  }
`);
