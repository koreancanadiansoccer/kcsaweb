import React, { FunctionComponent, useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

import { Announcement } from '../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../graphql/announcement/get_announcements.query';
import { parseError } from '../../graphql/client';

import { AnnouncementsTable } from './AnnouncementTable';

interface AnnouncementProps {
  className?: string;
}

/**
 * Announcement Page.
 */
const UnstyledAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>();

  const { id } = useParams<{ id: string }>();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pull announcement data.
  useEffect(() => {
    setLoading(announcementDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementDataQuery?.data?.getAnnouncements) {
      setAnnouncements(announcementDataQuery.data.getAnnouncements);
    }

    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error]);

  if (!announcements) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className} my={5}>
      <AnnouncementsTable
        announcements={announcements}
        id={id}
      ></AnnouncementsTable>
    </Box>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)``);
