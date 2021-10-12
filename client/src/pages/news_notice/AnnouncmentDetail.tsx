import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

interface AnnouncementProps {
  className?: string;
  imgSrc: string;
  title: string;
  contentToDisplay: string;
}

const UnstyledAnnouncementDetail: FunctionComponent<AnnouncementProps> = ({
  className,
  imgSrc,
  title,
  contentToDisplay,
}) => {
  return (
    <>
      <Box
        id="selectedAnnouncement"
        my={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={className}
      >
        <Paper style={{ width: 1250 }} className="announcement-paper">
          <Box my={5} mx={5}>
            <Box mb={3}>
              <img
                src={imgSrc}
                alt="Announcement Image"
                className="announcement-image"
              />
            </Box>
            <Box>
              <Typography variant="h4">{title}</Typography>
            </Box>

            <Box mt={5}>{ReactHtmlParser(contentToDisplay)}</Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export const AnnouncmentDetail = withTheme(
  styled(UnstyledAnnouncementDetail)`
    .announcement-paper {
      width: 100%;
      padding: 2rem 1.5rem;
      border: 2px solid rgba(142, 142, 147, 0.4);
    }

    .announcement-image {
      max-width: 100%;
      max-height: 30rem;
    }
  `
);
