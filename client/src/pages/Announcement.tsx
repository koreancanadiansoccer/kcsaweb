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
 * About Page.
 */
const UnstyledAnnouncement: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  return (
    <Box style={{ width: 500 }}>
      <Box ml={3}>
        <h3> Title </h3>
        <TextField
          variant="outlined"
          color="secondary"
          style={{ width: 500 }}
        ></TextField>
      </Box>

      <Box ml={3}>
        <h3> SubTitle </h3>
        <TextField
          variant="outlined"
          color="secondary"
          style={{ width: 500 }}
        ></TextField>
      </Box>

      <Box ml={3}>
        <h3> Body Content </h3>
        <TextareaAutosize
          maxRows={20}
          placeholder="Write body content here"
          style={{ width: 500, height: 300 }}
        ></TextareaAutosize>
      </Box>

      <Box ml={3} mt={3}>
        <h3> File Upload </h3>
        <DropzoneArea />
      </Box>

      <Box ml={3} mt={3}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export const Announcement = withTheme(styled(UnstyledAnnouncement)``);
