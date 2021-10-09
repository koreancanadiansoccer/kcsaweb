import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes,
} from 'react-html-parser';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { Announcement } from '../../types/announcement';
import {
  GET_ANNOUNCEMENT,
  AnnouncementQueryData,
  AnnouncementQueryVariable,
} from '../../graphql/announcement/get_announcement.query';
import { parseError } from '../../graphql/client';

interface AnnouncementProps {
  className?: string;
}

const UnstyledSelectedAnnouncement: FunctionComponent<AnnouncementProps> = (
  className
) => {
  const { id } = useParams<{ id: string }>();

  const announcementQuery = useQuery<
    AnnouncementQueryData,
    AnnouncementQueryVariable
  >(GET_ANNOUNCEMENT, {
    variables: { id },
  });

  const [announcement, setAnnouncement] = useState<Announcement>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(announcementQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementQuery?.data?.getAnnouncement) {
      setAnnouncement(announcementQuery.data.getAnnouncement);
    }

    if (announcementQuery.error) {
      setError(parseError(announcementQuery.error));
    }
  }, [announcementQuery, loading, error]);

  const contentToDisplay = announcement?.content as string;

  return (
    <>
      <Box
        id="test"
        mt={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper style={{ width: 1250 }} className="announcement-paper">
          <Box my={5} mx={5}>
            <Box>
              <Typography variant="h4">{announcement?.title}</Typography>
            </Box>

            <Box mt={5}>{ReactHtmlParser(contentToDisplay)}</Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export const SelectedAnnouncement = withTheme(
  styled(UnstyledSelectedAnnouncement)`
    .announcement-paper {
      width: 100%;
      padding: 2rem 1.5rem;
      border: 2px solid rgba(142, 142, 147, 0.4);
    }
  `
);
