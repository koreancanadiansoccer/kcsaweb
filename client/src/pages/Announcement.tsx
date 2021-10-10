import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

interface AnnouncementProps {
  className?: string;
}

/**
 * About Page.
 */
const UnstyledAnnouncement: FunctionComponent<AnnouncementProps> = () => {
  return <Box>Announcement page</Box>;
};

export const Announcement = withTheme(styled(UnstyledAnnouncement)``);
