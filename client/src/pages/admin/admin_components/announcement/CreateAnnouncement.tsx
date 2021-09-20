import React, { FunctionComponent, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { DropzoneArea } from "material-ui-dropzone";

interface AnnouncementProps {
  className?: string;
}

/**
 * Announcement.
 */
const UnstyledAnnouncement: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {

  // Need to implement OnSubmit with useState

  return (
    <Box
      style={{ border: "0.2px solid gray" }}    >
      <Box ml={3} mr={3}>
        <Box mb={5}>
          <h1>Announcement Form</h1>
        </Box>

        <Box>
          <h3> Title </h3>
          <TextField
            variant="outlined"
            color="secondary"
            style={{ width: 500 }}
          ></TextField>
        </Box>

        <Box>
          <h3> Subtitle </h3>
          <TextField
            variant="outlined"
            color="secondary"
            style={{ width: 500 }}
          ></TextField>
        </Box>

        <Box>
          <h3> Body Content </h3>
          <TextareaAutosize
            maxRows={20}
            style={{ width: 1500, height: 300 }}
          ></TextareaAutosize>
        </Box>

        <Box style={{ height: 300 }}>
          <h3> File Upload </h3>
          <DropzoneArea />
        </Box>

        <Box mb={3}>
          <Button variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const CreateAnnouncement = withTheme(styled(UnstyledAnnouncement)``);
