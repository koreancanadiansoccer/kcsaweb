import React, {
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
  useCallback,
} from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { AnnouncementInput } from "../../types/announcement";

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
  const [bodyState, setBodyState] = useState("");

  // TODO: put announcement image type here
  const [uploadImage, setUploadImage] = useState({
    uploadedImages: [],
  });

  // Need to implement OnSubmit with useState
  const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementInput>({
    title: "",
    subtitle: "",
    content: "",
    showOnHomepage: false,
  });

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
        title: "",
        subtitle: "",
        content: "",
        showOnHomepage: false,
      }),
    []
  );

  const uploadImageCallBack = (file: File) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  return (
    <Box className={className}>
      <Box display="flex">
        <Paper className="announcement-paper">
          <Box
            className="announcement-title"
            display="flex"
            justifyContent="center"
          >
            <h1>Announcement Form</h1>
          </Box>

          <Box className="form-fields">
            <Typography> Title </Typography>
            <TextField
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

          <Box className="form-fields">
            <Typography> Subtitle </Typography>
            <TextField
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
            <Typography> Body Content </Typography>

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newContent) => {
                setEditorState(newContent);
                setBodyState(
                  draftToHtml(convertToRaw(newContent.getCurrentContent()))
                );
                setNewAnnouncement({
                  ...newAnnouncement,
                  content: bodyState,
                });
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                  "embedded",
                  "emoji",
                  "image",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: uploadImageCallBack,
                  previewImage: true,
                  inputAccept:
                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                },
              }}
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

          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid}
              onClick={() => void onAdd(newAnnouncement)}
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
    width: 50%;
    padding: 25px;
    border: 2px solid rgba(142, 142, 147, 0.2);
  }

  .form-fields {
    margin-bottom: 1.5rem;
  }

  .editorClassName {
    border: 1px solid rgba(142, 142, 147, 0.2);
    height: 20rem;
  }

  .announcement-title {
    margin-bottom: 1.5rem;
  }
`);
