import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useHistory, useRouteMatch, Link as RouteLink } from 'react-router-dom';

import { Button } from '../../../components/button/Button';
import { Table } from '../../../components/table/Table';
import { parseError } from '../../../graphql/client';
import { Announcement, AnnouncementInput } from '../../../types/announcement';
import { CREATE_ANNOUNCEMENT } from '../../../graphql/announcement/create_announcement.mutation';
import { GET_ANNOUNCEMENTS } from '../../../graphql/announcement/get_announcements.query';

interface AnnouncementProps {
  className?: string;
}

// left out the content because it was too long
const tableColumns = [
  { title: 'Title', field: 'title' },
  { title: 'Subtitle', field: 'subtitle' },
  { title: 'Show On Homepage', field: 'showOnHomepage' },
  { title: 'Image URL', field: 'imageURL' },
  { title: 'Created', field: 'createdAt' },
];

/**
 * Announcement page.
 */
const UnstyledAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const { url } = useRouteMatch();

  const [announcements, setAnnouncements] = useState<Announcement[]>();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

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
    <>
      <Box>
        <Typography variant="h4">Announcement</Typography>

        <Box my={3}>
          <Button
            component={RouteLink}
            to={`${url}/createAnnouncement`}
            startIcon={<AddIcon />}
            color="secondary"
          >
            Create New Announcement
          </Button>
        </Box>

        <Table
          title="Announcement Info"
          columns={tableColumns}
          data={announcements}
          onRowClick={(evt, data) => {
            if (data?.id) {
              history.push(`/admin/announcement/${data.id}`);
            }
          }}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.isActive
                ? { background: 'white' }
                : { background: '#EEEEEE' };
            },
          }}
        />
      </Box>
    </>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)``);
