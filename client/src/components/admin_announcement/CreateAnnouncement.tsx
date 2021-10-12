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

import { ImgDropzone } from '../dropzone/DropZone';
import { DraftEditor } from '../draft_editor/DraftEditor';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { AnnouncementInput } from '../../types/announcement';
import { useImgUpload } from '../../hooks/useImgUpload';
import { parseError } from '../../graphql/client';
import { ResourceType } from '../../types/resource.enum';

interface CreateAnnouncementProps {
  className?: string;
  onAdd: (announcement: AnnouncementInput) => Promise<void>;
}

/**
 * Announcement.
 */
const UnstyledCreateAnnouncement: FunctionComponent<CreateAnnouncementProps> =
  ({ className, onAdd }) => {
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
                  <Input
                    className="subtitle-textfield"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    value={newAnnouncement?.content}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                      setNewAnnouncement({
                        ...newAnnouncement,
                        content: evt.target.value,
                      });
                    }}
                  ></Input>
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
